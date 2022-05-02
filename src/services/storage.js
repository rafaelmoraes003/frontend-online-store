const recoverToLocalStorage = () => {
  const currentItems = JSON.parse(localStorage.getItem('cart'));
  return currentItems;
};

export default recoverToLocalStorage;
