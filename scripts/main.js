// Свайперы
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
})
