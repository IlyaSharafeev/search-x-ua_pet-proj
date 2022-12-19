// Step 1: Get user coordinates
var city;
export const getCoordinates = () => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (pos) => {
    const crd = pos.coords;
    const lat = crd.latitude.toString();
    const lng = crd.longitude.toString();
    const coordinates = [lat, lng];
    getCity(coordinates);
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);
  console.log(city);
  return city;
};

// Step 2: Get city name
const getCity = (coordinates) => {
  const xhr = new XMLHttpRequest();
  const lat = coordinates[0];
  const lng = coordinates[1];

  // Paste your LocationIQ token below.
  xhr.open(
    "GET",
    "https://us1.locationiq.com/v1/reverse.php?key=pk.b2cf889c41c10bc894ed10aebdf369eb&lat=" +
      lat +
      "&lon=" +
      lng +
      "&format=json",
    true
  );
  xhr.send();
  xhr.onreadystatechange = processRequest;
  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      city = response.address.city;
      return response.address.city;
    }
  }

  return processRequest();
};
