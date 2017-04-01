(function () {
    'use strict';

    var Carousel = (function () {
        var method = function (list) {
            this.slider = list;//список слайдов
            this.slides = this.slider.getElementsByTagName('li');//слайды
            this.count = this.slides.length;//кол-во слайдов
            this.size = this.slider.getAttribute('data-size');//высота (или ширина) слайда
            this.delay = this.slider.getAttribute('data-time');//время смены слайдов
            this.mode = this.slider.getAttribute('data-mode'); //режим (вертикальный - vertical, горизонтальный - horizontal )
            this.current = 0; //текущий слайд
            this.handle = {}; //будем хранить состояние слайдера (запущен - остановлен)
        };

        method.prototype.init = function () {
            this.handle.isStarted = false; //флаг состояния
            //проверим переданные параметры
            if (isNaN(this.size)) {//если не указали высоту (или ширину) слайда
                this.size = 100;
            }

            if (isNaN(this.delay) || this.delay < 1000) {//если забыли указать время смены слайдов
                this.delay = 2000;
            }

            if (!(this.mode === 'vertical' || this.mode === 'horizontal')) {//если забыли указать режим
                this.mode = 'vertical';
            }

            //поставим последний элемент перед первым
            var last = this.slides[this.count - 1];
            this.slider.insertBefore(last, this.slides[0]);

            if (this.mode === 'horizontal') { //если слайдер - горизонтальный
                //сместим список влево на ширину элемента
                this.slider.style.left = -this.size + 'px';
                //зададим ширину списка по кол-ву элементов
                this.slider.style.width = this.size * this.count + 'px';
            } else { //если слайдер - вертикальный
                //сместим список на высоту элемента
                this.slider.style.top = -this.size + 'px';
            }

            this.start(); //запускаем
            this.hover(); //подключаем события hover
        };

        method.prototype.start = function () {//старт автоматической прокрутки слайдов
            if (!this.handle.isStarted) {
                this.handle.isStarted = true;
                this.handle.timer = setInterval(this.move.bind(this), this.delay);//запускаем с интервалом delay
            }
        };

        method.prototype.stop = function () {//остановим автоматическую прокрутку слайдов
            if (this.handle.isStarted) {
                this.handle.isStarted = false;
                clearTimeout(this.handle.timer);
            }
        };

        method.prototype.hover = function () {//будем останавливать авт.прокрутку при наведении мыши
            this.slider.addEventListener('mouseover', function () {
                this.stop();
            }.bind(this));
            this.slider.addEventListener('mouseout', function () {
                this.start();
            }.bind(this));
        };

        method.prototype.move = function () {
            //анимируем и смещаем список на один элемент
            addClass(this.slider, 'moved');
            if (this.mode === 'horizontal') {
                this.slider.style.transform = 'translateX( -' + this.size + 'px)';
            } else {
                this.slider.style.transform = 'translateY( -' + this.size + 'px)';
            }
            //через 1с (1с - время анимации при смене слайда) поставим первый элемент в конец списка
            setTimeout(this.change.bind(this), 1000);
        };

        method.prototype.change = function () {
            removeClass(this.slider, 'moved'); //отключаем эффект анимации для transform
            this.slider.style.transform = 'none';
            this.slider.appendChild(this.slides[0]);//перестановка
        };

        return method;
    })();

    //helpers (добавим/уберем класс с fallback для ie9)
    function addClass(el, className) {
        if (el.classList)
            el.classList.add(className);
        else
            el.className += ' ' + className;
    }

    function removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className);
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    //--------------------------------------------------------------------------------------------------------------------------
    //подключаем слайдеры на странице, параметры передаем через data-атрибуты (см. html-разметку)
    var slider1 = new Carousel(document.getElementById('crsl01'));
    if (slider1) {
        slider1.init();
    }

    var slider2 = new Carousel(document.getElementById('crsl02'));
    if (slider2) {
        slider2.init();
    }

    var slider3 = new Carousel(document.getElementById('crsl03'));
    if (slider3) {
        slider3.init();
    }
})();






