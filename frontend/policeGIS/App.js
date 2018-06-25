import {Navigation} from 'react-native-navigation';
import FirstScreen from './src/screens/FirstScreen';
import MapScreen from './src/screens/MapScreen'; //remember this
import DraggableMarkerScreen from './src/screens/DraggableMarkerScreen';
import NearestScreen from './src/screens/nearestscreen';
import StationBoundScreen from './src/screens/BoundsScreen';

// Register screens
Navigation.registerComponent("Police.FirstScreen",() => FirstScreen);
Navigation.registerComponent("Police.MapScreen",()=> MapScreen);
Navigation.registerComponent("Police.MarkerScreen",()=> DraggableMarkerScreen);
Navigation.registerComponent("Police.NearestScreen",()=>NearestScreen);
Navigation.registerComponent("Police.BoundsScreen",()=>StationBoundScreen);


//start the navigator app
Navigation.startSingleScreenApp({
   screen:{
      screen: "Police.FirstScreen",
      navigatorStyle:{
        navBarHidden: true,
      }

   }
});
