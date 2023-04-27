import axios from "axios";
var config = {
  method: "get",
  url: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
  params: {
    input: "Ha",
    radius: "500",
    key: "AIzaSyCY-TiMW8v8O4TVvfhvDCKHNKF9xB0hjDc",
  },
};

const getLocation = () =>
  axios
    .request(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
export default getLocation;
