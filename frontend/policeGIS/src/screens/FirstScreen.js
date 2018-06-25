import React from 'react';
import { View, Text} from 'react-native-ui-lib';
import{ScrollView} from 'react-native';
import startNavigator from './startNavigator';
import CustomCard from '../Components/customcard';


class FirstScreen extends React.Component {



  firstnavigatehandler=()=>{

     //startNavigator();

   this.props.navigator.push({
  screen: 'Police.MapScreen', // unique ID registered with Navigation.registerScreen
  animated: true, // does the push have transition animation or does it happen immediately (optional)
  animationType: 'slide-horizontal',
  navigatorStyle:{
    navBarHidden: true,
  }
})

}

  secondnavigatehandler=()=>{

     //startNavigator();

   this.props.navigator.push({
  screen: 'Police.BoundsScreen', // unique ID registered with Navigation.registerScreen
  animated: true, // does the push have transition animation or does it happen immediately (optional)
  animationType: 'slide-horizontal',
  navigatorStyle:{
    navBarHidden: true,
  }
  })


}

  thirdnavigatehandler=()=>{

     //startNavigator();

   this.props.navigator.push({
  screen: 'Police.MarkerScreen', // unique ID registered with Navigation.registerScreen
  animated: true, // does the push have transition animation or does it happen immediately (optional)
  animationType: 'slide-horizontal',
  navigatorStyle:{
    navBarHidden: true,
  }
  })

}

  fourthnavigatehandler=()=>{

     //startNavigator();

   this.props.navigator.push({
  screen: 'Police.NearestScreen', // unique ID registered with Navigation.registerScreen
  animated: true, // does the push have transition animation or does it happen immediately (optional)
  animationType: 'slide-horizontal',
  navigatorStyle:{
    navBarHidden: true,
  }
  })
}
  render() {
    return (
      <ScrollView>
      <View flex paddingH-10 paddingT-20 paddingB-40>
         <CustomCard
           function={this.firstnavigatehandler}
           text="Your Jurisdriction">
         </CustomCard>
         <CustomCard
           function={this.secondnavigatehandler}
           text="Station Boundaries">
         </CustomCard>
         <CustomCard
          function={this.thirdnavigatehandler}
           text="Incident Jurisdriction">
         </CustomCard>
         <CustomCard
          function={this.fourthnavigatehandler}
           text="Nearest Police Station">
         </CustomCard>
      </View>
    </ScrollView>
    );
  }
}

export default FirstScreen;
