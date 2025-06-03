// Свайперы

new Swiper('.brands__swiper', {
	spaceBetween: 30,
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		375: {
			slidesPerView: 1.5,
		},
		768: {
			slidesPerView: 3,
		},
		1024: {
			slidesPerView: 4,
		},
		1440: {
			slidesPerView: 5,
		},
	},
})

new Swiper('.gallery__swiper', {
	spaceBetween: 30,
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		375: {
			slidesPerView: 1.5,
		},
		768: {
			slidesPerView: 3,
		},
		1024: {
			slidesPerView: 4,
		},
		1440: {
			slidesPerView: 5,
		},
	},
	navigation: {
		prevEl: '.gallery__swiper-prev',
		nextEl: '.gallery__swiper-next',
	},
})

new Swiper('.product__type-swiper', {
	spaceBetween: 15,
	mousewheel: true,
	loop: true,
	breakpoints: {
		320: {
			slidesPerView: 3,
			direction: 'vertical',
			spaceBetween: 10,
			height: 3 * 102,
		},
		375: {
			slidesPerView: 3,
			direction: 'vertical',
			spaceBetween: 10,
			height: 3 * 102,
		},
		768: {
			slidesPerView: 2,
			direction: 'horizontal',
			spaceBetween: 15,
		},
		1440: {
			slidesPerView: 3,
			direction: 'horizontal',
			spaceBetween: 15,
		},
	},
	navigation: {
		prevEl: '.product__type-prev',
		nextEl: '.product__type-next',
	},
})

new Swiper('.product__swiper', {
	slidesPerGroup: 1,
	breakpoints: {
		320: {
			slidesPerView: 3,
			slidesPerGroup: 3,
		},
	},
	spaceBetween: 10,
	watchSlidesProgress: true,
	navigation: {
		prevEl: '.product__swiper-prev',
		nextEl: '.product__swiper-next',
	},
})

new Swiper('.product__swiper-preview', {
	slidesPerGroup: 1,
	slidesPerView: 1,
	breakpoints: {
		320: {
			slidesPerView: 1,
			centeredSlides: true,
		},
	},
	thumbs: { swiper: '.product__swiper' },
	spaceBetween: 30,
})

document
	.querySelectorAll('.catalog-card__swiper-container')
	.forEach(container => {
		new Swiper(container.querySelector('.catalog-card__swiper'), {
			spaceBetween: 10,
			slidesPerView: 1,
			pagination: {
				el: container.querySelector('.swiper-pagination'),
				clickable: true,
			},
		})
	})

document.querySelectorAll('.swiper-block__swiper').forEach(swiperEl => {
	new Swiper(swiperEl, {
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
		pagination: {
			el: swiperEl.querySelector('.swiper-pagination'),
			clickable: true,
		},
	})
})

// new Swiper('.swiper-block__swiper', {
// 	spaceBetween: 30,
// 	breakpoints: {
// 		320: {
// 			slidesPerView: 1,
// 		},
// 		540: {
// 			slidesPerView: 2,
// 		},
// 		1024: {
// 			slidesPerView: 3,
// 		},
// 		1440: {
// 			slidesPerView: 4,
// 		},
// 	},
// })

jQuery(document).ready(function () {
	// Общие скрипты
	$("input[type='tel']").mask('+7 (999) 999-99-99')

	$('.js-qna-toggle').on('click', function (e) {
		e.preventDefault()
		const $item = $(this).closest('.qna__item')
		if ($item.hasClass('is-open')) {
			$item.removeClass('is-open')
		} else {
			$item.siblings('.qna__item').removeClass('is-open')
			$item.addClass('is-open')
		}
	})

	// aside menu toggle
	$('.js-menu-toggle').on('click', function (e) {
		e.preventDefault()
		$('.header__mobile').toggleClass('is-open')
		setCooldown()
	})

	$('#product-tabs').tabs()

	// Модальные окна
	MicroModal.init({
		openTrigger: 'data-micromodal-trigger',
		closeTrigger: 'data-micromodal-close',
		disableFocus: false,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true,
	})

	$('.js-modal-callback').on('click', function (e) {
		e.preventDefault()
		MicroModal.show('modal-callback')
	})
	$('.js-modal-sendCatalog').on('click', function (e) {
		e.preventDefault()
		MicroModal.show('modal-sendCatalog')
	})
	$('.js-modal-askQuestion').on('click', function (e) {
		e.preventDefault()
		MicroModal.show('modal-askQuestion')
	})
	$('.js-modal-requestPrice').on('click', function (e) {
		e.preventDefault()
		MicroModal.show('modal-requestPrice')
	})
	$('.js-modal-cart').on('click', function (e) {
		e.preventDefault()
		MicroModal.show('modal-cart')
	})
	$('.js-modal-oneClick').on('click', function (e) {
		e.preventDefault()
		MicroModal.show('modal-oneClick')
	})

	// Фиксированный хэдер при скролле
	const header = $('.header')
	const headerHeight = $('.header').innerHeight()

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > headerHeight) {
			header.addClass('is-fixed')
		} else {
			header.removeClass('is-fixed')
		}
	})

	// Каталог: фильтр по буквам алфавита
	$('.catalog-search__letters a').on('click', function (e) {
		e.preventDefault()
		var $this = $(this)
		var letter = $this.data('letter')
		var $letters = $this.closest('.catalog-search__letters').find('a')
		var $search = $this.closest('.catalog-search')
		var $nomenclature = $search.find('.catalog-search__cards')
		var $empty = $search.find('.catalog-search__empty')

		if ($this.hasClass('is-active')) {
			$letters.removeClass('is-active')
			$nomenclature.show()
			$empty.hide()
			return
		}

		$letters.removeClass('is-active')
		$this.addClass('is-active')

		$nomenclature.hide()
		var $found = $nomenclature.filter('[data-letter="' + letter + '"]')
		$found.show()

		if ($found.length === 0) {
			$empty.show()
		} else {
			$empty.hide()
		}
	})

	// Каталог: тогглы
	$('.js-info-open').on('click', function (e) {
		e.preventDefault()
		const $info = $(this).closest('.catalog-card').find('.catalog-card__info')
		$info.addClass('is-visible')
	})
	$('.js-card-close').on('click', function (e) {
		e.preventDefault()
		const $info = $(this).closest('.catalog-card__info')
		$info.removeClass('is-visible')
	})

	$('.js-filter-trigger').on('click', function (e) {
		e.preventDefault()
		const $dropdown = $(this).closest('.catalog-filter__dropdown')
		$dropdown.toggleClass('is-open')
	})

	$('.js-catalog-all').on('click', function (e) {
		e.preventDefault()
		const $this = $(this)
		const $list = $this
			.closest('.catalog-categories')
			.find('.catalog-categories__list')
		$list.toggleClass('is-expanded')
		if ($list.hasClass('is-expanded')) {
			$this.text('Свернуть каталог')
		} else {
			$this.text('Развернуть каталог')
		}
	})

	$('.js-filter-all').on('click', function (e) {
		e.preventDefault()
		const $this = $(this)
		const $options = $this
			.closest('.catalog-filter__group')
			.find('.catalog-filter__dropdown-options')
		$options.toggleClass('is-expanded')
		if ($options.hasClass('is-expanded')) {
			$this.text('Свернуть')
		} else {
			$this.text('Развернуть ещё')
		}
	})

	// Каталог: инициализация слайдера
	$('.form__slider').each(function () {
		const slider = $(this)
		const container = slider.closest('.form__slider-container')
		// Диапазон указывается в data-min и data-max у .form__slider
		const MIN_PRICE = slider.data('min') || 1
		const MAX_PRICE = slider.data('max') || 100

		slider.slider({
			range: true,
			min: MIN_PRICE,
			max: MAX_PRICE,
			values: [MIN_PRICE, MAX_PRICE],
			slide: function (event, ui) {
				container.find('.form__slider-min').text(ui.values[0])
				container.find('.form__slider-max').text(ui.values[1])
				updatePricePositions(slider, container)
			},
			change: function () {
				updatePricePositions(slider, container)
			},
		})

		container.find('.form__slider-min').text(slider.slider('values', 0))
		container.find('.form__slider-max').text(slider.slider('values', 1))
		updatePricePositions(slider, container)
	})

	function updatePricePositions(slider, container) {
		const handles = slider.find('.ui-slider-handle')
		container
			.find('.form__slider-min')
			.css('left', `calc(${handles.eq(0).css('left')} - 3px)`)
		container
			.find('.form__slider-max')
			.css('left', `calc(${handles.eq(1).css('left')} - 3px)`)
	}

	$(window).on('resize', function () {
		$('.form__slider').each(function () {
			const slider = $(this)
			const container = slider.closest('.form__slider-container')
			updatePricePositions(slider, container)
		})
	})

	document
		.querySelectorAll('.js-product-description-toggle')
		.forEach(toggle => {
			toggle.addEventListener('click', function () {
				const descriptionBlock = this.closest('.product__description-block')
				descriptionBlock.classList.toggle('is-open')
				if (descriptionBlock.classList.contains('is-open')) {
					this.textContent = 'Свернуть'
				} else {
					this.textContent = 'Полное описание'
				}
			})
		})
})
