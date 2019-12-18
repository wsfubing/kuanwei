import { Tool } from './tool.js';
var tool = new Tool();

class Navigation {
    constructor() {
        this.Oli = tool.$('.one', 'all');
        this.Oman = tool.$('.man');
        this.maskLayer = tool.$('.mask_layer');
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

class Banner {
    constructor() {

    }
    init() {

    }
}
new Banner().init();

//幻灯片
class Slide {
    constructor() {
        this.btnleft = tool.$('.slide .lef');
        this.btnright = tool.$('.slide .rig');
        this.meau = tool.$('.meau li', 'all');
        this.img = tool.$('.slide .pic img', 'all');
        this.index = 0;
    }
    init() {
        let _this = this;
        this.over();
        this.automation();
        this.btnleft.onclick = function () {
            _this.leftclick();
        };
        this.btnright.onclick = function () {
            _this.rightclick();
        };
    }
    // 给meau添加滑动事件
    over() {
        let _this = this;
        for (let i = 0; i < this.meau.length; i++) {
            this.meau[i].onmouseover = function () {
                _this.index = i;
                _this.opacity();
            }
        }
    }
    // 给箭头添加点击事件
    rightclick() {
        let _this = this;
        _this.index++;
        if (_this.index > _this.img.length - 1) {
            _this.index = 0;
        };
        tool.bufferMove(_this.img[_this.index], { opacity: 100 });
        _this.opacity();
    }
    leftclick() {
        let _this = this;
        _this.index--;
        if (_this.index < 0) {
            _this.index = 5;
        }
        tool.bufferMove(_this.img[_this.index], { opacity: 100 });
        _this.opacity();

    }
    // 封装切换过程
    opacity() {
        for (let j = 0; j < this.meau.length; j++) {
            this.meau[j].className = '';
            tool.bufferMove(this.img[j], { opacity: 0 });
        }
        this.meau[this.index].className = 'show';
        tool.bufferMove(this.img[this.index], { opacity: 100 });
    }
    // 自动轮播
    automation() {
        let _this = this;
        setInterval(function () {
            _this.rightclick()
        }, 2500)
    }
};
new Slide().init();

// 热卖单品
class Hot {
    constructor() {
        this.oLi = tool.$('.selling-item .inner .pic li', 'all');
        this.oLine = tool.$('.selling-item .inner .line .line-con');
        this.oDiv = tool.$('#box', 'all');
        this.arr = ['10%', '35%', '60%', '85%']
    }
    init() {
        this.over()
    }
    over() {
        let _this = this;
        for (let i = 0; i < this.oLi.length; i++) {
            this.oLi[i].onmouseover = function () {
                for (let j = 0; j < _this.oDiv.length; j++) {
                    _this.oDiv[j].className = 'hid';
                    _this.oDiv[j].style.display='none'
                    tool.bufferMove(_this.oDiv[j], { opacity: 0 });
                }
                _this.oDiv[i].style.display = 'block';
                tool.bufferMove(_this.oDiv[i], { opacity: 100 });
                _this.oLine.style.left = _this.arr[i];
                tool.bufferMove(_this.oLine,{left:_this.arr[i]})
            }
        }

    }
}
new Hot().init();
export { Slide, Navigation }