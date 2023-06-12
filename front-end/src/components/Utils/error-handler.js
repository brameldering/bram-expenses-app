const errorHandler = (error) => {
  let errorMessage = "";
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage = error.response.status;
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    errorMessage = error.request;
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error.message;
    console.log("Error", error.message);
  }
  //errorMessage = error.config;
  console.log(error.config);
  return errorMessage;
};

export default errorHandler;
