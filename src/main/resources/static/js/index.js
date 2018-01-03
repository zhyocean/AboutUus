


 (function ($, window, document, undefined) {
    //'use strict';
    var pluginName = 'vivaTimeline';//Plugin名稱

    //Timeline建構式
    var Timeline = function (element, opt) {
        //私有變數
        this.target = element;
        this.carouselInterval;
        this.checkImgLoad;
        this.imgLoad = false;
        //初始化
        this._init(opt);

        this._event();

    }

    //ImportKML2D預設參數
    Timeline.options = {
        carousel: true,
        carouselTime: 10000
    }

    //Timeline私有方法
    Timeline.prototype = {
        //初始化
        _init: function (_opt) {
            //合併自訂參數與預設參數
            var self = this;
            self.options = $.extend(true, {}, Timeline.options, _opt);

            self.target
                .find('.events-body')
                .each(function(){
                    var rowcount = $(this).find('.row').length;
                    if(rowcount > 1) {
                        var html = "<ol>";
                        for(var i = 0; i < rowcount; i++){
                            html += "<li data-target='" + i + "'></li>";
                        }
                        html += "</ol>";
                        $(this)
                            .siblings('.events-footer')
                            .html(html)
                            .find('li')
                            .first()
                            .addClass('active');
                    }
                });

            self.target
                .find('.events-body')
                .each(function(){
                    $(this)
                        .find('.row')
                        .first()
                        .show()
                        .siblings()
                        .hide();
                });

            self.target
                .find('img').on('load', function(){
                self.target
                    .find('.events-body')
                    .each(function(){
                        var maxHeight = 0;
                        $(this)
                            .find('.row')
                            .each(function(){
                                if($(this).height() > maxHeight){
                                    maxHeight = $(this).height();
                                }
                            });
                        $(this).find('.row').height(maxHeight);
                    });
            });
        },

        //綁定事件
        _event: function () {
            var self = this;
            self.target
                .find('.events-header')
                .click(function(){
                    $(this)
                        .siblings('.events-body').slideToggle()
                        .end()
                        .siblings('.events-footer').toggle();
                });

            self.target
                .find('.events-footer li')
                .click(function(){
                    self._carousel($(this));
                });

            if(self.options.carousel){
                self.carouselInterval = setInterval(function(){
                    self._carousel();
                }, self.options.carouselTime);

                self.target
                    .find('.events')
                    .hover(function(){
                        clearInterval(self.carouselInterval);
                        self.carouselInterval = null;

                    }, function(){
                        if(self.carouselInterval == undefined){
                            self.carouselInterval = setInterval(function(){
                                self._carousel();
                            }, self.options.carouselTime);
                        }
                    });
            }
        },

        //自動輪播
        _carousel: function(_container) {
            var self = this;
            if(_container == undefined){
                self.target
                    .find('.events-footer .active')
                    .each(function(){
                        var nextTarget;
                        if($(this).is(':last-child')){
                            nextTarget = $(this).siblings().first();
                        }
                        else{
                            nextTarget = $(this).next();
                        }
                        self._carousel(nextTarget);
                    });
            }
            else{
                var target = _container.data().target;

                _container
                    .addClass('active')
                    .siblings()
                    .removeClass('active');

                _container
                    .closest('.events-footer')
                    .siblings('.events-body')
                    .find('.row')
                    .eq(target).show()
                    .siblings().hide();
            }
        }
    }

    //公開方法
    $.fn[pluginName] = function (options, args) {
        var timeline;
        this.each(function () {
            timeline = new Timeline($(this), options);
        });
        return this;
    }
})(jQuery, window, document);


//宇宙特效
(function () {

    "use strict";
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,

        hue = 217,
        stars = [],
        count = 0,
        maxStars = 1300;//星星数量

    var canvas2 = document.createElement('canvas'),
        ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,
        gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#CCC');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

// End cache

    function random(min, max) {
        if (arguments.length < 2) {
            max = min;
            min = 0;
        }

        if (min > max) {
            var hold = max;
            max = min;
            min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
        var max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
        //星星移动范围，值越大范围越小，
    }

    var Star = function() {

        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 8;
        //星星大小
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = random(this.orbitRadius) / 50000;
        //星星移动速度
        this.alpha = random(2, 10) / 10;

        count++;
        stars[count] = this;
    };

    Star.prototype.draw = function() {
        var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
    };

    for (var i = 0; i < maxStars; i++) {
        new Star();
    }

    function animation() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.5; //尾巴
        ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = 'lighter';
        for (var i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
        }

        window.requestAnimationFrame(animation);
    }

    animation();
})();

//滚动隐藏
$("nav.fixed-top").autoHidingNavbar();

//自动刷新页面,当窗口大小改变时，刷新页面
 $(function(){
     $(window).resize(function(){
         window.location.reload();
     })
 });
 $(document).ready(function () {
     $('.VivaTimeline').vivaTimeline({
         carousel: true,
         carouselTime: 3000
     });
 });

//懒加载
 window.Echo=(function(window,document,undefined){'use strict';var store=[],offset,throttle,poll;var _inView=function(el){var coords=el.getBoundingClientRect();return((coords.top>=0&&coords.left>=0&&coords.top)<=(window.innerHeight||document.documentElement.clientHeight)+parseInt(offset));};var _pollImages=function(){for(var i=store.length;i--;){var self=store[i];if(_inView(self)){self.src=self.getAttribute('data-echo');store.splice(i,1);}}};var _throttle=function(){clearTimeout(poll);poll=setTimeout(_pollImages,throttle);};var init=function(obj){var nodes=document.querySelectorAll('[data-echo]');var opts=obj||{};offset=opts.offset||0;throttle=opts.throttle||250;for(var i=0;i<nodes.length;i++){store.push(nodes[i]);}_throttle();if(document.addEventListener){window.addEventListener('scroll',_throttle,false);}else{window.attachEvent('onscroll',_throttle);}};return{init:init,render:_throttle};})(window,document);

 Echo.init({

    offset:200,

     throttle: 0

 });

 //预加载
 $(document).ready(function () {

     setTimeout(function () {

         // reference to <head>
         var head = document.getElementsByTagName('head')[0];

         // a new CSS
         var css = document.createElement('link');
         css.type = "text/css";
         css.rel = "stylesheet";
         css.href = "../stylesheets/css/main.css";

         // preload JS and CSS
         head.appendChild(css);

         // preload image
         new Image().src = "../img/back3.jpg";


     }, 1000);
 });