import {SET_LOCATION} from './actionTypes';

export const set_location = (latitude,longitude)=>{
     return:{
       type: SET_LOCATION
       latitude: latitude,
       longitude: longitude

     };
};
