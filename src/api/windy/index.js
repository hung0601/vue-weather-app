/* eslint-disable */
const options = {
  // Required: API key
  key: "TukwaJ05BvZDRqa70gBqfcn9oiyCvOMt",
  verbose: true,
  lat: 50.4,
  lon: 14.3,
  zoom: 10,
};

const callWindy = (lat, lon, location) => {
  options.lat = lat;
  options.lon = lon;
  windyInit(options, (windyAPI) => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff
    const { map, broadcast } = windyAPI;
    // .map is instance of Leaflet map

    L.popup().setLatLng([lat, lon]).setContent(location).openOn(map);
    document.querySelector(".expand-button").addEventListener("click", () => {
      window.dispatchEvent(new Event("resize"));
    });
  });
};

export default callWindy;
