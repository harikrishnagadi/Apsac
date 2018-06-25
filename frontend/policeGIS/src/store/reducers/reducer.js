




async function getDataFromApi() {
  try {
    let response = await fetch(
      'http://192.168.1.3:5000/stations'
    );
    let responseJson = await response.json();
  //alert(JSON.stringify(responseJson))
    return responseJson;
  } catch (error) {
    alert(error);
  }
}






export default getDataFromApi
