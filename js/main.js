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
    const menuBtn = document.getElementById('menu-btn');

    function switchScreen(from, to, callback) {
        // Если уходим со второго экрана, запускаем анимацию разлета
        if (from === secondScreen) {
            from.classList.add('is-leaving');

            // Ждем завершения анимации кнопок (0.6s), затем скрываем экран
            setTimeout(() => {
                finalizeSwitch(from, to, callback);
                from.classList.remove('is-leaving'); // Чистим класс для следующего раза
            }, 600);
        } else {
            // Обычное переключение для остальных экранов
            from.classList.remove('is-active');
            setTimeout(() => finalizeSwitch(from, to, callback), 500);
        }
    }

    function finalizeSwitch(from, to, callback) {
        from.classList.add('display-none');
        to.classList.remove('display-none');

        // Маленький хак для инициализации анимации появления
        requestAnimationFrame(() => {
            to.classList.add('is-active');
            if (callback) callback();
        });
    }

    // 1. Из первого во второй
    firstScreen.querySelector('.first-screen__btn').onclick = () => {
        switchScreen(firstScreen, secondScreen);
    };

    // 2. Из второго в слайдер
    secondScreen.querySelectorAll('.second-screen__btn').forEach(btn => {
        btn.onclick = () => {
            const title = btn.getAttribute('data-title');
            switchScreen(secondScreen, sliderScreen, () => {
                if (window.initSliderByKey) initSliderByKey(title, window.texts);
            });
        };
    });

    // 3. Возврат в меню
    if (menuBtn) {
        menuBtn.onclick = () => switchScreen(sliderScreen, secondScreen);
    }

    firstScreen.classList.add('is-active');
});