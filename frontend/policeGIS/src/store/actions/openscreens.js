import {OPEN_YOUR_JURIS,OPEN_STATION_BOUNDS,OPEN_INCIDENT_JURIS,OPEN_NEAREST_STATION} from './actionTypes';


export const open_your_juris = (lat,long)=>{
    return{
      type: OPEN_YOUR_JURIS
      latitude:lat,
      longitude:long
    };
};

export const open_station_bounds = ()=>{
    return{
      type: OPEN_STATION_BOUNDS
    };
};

export const open_incident_juris = (lat,long)=>{
    return{
      type: OPEN_INCIDENT_JURIS
      latitude:lat,
      longitude:long
    };
};

export const open_nearest_station = (lat,long)=>{
    return{
      type: OPEN_NEAREST_STATION
      latitude:lat,
      longitude:long
    };
};
