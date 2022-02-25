const search = function () {
  const KEY_LOCAL_STORAGE = 'goods';
  const input = document.querySelector('.search-block > input');
  const searchButton = document.querySelector('.search-block > button');

  // * ф-ция рендера карточек
  function renderGoods(goods) {
    const containerCarts = document.querySelector('.long-goods-list');
    containerCarts.innerHTML = ''; // * очищаем контейнер

    // ? перебираем массив данных и создаём контейнер для карточек
    goods.forEach((good) => {
      const { category, description, gender, id, img, label, name, offer, price } = good;
      const goodBlock = document.createElement('div');

      // * вешаем классы
      goodBlock.classList.add('col-lg-3');
      goodBlock.classList.add('col-sm-6');

      // * добавляем динамическую разметку
      goodBlock.innerHTML = `
        <div class="goods-card">
          <span class="label ${label ? null : 'd-none'}">${label}</span>
          <img src=${img} alt="image: ${name}" class="goods-image">
          <h3 class="goods-title">${name}</h3>
          <p class="goods-description">${description}</p>
          <button class="button goods-card-btn add-to-cart" data-id=${id}>
            <span class="button-price">$${price}</span>
          </button>
        </div>`;

      containerCarts.append(goodBlock);
    });
  }

  // *получение всех данных
  function getData(value) {
    fetch('https://my-project-test-30902-default-rtdb.europe-west1.firebasedatabase.app/db.json')
      .then((res) => res.json())
      .then((data) => {
        const filterArray = data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())); // ? фильтруем по поисковом значении
        localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(filterArray)); // * сохраняем в локальное хранилище отфильтрованные данные

        // ? если мы не находимся на данной странице - переходим на неё
        if (window.location.pathname !== '/goods.html') {
          window.location.href = '/goods.html';
        } else {
          renderGoods(filterArray);
        }
      });
  }

  try {
    // * вешаем событие на кнопку поиска
    searchButton.addEventListener('click', () => {
      getData(input.value); // * передаем значение с поля поиска
    });
  } catch (error) {
    console.error(error.message);
  }
};
search();
