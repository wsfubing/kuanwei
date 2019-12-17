import { Tool } from './tool.js';
var tool = new Tool();
class Navigation {
    constructor() {
        this.Oli = document.querySelectorAll('.one');
        this.Oman = document.querySelector('.man');
        this.maskLayer = document.querySelector('.mask_layer');
    }
    init() {
        let _this = this;
        _this.over();
        _this.out();
    }
    over() {
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


// 广告条
// !function () {
//     class Banner {
//         constructor() {
//             this.swiperSlide = document.querySelectorAll('.swiper-slide');
//             this.swiperWrapper = document.querySelector('.swiper-wrapper');
//         }
//         init() {
//             let _this = this;
//             let s = 0;
//             let l = this.swiperSlide[0].offsetWidth;
//             // setInterval(function () {
//             //     s = s - l;
//             //     _this.swiperWrapper.style.left = s + 'px';
//             // }, 2000)
//         }


//     }
//     new Banner().init();
// }()

//幻灯片
class Slide {
    constructor() {
        this.btnleft = document.querySelector('.slide .lef');
        this.btnright = document.querySelector('.slide .rig');
        this.meau = document.querySelectorAll('.meau li');
        this.img = document.querySelectorAll('.slide .pic img');
        this.index = 0;
    }
    init() {
        this.over();
        this.click();
    }
    // 给meau添加滑动事件
    over() {
        let _this = this;
        for (let i = 0; i < this.meau.length; i++) {
            // _this.index = i;
            this.meau[i].onmouseover = function () {
                for (let j = 0; j < _this.meau.length; j++) {

                    _this.meau[j].className = '';
                    tool.bufferMove(_this.img[j], { opacity: 0 })
                }
                _this.meau[i].className = 'show';
                tool.bufferMove(_this.img[i], { opacity: 100 })
            }
        }
    }
    // 给箭头添加点击事件
    click() {
        let _this = this;
        this.btnright.onclick = function () {
            _this.index++;
            if (_this.index > _this.img.length-1) {
                _this.index = 0;
            }
            tool.bufferMove(_this.img[_this.index], { opacity: 100 })
            for (let j = 0; j < _this.meau.length; j++) {
                _this.meau[j].className = '';
                tool.bufferMove(_this.img[j], { opacity: 0 })
            }
            _this.meau[_this.index].className = 'show';
            tool.bufferMove(_this.img[_this.index], { opacity: 100 })
        }
        this.btnleft.onclick = function () {
            _this.index--;
            if (_this.index < 0) {
                _this.index = 5;
            }
            tool.bufferMove(_this.img[_this.index], { opacity: 100 })
            for (let j = 0; j < _this.meau.length; j++) {
                _this.meau[j].className = '';
                tool.bufferMove(_this.img[j], { opacity: 0 })
            }
            _this.meau[_this.index].className = 'show';
            tool.bufferMove(_this.img[_this.index], { opacity: 100 })
        }
    }

};
new Slide().init();

export { Slide, Navigation }