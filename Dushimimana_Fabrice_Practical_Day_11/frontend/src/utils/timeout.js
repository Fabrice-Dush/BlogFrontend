const timeout = function (sec) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${sec} seconds.`));
    }, sec * 1000);
  });
};

export default timeout;
