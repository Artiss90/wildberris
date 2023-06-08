// * ф-ция переключения модального окна
const cart = function () {
  const KEY_GOODS_LOCAL_STORAGE = 'goods';
  const KEY_CART_LOCAL_STORAGE = 'cart';

  const cartBtn = document.querySelector('.button-cart');
  const cart = document.getElementById('modal-cart');
  const closeBtn = document.querySelector('.modal-close');
  const containerCarts = document.querySelector('.long-goods-list');
  const tableGoods = document.querySelector('.cart-table__goods');
  const tableTotalSum = document.querySelector('.card-table__total');

  // * ф-ция рендера товаров корзины модалке
  function renderCartGoods(goods) {
    tableGoods.innerHTML = '';

    goods.forEach((good) => {
      const { category, description, gender, id, img, label, name, offer, price, count } = good;
      const tr = document.createElement('tr');

      // * добавляем динамическую разметку
      tr.innerHTML = `
              <td>${name}</td>
              <td>${price}$</td>
              <td>
                <button class="cart-btn-minus">-</button>
              </td>
              <td>${count}</td>
              <td>
                <button class=" cart-btn-plus">+</button>
              </td>
              <td>${Number(price) * Number(count)}$</td>
              <td>
                <button class="cart-btn-delete">x</button>
              </td>
        `;

      tableGoods.append(tr);

      tr.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target);
      });
    });
  }

  // ? если элемент существует - вешаем на него обработчик
  if (containerCarts) {
    containerCarts.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.closest('.add-to-cart')) {
        const idCart = e.target.closest('.add-to-cart').dataset.id;
        addToCart(idCart);
      }
    });
  }

  // *ф-ция добавления товара по клику на нем
  function addToCart(id) {
    const goods = JSON.parse(localStorage.getItem(KEY_GOODS_LOCAL_STORAGE)); //* весь список продуктов
    const clickedGood = goods.find((item) => item.id === id); //* кликнутый продукт
    let cart = JSON.parse(localStorage.getItem(KEY_CART_LOCAL_STORAGE))
      ? JSON.parse(localStorage.getItem(KEY_CART_LOCAL_STORAGE))
      : []; //* если корзина товаров пуста - запишем пустой массив

    // ? если в корзине уже есть кликнутый товар - увеличим кол-во на 1, иначе - добавим новый товар
    if (cart.some((item) => item.id === id)) {
      cart = cart.map((item) => {
        if (item.id === clickedGood.id) {
          item.count += 1;
        }
        return item;
      });
      localStorage.setItem(KEY_CART_LOCAL_STORAGE, JSON.stringify(cart));
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
      localStorage.setItem(KEY_CART_LOCAL_STORAGE, JSON.stringify(cart));
    }
  }

  const onClickModal = () => {
    let cartArray = JSON.parse(localStorage.getItem(KEY_CART_LOCAL_STORAGE))
      ? JSON.parse(localStorage.getItem(KEY_CART_LOCAL_STORAGE))
      : []; //* если корзина товаров пуста - запишем пустой массив
    renderCartGoods(cartArray);

    cart.style.display = 'flex'; //* show modal
  };

  const onCloseModal = () => {
    cart.style.display = ''; // * default style (hide modal)
  };

  cartBtn.addEventListener('click', onClickModal);
  closeBtn.addEventListener('click', onCloseModal);
};
cart();
