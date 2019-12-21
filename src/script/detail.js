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

class Detailrender {
    constructor() {
        this.sid = location.search.substring(1).split('=')[1];
        this.h1 = tool.$('.pic .title h1');
        this.span = tool.$('.pic .title span');
        this.spicimg = tool.$('.spic img');
        this.spic = tool.$('.spic');
        this.bpic = tool.$('.bpic');
        this.oA = tool.$('.list-pic a', 'all');
        this.oImg = tool.$('.list-pic a img', 'all');
        this.bf = tool.$('.bf');
        this.sf = tool.$('.sf');
        this.inner = tool.$('main .inner');
        this.tab = tool.$('.tab');
        this.list = tool.$('.list-pic');
    }
    init() {
        let _this = this;
        tool.ajax({
            url: 'http://localhost/kuanwei/php/detail.php',
            data: {
                id: this.sid
            },
            dataType: 'json'
        }).then(function (objdata) {
            console.log(objdata);
            _this.spicimg.src = objdata.url;
            _this.bpic.src = objdata.url;
            _this.h1.innerHTML = objdata.title;
            _this.span.innerHTML += objdata.price;
            // 渲染下面的list—pic
            let urls = objdata.urls.split(',')
            for (let i = 0; i < _this.oImg.length; i++) {
                _this.oImg[i].src = urls[i];
            }
        })
        this.over();
        this.out();
        this.list.onclick = function (ev) {
            var ev = ev || window.event;
            let ele = ev.target || ev.srcElement;
            if (ele.nodeName === 'IMG') {
                let imgurl = ele.src; //获取图片地址
                _this.spicimg.src = imgurl;
                _this.bpic.src = imgurl;
            }
        }
    }
    // 放大镜效果
    over() {
        let _this = this;
        this.spic.onmouseover = function () {
            _this.bf.style.display = 'block';
            _this.sf.style.display = 'block';
            // 求小放的比例
            console.log(_this.bf.offsetWidth);
            _this.sf.style.width = _this.spic.offsetWidth * _this.bf.offsetWidth / _this.bpic.offsetWidth + 'px';
            _this.sf.style.height = _this.spic.offsetHeight * _this.bf.offsetHeight / _this.bpic.offsetHeight + 'px';
            // 求比例
            _this.bili = _this.bf.offsetWidth / _this.sf.offsetWidth;
            this.onmousemove = function (ev) {
                var ev = ev || window.event;
                _this.move(ev);


            }
        }
    }
    move(ev) {
        console.log(window.scrollY)
        let l = ev.clientX - this.inner.offsetLeft - this.tab.offsetWidth - this.spic.offsetLeft - this.sf.offsetWidth / 2;
        let t = ev.clientY - this.inner.offsetTop - this.spic.offsetTop + window.scrollY - this.sf.offsetHeight / 2;

        if (l <= 0) {
            l = 0;
        } else if (l >= this.spic.offsetWidth - this.sf.offsetWidth - 2) {
            l = this.spic.offsetWidth - this.sf.offsetWidth - 2
        }

        if (t <= 0) {
            t = 0;
        } else if (t >= this.spic.offsetHeight - this.sf.offsetHeight - 2) {
            t = this.spic.offsetHeight - this.sf.offsetHeight - 2
        }
        this.sf.style.left = l + 'px';
        this.sf.style.top = t + 'px';
        // 大图位置
        this.bpic.style.left = -l * this.bili + 'px';
        this.bpic.style.top = -t * this.bili + 'px';
    }
    out() {
        let _this = this;
        this.spic.onmouseout = function () {
            _this.bf.style.display = 'none';
            _this.sf.style.display = 'none';
        }
    }
    

}
new Detailrender().init();