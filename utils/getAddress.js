export const getAddress = async (pin) => {
  const encodedAddress = encodeURI(pin);
  console.log(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.REACT_APP_GEOCODE_KEY}`
  );

  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.REACT_APP_GEOCODE_KEY}`
    )
      .then((response) => {
        resolve(response.json());
      })
      .catch((err) => resolve({}));
  });
};
