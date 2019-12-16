
!function () {
    class Navigation {
        constructor() {
            this.Oli = document.querySelectorAll('.one');
            this.Oman = document.querySelector('.man');
            this.maskLayer = document.querySelector('.mask_layer');
        }
        init() {
            let _this = this;
            _this.move();
            _this.out();
        }
        move() {
            let _this = this;
            this.Oli[0].onmouseover = function () {
                _this.Oman.style.display = 'block';
                _this.maskLayer.style.display = 'block';
                _this.Oman.onmouseover = function () {
                    _this.Oman.style.display = 'block';
                    _this.maskLayer.style.display = 'block';
                }
            }
        }
        out() {
            let _this = this;
            this.Oli[0].onmouseout = function () {
                _this.Oman.style.display = 'none';
                _this.maskLayer.style.display = 'none';
                _this.Oman.onmouseout = function () {
                    _this.Oman.style.display = 'none';
                    _this.maskLayer.style.display = 'none';
                }
            }
        }
    }
    new Navigation().init();
}();

// 广告条
!function () {
    class Banner {
        constructor() {
            this.swiperSlide = document.querySelectorAll('.swiper-slide');
            this.swiperWrapper = document.querySelector('.swiper-wrapper');
        }
        init() {
            let _this = this;
            let s = 0;
            let l = this.swiperSlide[0].offsetWidth;
            // this.swiperWrapper.onclick = function () {
            //     s = s - l
            //     _this.swiperWrapper.style.left = s + 'px'
            // }
            setInterval(function () {
                s = s - l;
                _this.swiperWrapper.style.left = s + 'px';
            }, 2000)
        }


    }
    new Banner().init();
}()