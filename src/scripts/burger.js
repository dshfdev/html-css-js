const burgerBtn = document.querySelector('#burger-btn');
const mobileMenu = document.querySelector('#mobile-menu');
const closeBtn = document.querySelector('#close-mobile-menu-btn');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');

const handleMobileMenuOpen = () => {
  document.body.classList.toggle('disable-scroll');
  mobileMenu.hidden = false;
  mobileMenu.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('mobile-menu--is-open');
};

const handleMobileMenuClose = () => {
  document.body.classList.toggle('disable-scroll');
  mobileMenu.hidden = true;
  mobileMenu.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('mobile-menu--is-open');
};

burgerBtn.addEventListener('click', handleMobileMenuOpen);
closeBtn.addEventListener('click', handleMobileMenuClose);
mobileMenuLinks.forEach((link) => {
  link.addEventListener('click', handleMobileMenuClose);
});
