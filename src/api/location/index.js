import axios from "axios";
var config = {
  method: "get",
  url: "https://dev.virtualearth.net/REST/v1/LocalSearch",
  params: {
    query: "Ha",
    key: "Ak9oafqwwii6U1fhtlp9GqpUazhT33z0Hv-DCXJAch2kPX3MIgZxOSPsrbOkcbOP",
    maxResults: 10,
  },
};

const getLocation = () =>
  axios
    .request(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
export default getLocation;
