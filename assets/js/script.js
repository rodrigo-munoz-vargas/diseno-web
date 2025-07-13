jQuery(document).ready(function(){

	// Función para hacer scroll suave con corrección de offset
	function smoothScrollTo(targetSelector){
		var target = document.querySelector(targetSelector);

		if(target){
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});

			// Ajuste por header fijo
			setTimeout(function(){
				var offset = jQuery('#header .top').height();
				window.scrollBy(0, -offset);
			}, 500);
		}
	}

	// Scroll al hacer clic en el botón flecha
	jQuery('#scrollToContent').click(function(e){
		e.preventDefault();
		smoothScrollTo('#blog');
	});

	// Scroll al hacer clic en el menú lateral
	jQuery('nav > ul > li > a').click(function(e){
		e.preventDefault();
		var href = jQuery(this).attr('href');
		smoothScrollTo(href);

		// Cierra el drawer al hacer clic en un enlace
		jQuery('#drawer-right').removeClass('open');
	});

	// Cambia el fondo del header al hacer scroll
	function setHeaderBackground(){
		if(jQuery(window).scrollTop() > 50){
			jQuery('#header .top').addClass('solid');
		} else {
			jQuery('#header .top').removeClass('solid');
		}
	}

	// Ejecutar al cargar y al hacer scroll
	jQuery(window).on('scroll', setHeaderBackground);
	setHeaderBackground();

	// Drawer abrir/cerrar
	jQuery('.toggleDrawer').click(function(e){
		e.preventDefault();
		jQuery('#drawer-right').toggleClass('open');
	});

	jQuery(document).ready(function($) {

	let currentIndex = 0;
	const images = $('.gallery-item').map(function(){
		return $(this).data('src');
	}).get();

	function showImage(index) {
		$('.modal-image').attr('src', images[index]);
		currentIndex = index;
		$('#modal').fadeIn();
	}

	$('.gallery-item').click(function(){
		const index = $('.gallery-item').index(this);
		showImage(index);
	});

	$('.close-btn, .modal-overlay').click(function(){
		$('#modal').fadeOut();
	});

	$('.prev-btn').click(function(){
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		showImage(currentIndex);
	});

	$('.next-btn').click(function(){
		currentIndex = (currentIndex + 1) % images.length;
		showImage(currentIndex);
	});

	document.addEventListener('keydown', function(e) {
		if ($('#modal').is(':visible')) {
			if (e.keyCode === 37) {
			$('.prev-btn').click();
			} else if (e.keyCode === 39) {
			$('.next-btn').click();
			} else if (e.keyCode === 27) {
			$('#modal').hide();
			}
		}
	});

});


});
