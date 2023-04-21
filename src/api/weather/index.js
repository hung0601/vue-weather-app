import axios from "axios";

export default function getWeatherData(location) {
  let options = {
    method: "GET",
    url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/timeline",
    params: {
      aggregateHours: 24,
      contentType: "json",
      unitGroup: "metric",
      key: "YNNKXFTARXJC427CX6NVZCKYU",
      locations: "Ha Noi",
    },
  };
  options.params.locations = location;
  return axios.request(options).then((response) => {
    console.log(response.data);
    return response.data;
  });
}
