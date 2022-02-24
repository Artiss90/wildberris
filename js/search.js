const search = function () {
  const input = document.querySelector('.search-block > input');
  const button = document.querySelector('.search-block > button');

  button.addEventListener('click', () => console.log(input.value));
};
search();
