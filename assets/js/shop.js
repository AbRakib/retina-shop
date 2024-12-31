(function ($) {
    'use strict';
    /*Product Details*/
    var productDetails = function () {
        $('.product-image-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            asNavFor: '.slider-nav-thumbnails',
        });

        $('.slider-nav-thumbnails').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.product-image-slider',
            dots: false,
            focusOnSelect: true,

            prevArrow: '<button type="button" class="slick-prev"><i class="fi-rs-arrow-small-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fi-rs-arrow-small-right"></i></button>'
        });

        // Remove active class from all thumbnail slides
        $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');

        // Set active class to first thumbnail slides
        $('.slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-active');

        // On before slide change match active thumbnail to current slide
        $('.product-image-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var mySlideNumber = nextSlide;
            $('.slider-nav-thumbnails .slick-slide').removeClass('slick-active');
            $('.slider-nav-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
        });

        $('.product-image-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            var img = $(slick.$slides[nextSlide]).find("img");
            $('.zoomWindowContainer,.zoomContainer').remove();
            if ($(window).width() > 768) {
                $(img).elevateZoom({
                    zoomType: "inner",
                    cursor: "crosshair",
                    zoomWindowFadeIn: 500,
                    zoomWindowFadeOut: 750
                });
            }
        });
        //Elevate Zoom
        if ( $(".product-image-slider").length ) {
            if ($(window).width() > 768) {
                $('.product-image-slider .slick-active img').elevateZoom({
                    zoomType: "inner",
                    cursor: "crosshair",
                    zoomWindowFadeIn: 500,
                    zoomWindowFadeOut: 750
                });
            }
        }
        //Filter color/Size
        $('.list-filter').each(function () {
            $(this).find('a').on('click', function (event) {
                event.preventDefault();
                $(this).parent().siblings().removeClass('active');
                $(this).parent().toggleClass('active');
                $(this).parents('.attr-detail').find('.current-size').text($(this).text());
                $(this).parents('.attr-detail').find('.current-color').text($(this).attr('data-color'));
            });
        });

        // Qty Up-Down
        $('.detail-qty').each(function () {
            var $qtyInput = $(this).find(".qty-val");

            $(this).siblings('.qty-plus').on('click', function (event) {
                event.preventDefault();
                var qtyval = parseInt($qtyInput.val(), 10);
                qtyval = qtyval + 1;
                $qtyInput.val(qtyval);
            });

            $(this).siblings(".qty-minus").on("click", function (event) {
                event.preventDefault();
                var qtyval = parseInt($qtyInput.val(), 10);
                qtyval = Math.max(1, qtyval - 1);
                $qtyInput.val(qtyval);
            });
        });

        $('.cart_qty_group').each(function () {
            var $qtyInput = $(this).find(".qty-input");
        
            $(this).find('.qty-right-plus').on('click', function (event) {
                event.preventDefault();
                var qtyval = parseInt($qtyInput.val(), 10);
                qtyval = qtyval + 1;
                $qtyInput.val(qtyval);
            });
        
            $(this).find('.qty-left-minus').on("click", function (event) {
                event.preventDefault();
                var qtyval = parseInt($qtyInput.val(), 10);
                qtyval = Math.max(1, qtyval - 1);
                $qtyInput.val(qtyval);
            });
        });        


        $('.dropdown-menu .cart_list').on('click', function (event) {
            event.stopPropagation();
        });
    };

    //Load functions
    $(document).ready(function () {
        productDetails();
    });

})(jQuery);


document.addEventListener("DOMContentLoaded", function () {
    const dropdownWrap = document.querySelector('.categories-dropdown-wrap');
    const categoriesButton = document.querySelector('.categories-button-active');

    // Toggle the dropdown menu
    categoriesButton.addEventListener('click', function (event) {
        event.preventDefault();
        dropdownWrap.classList.toggle('active');
    });

    // Close dropdown menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInside = dropdownWrap.contains(event.target) || categoriesButton.contains(event.target);

        if (!isClickInside) {
            dropdownWrap.classList.remove('open');
            categoriesButton.classList.remove('open');
        }
    });
});


//wishlist remove card
// Select all the close buttons
const closeButtons = document.querySelectorAll('.remove-wishlist');

// Add click event listeners to each close button
closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Find the parent card container to remove
        const productCard = this.closest('.wishlist-cart-wrapper');
        if (productCard) {
            productCard.remove();
        }
    });
});
