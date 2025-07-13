jQuery(document).ready(function($) {
    let currentIndex = 0;
    const images = $('.gallery-item').map(function() {
        return $(this).data('src');
    }).get();

    function smoothScrollTo(targetSelector) {
        const target = document.querySelector(targetSelector);
        if(target) {
            const offset = $('#header .top').height();
            window.scrollTo({
                top: $(target).offset().top - offset,
                behavior: 'smooth'
            });
        }
    }

    function showImage(index) {
        $('.modal-image')
            .attr('src', images[index])
            .attr('alt', `Imagen ${index + 1} de ${images.length}`);
        $('#modal').fadeIn().focus();
    }

    function initEvents() {
        $('#scrollToContent').click(function(e) {
            e.preventDefault();
            smoothScrollTo('#blog');
        });

        $('nav > ul > li > a').click(function(e) {
            e.preventDefault();
            smoothScrollTo($(this).attr('href'));
            $('#drawer-right').removeClass('open');
        });

        $('.toggleDrawer').click(function(e) {
            e.preventDefault();
            $('#drawer-right').toggleClass('open');
        });

        $('.gallery-item').click(function() {
            currentIndex = $('.gallery-item').index(this);
            showImage(currentIndex);
        });

        $('.close-btn, .modal-overlay').click(function() {
            $('#modal').fadeOut();
        });

        $('.prev-btn').click(function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        $('.next-btn').click(function() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });

        $(document).keydown(function(e) {
            if ($('#modal').is(':visible')) {
                if (e.key === 'ArrowLeft') $('.prev-btn').click();
                if (e.key === 'ArrowRight') $('.next-btn').click();
                if (e.key === 'Escape') $('#modal').fadeOut();
            }
        });
    }

    function handleHeaderScroll() {
        $('#header .top').toggleClass('solid', $(window).scrollTop() > 50);
    }

    initEvents();
    handleHeaderScroll();
    $(window).scroll(handleHeaderScroll);
});