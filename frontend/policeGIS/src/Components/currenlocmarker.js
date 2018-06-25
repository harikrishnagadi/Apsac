import {StyleSheet, View} from 'react-native';
import React from 'react';

const styles=StyleSheet.create({
  radius:{
    height:50,
    width:50,
    borderRadius:50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 225, 0.1)',
    borderWidth:1,
    borderColor: 'rgba(0, 122, 225, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker:{
      height:20,
      width:20,
      borderWidth:3,
      borderColor:'white',
      borderRadius:20/2,
      overflow:'hidden',
      backgroundColor:"#007AFF"
  }
})

class currentlocmarker extends React.Component{
   render(){
     return(
       <View style={styles.radius}>
         <View style={styles.marker}></View>
       </View>
     )
   }
}


export default currentlocmarker;
