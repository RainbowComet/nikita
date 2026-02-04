// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    const counterEl = document.getElementById('slides-amount');


    function updateCounter(s) {
        if (!counterEl) return;
        const current = s.realIndex + 1; // +1, так как индекс начинается с 0
        const total = s.slides.length;
        counterEl.textContent = `${current}/${total}`;
    }


    texts = {
        'Детство': {
            1: {
                'img': 1,
                'text': '«Росла я вполне обеспеченным благополучным ребенком в&nbspинтеллигентной семье инженеров. Играла в баскетбол, была редактором районной пионерской газеты. <br>Зимой каталась на лыжах в Подмосковье, а летом увлекалась&nbspплаванием. Еще коллекционировала марки, значки и советские монеты, рисовала портреты своих знакомых и пела в школьном хоре. Сочиняла стишки\n' +
                    '                для&nbspвсяких капустников и школьных концертов. <br>Ну, в общем, валяла дурака»',
            },
            2: {
                'img': 2,
                'text': '«В детстве у меня все складывалось само собой. Я редко прилагала к чему-то особые усилия. Училась нормально, но&nbspбез напряжения»',
            },
            3: {
                'img': 3,
                'text': '«В школе я думала, что я буду ветеринаром. Ветеринар из&nbspменя не получился, главным образом потому, что я не смогла осилить химию. Я пошла на факультет прикладной математики, в институт электронного машиностроения, и&nbspдумалось мне, что я буду инженером…»',
            },
        }
    };


    function initSliderByKey(key, data) {
        const sliderWrapper = document.querySelector('#slider-screen .swiper-wrapper');
        if (!sliderWrapper || !data[key]) return;

        // 1. Очищаем текущие слайды
        sliderWrapper.innerHTML = '';

        // 2. Проходим по объекту данных (например, по "Детство")
        const slidesData = data[key];

        Object.keys(slidesData).forEach(id => {
            const item = slidesData[id];

            // Формируем путь к картинке: Ключ-Номер.png
            const imgSrc = `images/${key}-${item.img}.png`;

            // Создаем структуру слайда
            const slideHtml = `
            <div class="swiper-slide">
                <div class="slider-screen__img-wrapper">
                    <img src="${imgSrc}" alt="${key} ${id}">
                </div>
                ${item.text ? `<p class="slider-screen__text">${item.text}</p>` : ''}
            </div>
        `;

            sliderWrapper.insertAdjacentHTML('beforeend', slideHtml);
        });

        // 3. Инициализация Swiper
        // Если swiper уже был инициализирован, его нужно уничтожить и создать заново
        if (window.mySwiper) {
            window.mySwiper.destroy(true, true);
        }

        const swiper = new Swiper('#slider-screen', {

            effect: 'slide',
            speed: 600,
            slidesPerView: 1,      // Строго один слайд в окне
            spaceBetween: 0,       // Расстояние между слайдами (0, чтобы не было щелей)
            centeredSlides: false,

            observer: true,
            observeParents: true,
            watchOverflow: true,

            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                },
            },

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            on: {
                // Инициализация (чтобы цифры появились сразу при загрузке)
                init: function () {
                    updateCounter(this);
                },
                // Срабатывает при каждом перелистывании
                slideChange: function () {
                    updateCounter(this);
                },
            },

            /*autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },*/
        });

    }

// Пример вызова:
    initSliderByKey('Детство', texts);



    // Элементы экранов
    const firstScreen = document.getElementById('first-screen');
    const secondScreen = document.getElementById('second-screen');
    const sliderScreen = document.getElementById('slider-screen');

    // Функция для переключения экранов с анимацией
    function switchScreen(from, to) {
        from.classList.remove('is-active');

        from.classList.add('display-none');
        to.classList.remove('display-none');

        // Задержка на один кадр, чтобы сработал transition opacity
        requestAnimationFrame(() => {
            to.classList.add('is-active');
        });
    }

    // 1. Клик на первом экране
    const startBtn = firstScreen.querySelector('.first-screen__btn');
    startBtn.addEventListener('click', () => {
        switchScreen(firstScreen, secondScreen);
    });

    // 2. Клик по кнопкам на втором экране
    const categoryButtons = secondScreen.querySelectorAll('.second-screen__btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title'); // Берем значение из атрибута

            switchScreen(secondScreen, sliderScreen);

            // Вызываем вашу функцию инициализации слайдера
            if (typeof initSliderByKey === 'function') {
                // Предполагаем, что 'texts' объявлена глобально или доступна в этой области
                initSliderByKey(title, window.texts || []);
            } else {
                console.warn('Функция initSliderByKey не найдена');
            }
        });
    });

    setTimeout(() => firstScreen.classList.add('is-active'), 10);

// 3. Возврат из слайдера в меню (второй экран)
    const menuBtn = document.getElementById('menu-btn');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Скрываем экран слайдера и возвращаем второй экран
            switchScreen(sliderScreen, secondScreen);

            // Опционально: если нужно "убить" или обнулить слайдер при выходе
            // destroySlider();
        });
    }
});