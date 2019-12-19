import { Tool } from './tool.js';
let tool = new Tool();
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