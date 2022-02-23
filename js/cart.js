const cart = function () {
  const cartBtn = document.querySelector('.button-cart');
  const cart = document.getElementById('modal-cart');
  const closeBtn = document.querySelector('.modal-close');

  const onClick = () => {
    cart.style.display = 'flex';
  };

  const onClose = () => {
    cart.style.display = ''; // * default style
  };

  cartBtn.addEventListener('click', onClick);
  closeBtn.addEventListener('click', onClose);
};
cart();
