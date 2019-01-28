
const menuBurger = document.querySelector('.navbar-burger');
const navbarMenu = document.querySelector('.navbar-menu');

export default () => {
	menuBurger.addEventListener('click', () => {
		navbarMenu.classList.toggle('is-active');
		menuBurger.classList.toggle('is-active');
	});
}


