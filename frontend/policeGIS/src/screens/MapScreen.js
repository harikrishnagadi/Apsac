import React from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Locatebutton from '../Components/Locatebutton';
import MapView from 'react-native-maps';
import Currentlocmarker from '../Components/currenlocmarker'
import FadeInView from '../Components/FadeInView'
import {View, Button} from 'react-native-ui-lib';
import Data from '../store/reducers/reducer';
import GeoJson from 'react-native-geojson';
import Icon from 'react-native-vector-icons/Ionicons';


const {width, height} = Dimensions.get('window')



const SCREEN_HEIGHT = height
const SCREEN_WIDTH= width
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.0322
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
check = false
userloc=[]
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    left:0,
    right:0,
    top:0,
    bottom:0,
    position: 'absolute'
  },
  button:{
    marginBottom: 40,
    marginLeft:SCREEN_WIDTH-120
  },
  buttonact:{
    marginBottom: 40,
    marginLeft:SCREEN_WIDTH-350
  },
  shapefile:{
      backgroundColor: 'rgba(0, 122, 225, 0.1)',
      borderWidth:1,
      borderColor: 'rgba(0, 122, 225, 0.3)',
    }
});

export default class MyMap extends React.Component {


constructor(props) {
  super(props)



   this.state={
     initialPosition:{
       latitude:16.297105,
       longitude:80.448454,
       latitudeDelta:0.12,
       longitudeDelta:0.12
     },
     markerPosition:{
       latitude:0,
       longitude:0
     },
     polygonlayer:{
       type: 'FeatureCollection',
        features: [

          ]
        },
      pointlayer:{
          type: 'FeatureCollection',
           features: [

             ]
           }

     }
   }



watchID: ?number = null



  async getpolygonlayer (){
    try {
      uri='http://192.168.43.19:5000/boundsta/'+userloc[1]+'/'+userloc[0];
      let response = await fetch(uri);
      let responseJson = await response.json();
      this.setState({polygonlayer:responseJson});
      }
      catch (error) {
      alert(error);
    }
  }

  async getpointlayer(){
    try {
      uri='http://192.168.43.19:5000/jurisstations/'+userloc[1]+'/'+userloc[0];
      let response = await fetch(uri);
      let responseJson = await response.json();
      this.setState({pointlayer:responseJson});
      }
      catch (error) {
      alert(error);
    }
  }



componentDidMount(){

  navigator.geolocation.getCurrentPosition((position)=>{
    var lat=parseFloat(position.coords.latitude)
    var long=parseFloat(position.coords.longitude)

    var initialRegion ={
       latitude: lat,
       longitude: long,
       latitudeDelta: LATITUDE_DELTA,
       longitudeDelta: LONGITUDE_DELTA
    }
    this.setState({initialPosition: initialRegion})
    this.setState({markerPosition: initialRegion})
  },
  (error)=> {
    console.log(JSON.stringify(error))
  },
  {enableHighAccuracy: true ,timeout: 20000, maximumAge: 1000})
  this.watchID = navigator.geolocation.watchPosition((position)=>{
     var lat = parseFloat(position.coords.latitude)
     var long = parseFloat(position.coords.longitude)

     lastRegion ={
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
     }

     this.setState({initialPosition: lastRegion})
     this.setState({markerPosition: lastRegion})
     this.refs.basemap.animateToRegion(lastRegion, 500)
     userloc[0]=lastRegion.latitude;
     userloc[1]=lastRegion.longitude;
     check=true
     })
   }


  getdatalayer=()=>{
    if(check){
      this.getpointlayer().done();
      this.getpolygonlayer().done();
    }
  }


  recenter=()=>{
   if(check)
   this.refs.basemap.animateToRegion(lastRegion, 1800)

  }





componentWillUnmount(){
  navigator.geolocation.clearWatch(this.watchID)
}



  render() {
    if(this.state.polygonlayer['features']!==null&&this.state.pointlayer['features']!==null)
    {
      return (
        <View style ={styles.container}>
          <MapView
            ref="basemap"
            showsCompass={true}
            mapType="standard"
            style={styles.map}
            showsPointOfIntrest={true}
            loadingBackgroundColor="#000000"
            region={this.state.initialPosition}
            onRegionChangeComplete={this.state.render}>
            <MapView.Marker
              coordinate={this.state.markerPosition}>
             <Currentlocmarker>
             </Currentlocmarker>
           </MapView.Marker>
           <GeoJson geojson={this.state.polygonlayer}
             strokeWidth={3}
             fillColor='rgb(220,220,220)'>
           </GeoJson>
           <GeoJson geojson={this.state.pointlayer}>
           </GeoJson>
          </MapView>
          <View style={styles.button} >
          <TouchableOpacity
              onPress={this.recenter}>
            <Locatebutton>
            </Locatebutton>
          </TouchableOpacity>
        </View>
          <View style={styles.buttonact}>
            <Button
                backgroundColor-blue30
                label="Boundary"
                text70 white
                enableShadow
                onPress={this.getdatalayer}
              />
        </View>
        </View>
      )
    }
    else{
      return(
      <View style ={styles.container}>
        <MapView
          ref="basemap"
          showsCompass={true}
          mapType="standard"
          style={styles.map}
          showsPointOfIntrest={true}
          loadingBackgroundColor="#000000"
          region={this.state.initialPosition}
          onRegionChangeComplete={this.state.render}>
          <MapView.Marker
            coordinate={this.state.markerPosition}>
           <Currentlocmarker>
           </Currentlocmarker>
         </MapView.Marker>
        </MapView>
        <View style={styles.button} >
        <TouchableOpacity
            onPress={this.recenter}>
          <Locatebutton>
          </Locatebutton>
        </TouchableOpacity>
      </View>
        <FadeInView style={styles.buttonact}>
          <Button
              backgroundColor-blue30
              label="Boundary"
              text70 white
              enableShadow
              onPress={this.getdatalayer}
            />
      </FadeInView>
      </View>
    )
    }
  }
}
