const hamburger = document.querySelector('.hamburger');
const menuSmartphone = document.querySelector('.menu-smartphone-list');

menuSmartphone.style.visibility = 'hidden';

hamburger.addEventListener('click', () => {

	if(menuSmartphone.style.visibility === 'hidden'){
		menuSmartphone.style.visibility = 'visible';
		menuSmartphone.style.opacity = 1;
	}
	else{
		menuSmartphone.style.visibility = 'hidden';
		menuSmartphone.style.opacity = 0;
	}
})