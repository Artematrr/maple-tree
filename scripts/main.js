// new Swiper('.animals__tabs', {
// 	slidesPerView: 'auto',
// 	spaceBetween: 10,
// 	mousewheel: true,
// 	freeMode: true,
// 	scrollbar: {
// 		el: '.swiper-scrollbar',
// 	},
// })

jQuery(document).ready(function () {
	$("input[type='tel']").mask('+7 (999) 999-99-99')
})

new Swiper('.swiper-block__swiper', {
	spaceBetween: 30,
	
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		540: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
		},
		1440: {
			slidesPerView: 4,
		},
	},
});

$(document).on('click', '.js-qna-toggle', function(e) {
	e.preventDefault();
	const $item = $(this).closest('.qna__item');
	if ($item.hasClass('is-open')) {
		$item.removeClass('is-open');
	} else {
		$item.siblings('.qna__item').removeClass('is-open');
		$item.addClass('is-open');
	}
});

