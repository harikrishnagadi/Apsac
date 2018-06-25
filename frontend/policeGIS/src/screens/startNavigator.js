import {Navigation} from 'react-native-navigation';

// start the second screen
const startsecondscreen=() =>{
  Navigation.startSingleScreenApp({
      screen:{
        screen: "Police.MapScreen",
        navigatorStyle:{
          navBarHidden: true,
        }
      }
  });
};

export default startsecondscreen;
