/*!
 * simple-carousel2
 * @author: Avakandy
 * @version: 0.0.1
 * Copyright 2017.
 */


'use strict';

var Carousel = (function () {
    var method = function (list) {
        this.slider = list;
        this.slides = this.slider.getElementsByTagName('li');
        this.count = this.slides.length;
        this.size = this.slider.getAttribute('data-size');
        this.timeout = this.slider.getAttribute('data-time');
        this.mode = this.slider.getAttribute('data-mode');
        this.current = 0;
    };

    method.prototype.init = function () {
        //проверим переданные параметры
        if (isNaN(this.size)) {
            this.size = 100;
        }

        if (isNaN(this.timeout) || this.timeout < 1000) {
            this.timeout = 2000;
        }

        if (!(this.mode === 'vertical' || this.mode === 'horizontal')) {
            this.mode = 'vertical';
        }

        //поставим последний элемент перед первым
        var last = this.slides[this.count - 1];
        this.slider.insertBefore(last, this.slides[0]);

        if (this.mode === 'horizontal') {
            //сместим список влево на ширину элемента
            this.slider.style.left = -this.size + 'px';
            //зададим ширину списка по кол-ву элементов
            this.slider.style.width = this.size * this.count + 'px';
        } else {
            //сместим список на высоту элемента
            this.slider.style.top = -this.size + 'px';
        } 

        //запускаем
        setInterval(this.move.bind(this), this.timeout);
    };

    method.prototype.move = function () {
        //анимируем и смещаем список на один элемент
        addClass(this.slider, 'moved');
        if (this.mode === 'horizontal') {
            this.slider.style.transform = 'translateX( -' + this.size + 'px)';
        } else {
            this.slider.style.transform = 'translateY( -' + this.size + 'px)';
        }
        //через 1с, поставим первый элемент в конец списка
        setTimeout(this.change.bind(this), 1000);
    };

    method.prototype.change = function () {
        removeClass(this.slider, 'moved'); //отключаем эффект анимации
        this.slider.style.transform = 'none';
        this.slider.appendChild(this.slides[0]);
    };

    return method;
})();


//подключаем
var slider1 = new Carousel(document.getElementById('crsl01'));
slider1.init();

var slider2 = new Carousel(document.getElementById('crsl02'));
slider2.init();

var slider3 = new Carousel(document.getElementById('crsl03'));
slider3.init();


//helpers
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