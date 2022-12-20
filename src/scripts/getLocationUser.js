const getCoordinates = async () => {
  return new Promise((resolve, reject) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      reject(err.message);
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    function success(pos) {
      const crd = pos.coords;
      const lat = crd.latitude.toString();
      const lng = crd.longitude.toString();
      const coordinates = [lat, lng];
      resolve(coordinates);
      return coordinates;
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  });
};

const getCity = (coordinates) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const lat = coordinates[0];
    const lng = coordinates[1];

    const processRequest = (xhr) => {
      if (xhr.srcElement.readyState === 4 && xhr.srcElement.status === 200) {
        const response = JSON.parse(xhr.srcElement.responseText);
        resolve(response.address.city);
      }
    };

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
  });
};

export async function getCurrentLocation() {
  const coordinates = await getCoordinates().then((res) => res);
  const xhr = await getCity(coordinates).then((res) => res);
  return xhr;
}
