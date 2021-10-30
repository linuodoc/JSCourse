fetch('https://ghibliapi.herokuapp.com/films')
  .then(function (response) {
    // Successfull fetch return as json
    return response.json();
  })
  .then(function (data) {
    // Data now contains the json
    console.log(data[0]);
  })
  .catch(function (error) {
    // A Error occured
    console.log(error);
  });
