function fetchProduct(error) {
  if (error === "error") {
    return Promise.reject("network error");
  }
  return Promise.resolve({ item: "은석이", age: 20 });
}

module.exports = fetchProduct;
