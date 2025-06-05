jQuery(document).ready(function () {
	// Инициализация свайперов
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
				height: 3 * 136,
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

	$('.catalog-card__swiper-container').each(function () {
		var $container = $(this)
		new Swiper($container.find('.catalog-card__swiper')[0], {
			spaceBetween: 10,
			slidesPerView: 1,
			pagination: {
				el: $container.find('.swiper-pagination')[0],
				clickable: true,
			},
		})
	})

	$('.swiper-block--news .swiper-block__swiper').each(function () {
		var $swiperEl = $(this)
		new Swiper($swiperEl[0], {
			spaceBetween: 30,
			breakpoints: {
				320: { slidesPerView: 1 },
				540: { slidesPerView: 2 },
				1024: { slidesPerView: 3 },
				1440: { slidesPerView: 4 },
			},
			pagination: {
				el: $swiperEl.find('.swiper-block__pagination')[0],
				clickable: true,
			},
		})
	})

	$('.swiper-block--catalog .swiper-block__swiper').each(function () {
		var $swiperEl = $(this)
		new Swiper($swiperEl[0], {
			spaceBetween: 30,
			breakpoints: {
				320: { slidesPerView: 1, spaceBetween: 10 },
				375: {
					slidesPerView: 2,
					spaceBetween: 10,
					grid: { rows: 2, fill: 'row' },
				},
				768: { slidesPerView: 2, spaceBetween: 15 },
				1024: { slidesPerView: 3 },
				1440: { slidesPerView: 4 },
			},
			pagination: {
				el: $swiperEl.find('.swiper-block__pagination')[0],
				clickable: true,
			},
		})
	})

	// Инициализация вкладок товара
	$('#product-tabs').tabs({
		activate: function (event, ui) {
			if (window.innerWidth <= 767) {
				const tabId = ui.newTab.data('order')
				const $info = $('.product__info')
				$info.css('order', tabId)
				const headerHeight = $('.header').outerHeight()
				const activeTabHeight = $('.ui-tabs-active').outerHeight() || 0

				setTimeout(function () {
					$('html, body').scrollTop(
						$info.offset().top - headerHeight - activeTabHeight
					)
				}, 5)
			}
		},
	})
	$(window).on('resize', function () {
		if (window.innerWidth <= 767) {
			const activeTab = $('#product-tabs .ui-tabs-active ')
			if (activeTab.length) {
				const order = activeTab.data('order')
				$('.product__info').css('order', order)
			}
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
	$('.js-modal-filter').on('click', function (e) {
		e.preventDefault()
		MicroModal.show('modal-filter')
	})

	// Инициализация увеличения/уменьшения количества товара в корзине и товаре
	$('.cart__quantity').each(function () {
		const $quantity = $(this)
		const $input = $quantity.find('.cart__quantity-value')
		const $minusButton = $quantity.find('.cart__quantity-button-minus')
		const $plusButton = $quantity.find('.cart__quantity-button-plus')

		$minusButton.on('click', function () {
			let value = parseInt($input.val(), 10)
			if (value > 1) {
				value -= 1
				$input.val(value)
				$input.attr('value', value)
			}
		})
		$plusButton.on('click', function () {
			let value = parseInt($input.val(), 10)
			value += 1
			$input.val(value)
			$input.attr('value', value)
		})
	})

	// Инициализация тогглов в блоках каталога и товара
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

	$('.js-section-all').on('click', function (e) {
		e.preventDefault()
		const $this = $(this)
		const $list = $this
			.closest('.catalog-section')
			.find('.catalog-section__list')
		$list.toggleClass('is-expanded')
		if ($list.hasClass('is-expanded')) {
			$this.text('Свернуть')
		} else {
			$this.text('Развернуть все')
		}
	})

	$('.js-search-all').on('click', function (e) {
		e.preventDefault()
		const $this = $(this)
		const $list = $this
			.closest('.catalog-search__nomenclature')
			.find('.catalog-search__list')
		$list.toggleClass('is-expanded')
		if ($list.hasClass('is-expanded')) {
			$this.text('Свернуть')
		} else {
			$this.text('Развернуть все')
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

	// Инициализация тогглов в товаре
	$('.js-product-description-toggle').on('click', function (e) {
		e.preventDefault()
		const $descriptionBlock = $(this).closest('.product__description-block')
		$descriptionBlock.toggleClass('is-open')
		if ($descriptionBlock.hasClass('is-open')) {
			$(this).text('Свернуть')
		} else {
			$(this).text('Полное описание')
		}
	})

	// Инициализация тогглов в блоке Вопросы и ответы
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

	// Каталог: инициализация ползунка цен
	function updatePricePositions(slider, container) {
		const handles = slider.find('.ui-slider-handle')
		container
			.find('.form__slider-min')
			.css('left', `calc(${handles.eq(0).css('left')} - 3px)`)
		container
			.find('.form__slider-max')
			.css('left', `calc(${handles.eq(1).css('left')} - 3px)`)
	}

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

	$(window).on('resize', function () {
		$('.form__slider').each(function () {
			const slider = $(this)
			const container = slider.closest('.form__slider-container')
			updatePricePositions(slider, container)
		})
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

	// Переместить фильтр каталога в модальное окно на телефоне
	function moveCatalogFilter() {
		const filter = $('.catalog-filter')
		const desktopContainer = $('#catalog-filter__container')
		const mobileContainer = $('#catalog-filter__modal-container')

		if (window.innerWidth <= 1023) {
			if (!mobileContainer.find('.catalog-filter').length) {
				filter.appendTo(mobileContainer)
			}
		} else {
			if (!desktopContainer.find('.catalog-filter').length) {
				filter.appendTo(desktopContainer)
			}
		}
	}
	moveCatalogFilter()
	$(window).on('resize', moveCatalogFilter)

	// Маска для телефона
	$("input[type='tel']").mask('+7 (999) 999-99-99')

	// Фиксированный хэдер при скролле
	const header = $('.header')
	const headerHeight = $('.header').outerHeight()

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > headerHeight) {
			header.addClass('is-fixed')
		} else {
			header.removeClass('is-fixed')
		}
	})

	// Открытие мобильного меню
	$('.js-menu-toggle').on('click', function (e) {
		e.preventDefault()
		$('.header__mobile').toggleClass('is-open')
	})
})
