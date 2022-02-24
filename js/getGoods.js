const getGoods = () => {
  const navLinks = document.querySelectorAll('.navigation-link');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      getData();
    });
  });

  function getData() {
    // 'https://my-project-test-30902-default-rtdb.europe-west1.firebasedatabase.app/db.json';
    fetch('https://my-project-test-30902-default-rtdb.europe-west1.firebasedatabase.app/db.json')
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('goods', JSON.stringify(data));
      });
  }
};
getGoods();
