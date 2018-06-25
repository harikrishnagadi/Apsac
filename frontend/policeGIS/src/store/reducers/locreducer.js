const initialstate={
    latitude:0,
    longitude:0
};


const reducer =(state=initialstate,action) =>{
   switch(action.type){
       case GET_LOCATION:{
         return{
            ...state,
            latitude :action.latitude,
            longitude:action.longitude
         }
       }
    default:
          return state;
   }
}

export default reducer;
