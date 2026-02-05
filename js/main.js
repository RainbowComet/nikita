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
        'Семейное древо': {
            1: {
                'title': 'Семейное древо',
                'text': 'Все началось с Христофора Штуцера, который прибыл в&nbsp;Россию вместе с Петром I',
                'img': '1.svg',
            },
            2: {
                'title': 'Семейное древо',
                'text': 'Иван Иванович Штуцер — знаменитый педагог, автор «Курса&nbsp;географии Европы для старших классов средних учебных заведений» (М., 1884)',
                'img': '2.svg',
            },
            3: {
                'title': 'Семейное древо',
                'img': '3.svg',
            },
        },

        'Детство': {
            1: {
                'img': '1.png',
                'text': '«Росла я вполне обеспеченным благополучным ребенком в&nbsp;интеллигентной семье инженеров. Играла в баскетбол, была редактором районной пионерской газеты. <br>Зимой каталась на лыжах в Подмосковье, а летом увлекалась&nbsp;плаванием. Еще коллекционировала марки, значки и советские монеты, рисовала портреты своих знакомых и пела в школьном хоре. Сочиняла стишки\n' +
                    '                для&nbsp;всяких капустников и школьных концертов. <br>Ну, в общем, валяла дурака»',
            },
            2: {
                'img': '2.png',
                'text': '«В детстве у меня все складывалось само собой. Я редко прилагала к чему-то особые усилия. Училась нормально, но&nbsp;без напряжения»',
            },
            3: {
                'img': '3.png',
                'text': '«В школе я думала, что я буду ветеринаром. Ветеринар из&nbsp;меня не получился, главным образом потому, что я не смогла осилить химию. Я пошла на факультет прикладной математики, в институт электронного машиностроения, и&nbsp;думалось мне, что я буду инженером…»',
            },
        },
        'Юность': {
            1: {
                'img': '1.png',
                'text': '',
            },
            2: {
                'img': '2.png',
                'text': '',
            },
            3: {
                'img': '3.png',
                'text': '«В студенческие годы увлеклась авторской песней: турслеты, романтика… Потом научилась играть на гитаре... Люблю стихи под музыку: Окуджаву, Визбора...»',
            },
            4: {
                'img': '4.png',
                'text': '«Театром я тоже очень увлекалась в юношеские годы. <br>Знала репертуары главных московских театров: <br>Моссовета, на Таганке, Современника. <br>И сама всегда лезла в какую-нибудь самодеятельность. <br>Стихи писала. Только лирическая поэзия мне никогда не&nbsp;давалась, скорее, рифмы для стенгазеты»',
            },
        },

        'Семья': {
            1: {
                'img': '1.png',
                'text': '«Евгений Касперский раньше был разработчиком, вирусологом, анализировал код и в своё время был, наверно, одним из лучших в мире»',
            },
            2: {
                'img': '2.png',
                'text': '',
            },
            3: {
                'img': '3.png',
                'text': '«Старший сын — Максим. Мне очень нравилось имя, оно&nbsp;казалось редким. Но когда мы впервые вышли гулять на&nbsp;детскую площадку, то на мое «Максим» обернулись почти все мальчики. С тех пор мы стали выбирать имена по каким-то другим признакам…»',
            },
            4: {
                'img': '4.png',
                'text': '«Иван назван так в честь двух его дедов»',
            },
            5: {
                'img': '5.png',
                'text': '«Имя навеяно весами в родильной палате. <br>Я провела несколько часов в предродовой палате,&nbsp;а&nbsp;там&nbsp;обстановка скудная, и взгляд всегда цеплялся за детские весы «Саша». Она и есть Саша, характер мальчишеский, победительница»',
            },
            6: {
                'img': '6.png',
                'text': '«Мария — имя ей Саша дала. Так и сказала: “Хочу сестренку Машу»',
            },
            7: {
                'img': '7.png',
                'text': '«Младшая Варвара — назвали в честь прабабушки Игоря. Варюшка — так ее наша Маша ласково называет»',
            },
            8: {
                'img': '8.png',
                'text': '«С Игорем бессмысленно тягаться. За ним — очевидное превосходство. А если серьезно, то мы как раз удачно дополняем друг друга, являясь экспертами в разных вещах. Это очень удобно»',
            },
            9: {
                'img': '9.png',
                'text': '«Огромное влияние на мое формирование оказал мой второй муж — Игорь Ашманов, у которого есть целый ряд бизнесов в сфере высоких технологий»',
            },
            10: {
                'img': '10.png',
                'text': '',
            },
        },

        'Увлечения': {
            1: {
                'img': '1.png',
                'title': 'Полная котомка',
                'custom': '<div class="title-block"><h3 class="title-block__text">\t<span class="title-block__year">2015:</span>\t<span class="title-block__year-value">Создала ферму «Зеленый барашек»</span></h3><div class="title-block__additional-text">Как пришла эта идея?</div></div>',
                'text': '«Вы знаете, она пришла случайно. На самом деле, мы просто, когда заселились в усадьбу, то дети были еще маленькие, и нужно было молоко. А здесь всё далеко, никуда&nbsp;особо не наездишься. И мы завели козу. Коза привезла козлят, мы этих козлят поменяли на пять девочек.&nbsp;Так они стали расти, расти, плодиться,<br> плодиться...»',
            },
            2: {
                'img': '2.png',
                'custom': '<div class="title-block"><h3 class="title-block__text">\t<span class="title-block__year">2023:</span>\t<span class="title-block__year-value">«Переориентировала ферму «Зеленый барашек» в экоферму «Полная котомка» и&nbsp;начала производство молочной продукции и&nbsp;сыров»</span></h3></div>',
                'text': '«Это очень интересно. Муж подарил мне двух баранов. Они были такие смешные, уже большие, и он перевязал их зелеными ленточками — такой подарок. Они были очень дикими, боялись. «Зеленый барашек» появился раньше, но он специально обвязал их зелеными ленточками, чтобы изобразить зеленого барашка»',
            },
            3: {
                'img': '3.png',
                'title': 'Сердце, которое звучит',
                'text': '«Если серьезно говорить, мне не хватает в современной жизни хорошей музыки… Песенный жанр — это хорошие стихи, положеные на хорошую музыку. Сегодня этого не&nbsp;хватает. Поэтому если я не могу этого услышать, я буду сама петь»',
            },
            4: {
                'img': '4.png',
                'text': '«Долгие годы пение было просто скрашиванием досуга. <br>Я пела колыбельные детям и вечерами на даче, но&nbsp;серьезно заниматься музыкой уже не планировала. Пока судьба вдруг не столкнула меня с удивительным человеком — Натальей Смирновой, профессиональной певицей с хорошим образованием и великолепным сопрано, которая параллельно с выступлениями на сцене занималась преподаванием вокала. Знакомый посоветовал мне взять у неё урок. Я взяла один урок, потом ещё один. И вот уже пять лет продолжаю»',
            }
            ,
            5: {
                'img': '5.png',
                'text': '«Лет 5 во мне зрела мысль записать диск с песнями, посвящёнными войне. Это же огромный песенный пласт — свыше 500 песен. И очень плохо, что тема эта постепенно стала забываться. Как только что-то забываешь, оно случается. С началом СВО я поняла, что&nbsp;откладывать уже некуда»',
            }
            ,
            6: {
                'img': '6.png',
                'title': 'Спорт',
                'text': '«С удовольствием катаюсь на лыжах по пересеченной местности. Люблю коньки. Недавно появилось еще одно хобби — горные лыжи, хотя на склоне я на них выгляжу неважно. Но это не мешает мне карабкаться в гору вновь и&nbsp;вновь, чтобы набить шишку при очередном спуске. Бизнес очень напоминает горные лыжи — только двигаться там нужно не вниз, а вверх»',
            }
            ,
            7: {
                'img': '7.png',
                'text': '«Еще занимаюсь спортом: горные лыжи, коньки. В детстве ходила в секцию, потом забросила, а недавно встала на&nbsp;коньки и поехала — что меня совершенно поразило, за&nbsp;двадцать-то лет»',
            }
            ,
            8: {
                'img': '8.png',
                'text': '',
            }
            ,
        },
    }


    swiper = false;

    function initSliderByKey(key, data) {
        const sliderContainer = document.querySelector('.swiper-container');

        if (swiper) {
            swiper.destroy(true, true); // (deleteInstance, cleanStyles)
            swiper = null;

            const wrapper = sliderContainer.querySelector('.swiper-wrapper');
            if (wrapper) wrapper.innerHTML = '';
        }


        const sliderWrapper = document.querySelector('#slider-screen .swiper-wrapper');
        if (!sliderWrapper || !data[key]) return;

        // 1. Очищаем текущие слайды
        sliderWrapper.innerHTML = '';

        // 2. Проходим по объекту данных (например, по "Детство")
        const slidesData = data[key];

        Object.keys(slidesData).forEach(id => {
            const item = slidesData[id];

            // Формируем путь к картинке: Ключ-Номер.png
            const imgSrc = `images/${key}/${item.img}`;
            console.log(imgSrc);
            // Создаем структуру слайда
            titleHtml = '';
            if (item.title != undefined) {
                titleHtml = '<div class="title-block"><h3 class="title-block__text">' + item.title + '</h3></div>';
            }
            customHtml = '';
            if (item.custom != undefined) {
                customHtml = item.custom;
            }

            if (key == 'Семейное древо') {
                 slideHtml = `
                <div class="swiper-slide">
                    ${titleHtml}
                     ${item.text ? `<p class="slider-screen__text">${item.text}</p>` : ''}
                    <div class="slider-screen__img-wrapper">
                        <img src="${imgSrc}" alt="${key} ${id}">
                    </div>
                   
                </div>
            `;   console.log(slideHtml);
            } else if (key == 'Увлечения') {
                slideHtml = `
                    <div class="swiper-slide">
                     <div class="slider-screen__img-wrapper">
                            <img src="${imgSrc}" alt="${key} ${id}">
                        </div>
                        ${titleHtml}
                        ${customHtml}
                        ${item.text ? `<p class="slider-screen__text">${item.text}</p>` : ''}
                    </div>
                `;
            } else {
                 slideHtml = `
                    <div class="swiper-slide">
                        ${titleHtml}
                        ${customHtml}
                        <div class="slider-screen__img-wrapper">
                            <img src="${imgSrc}" alt="${key} ${id}">
                        </div>
                        ${item.text ? `<p class="slider-screen__text">${item.text}</p>` : ''}
                    </div>
                `;
            }

            sliderWrapper.insertAdjacentHTML('beforeend', slideHtml);
        });

        // 3. Инициализация Swiper
        // Если swiper уже был инициализирован, его нужно уничтожить и создать заново
        if (window.mySwiper) {
            window.mySwiper.destroy(true, true);
        }

        swiper = new Swiper('#slider-screen', {

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
    //initSliderByKey('Детство', texts);


    // Элементы экранов
    const firstScreen = document.getElementById('first-screen');
    const secondScreen = document.getElementById('second-screen');
    const sliderScreen = document.getElementById('slider-screen');
    const menuBtn = document.getElementById('menu-btn');

    function switchScreen(from, to, callback) {
        // 1. Убираем флаг активности с текущего экрана

        // Если уходим со второго экрана, добавляем разлет кнопок
        timeout = 500;
        if (from === secondScreen) {
            from.classList.add('is-leaving');
            timeout = 900;
        } else {
            from.classList.remove('is-active');
        }

        // Ждем завершения анимации исчезновения (1s)
        setTimeout(() => {
            from.classList.add('display-none');
            from.classList.remove('is-leaving'); // Очищаем состояние ухода

            // Подготавливаем следующий экран (убираем активность перед показом)
            to.classList.remove('is-active');
            to.classList.remove('display-none');

            // Используем двойной requestAnimationFrame, чтобы браузер
            // гарантированно заметил добавление класса и запустил CSS-анимацию
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    to.classList.add('is-active');
                    if (callback) callback();
                });
            });
        }, timeout);
    }

    // Обработчики кликов
    firstScreen.querySelector('.first-screen__btn').onclick = () => {
        switchScreen(firstScreen, secondScreen);
    };

    secondScreen.querySelectorAll('.second-screen__btn').forEach(btn => {
        btn.onclick = () => {
            const title = btn.getAttribute('data-title');
            switchScreen(secondScreen, sliderScreen, () => {
                document.getElementById('footer-title').innerHTML = title;
                initSliderByKey(title, window.texts);
            });
        };
    });

    if (menuBtn) {
        menuBtn.onclick = () => {
            switchScreen(sliderScreen, secondScreen);
        };
    }

    firstScreen.classList.add('is-active');
});