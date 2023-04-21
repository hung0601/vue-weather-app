import axios from "axios";

export default function getLocationData(location) {
  let options = {
    method: "GET",
    url: "http://api.openweathermap.org/geo/1.0/direct",
    params: {
      q: "Ha",
      appid: "52d77a553d59e31a91fb7f2f6a24bf6d",
    },
  };
  options.params.q = location;
  return axios.request(options).then((response) => {
    return response.data;
  });
}
