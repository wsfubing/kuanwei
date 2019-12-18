function Tool() {
    return {
        //获取元素对象
        $: function (selector, all) {
            if (all === 'all') {
                return document.querySelectorAll(selector);
            } else {
                return document.querySelector(selector);
            }
        },

        //cookie 的存、取、删
        getcookie: function (key) {
            if (document.cookie) { //判断是否有cookie
                let arr = document.cookie.split('; '); //拆分cookie
                for (let i = 0; i < arr.length; i++) {
                    let item = arr[i].split('='); //拆分cookie，获得key和value
                    // 遍历寻找key 返回值
                    if (item[0] === key) return item[1];
                }
                return ''; //如果遍历结束 都没有找到  返回空字符串
            }
        },
        setcookie: function (key, value, day) {
            if (day) {
                var d = new Date();
                d.setDate(d.getDate() + day);
                document.cookie = `${key}=${value};expires=${d};path=/`;
            } else {
                document.cookie = `${key}=${value};path=/`;
            }
        },
        removecookie: function (key) {
            this.set(key, '', -1);
        },

        //缓冲运动
        bufferMove: function (obj, json, fn) {//obj:运动的元素对象  json:属性和属性值组成一个对象  fn:可选的回调函数(前一次运动结束，开启后一次的运动)
            var speed = 0;
            //获取任意的css属性值。
            function getstyle(obj, attr) {
                if (window.getComputedStyle) {
                    return getComputedStyle(obj)[attr];
                } else {
                    return obj.currentStyle[attr];
                }
            }
            clearInterval(obj.timer);//放置定时器叠加
            obj.timer = setInterval(function () {//给每一个元素对象绑定一个定时器
                var bstop = true;
                for (var attr in json) {
                    //1.获取当前盒子的属性值
                    var currentvalue = null;
                    //处理透明度和其他带有px属性值的关系
                    if (attr === 'opacity') {
                        currentvalue = Math.round(getstyle(obj, attr) * 100);//透明度(扩展100倍)
                    } else {
                        currentvalue = parseInt(getstyle(obj, attr));//px
                    }
                    //2.求速度
                    //如果速度>0 向上取整，否则向下取整
                    speed = (json[attr] - currentvalue) / 20;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    //3.判断运动是否停止。
                    if (currentvalue !== json[attr]) {//当前值没到到目标点，继续运动。
                        //属性运动的过程
                        if (attr === 'opacity') {//透明度
                            obj.style.opacity = (currentvalue + speed) / 100;
                            obj.style.filter = 'alpha(opacity=' + (currentvalue + speed) + ')';
                        } else { //px为单位
                            obj.style[attr] = currentvalue + speed + 'px';
                        }
                        bstop = false;
                    }
                }


                //如果bstop走到这里还是为true，代表中间没有改变bstop。所有的属性都运动完成。
                if (bstop) {
                    clearInterval(obj.timer);
                    //利用fn实现运动结束之后需要做的事情。
                    //判断fn是否存在,判断fn是否是函数,执行这个函数。
                    fn && typeof fn === 'function' && fn();
                }

            }, 1000 / 60);
        },

        // 添加类 addClass removeClass

        addClass: function (ele, classname) { //ele:元素对象   
            //判断ele是一个元素还是多个元素。
            //Node:一个元素
            //NodeList：多个元素
            if (ele instanceof NodeList) {
                for (let i = 0; i < ele.length; i++) {
                    ele[i].nodeType === 1 && (ele[i].className += (ele[i].className ? " " : "") + classname);
                }
            } else if (ele instanceof Node) {
                ele.nodeType === 1 && (ele.className += (ele.className ? " " : "") + classname);
            }
        },

        removeClass: function (elem, name) {
            var set = " " + elem.className + " ";

            // Class name may appear multiple times
            while (set.indexOf(" " + name + " ") >= 0) {
                set = set.replace(" " + name + " ", " ");
            }

            // Trim for prettiness
            elem.className = typeof set.trim === "function" ? set.trim() : set.replace(/^\s+|\s+$/g, "");
        },

        // ajax
        ajxa: function (obj) {

            //将对象转换成数据拼接适合的字符串的格式?&
            function objToString(obj) {
                if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
                    let objarr = [];
                    for (let i in obj) {
                        objarr.push(i + '=' + obj[i]);
                    }
                    return objarr.join('&')
                }
            }

            //创建promise实例
            let promise = new Promise((resolve, reject) => {
                let ajax = new XMLHttpRequest(); //获取ajax对象

                //1.默认get,此参数可以省略。
                obj.type = obj.type || 'get';

                //2.接口地址不能为空
                if (!obj.url) {
                    throw new Error('接口地址不能为空');
                }

                //3.数据存在(对象转字符串，字符串直接使用)
                if (obj.data) {
                    if (Object.prototype.toString.call(obj.data).slice(8, -1) === 'Object') {
                        obj.data = objToString(obj.data);
                    } else {
                        obj.data = obj.data;
                    }
                }

                //4.数据存在，同时get请求，将数据拼接到地址栏的后面
                if (obj.data && obj.type === 'get') {
                    obj.url += '?' + obj.data;
                }

                //6.是否异步,如果同步无需onreadystatechange进行监听
                if (obj.async === 'false' || obj.async === false) {
                    obj.async = false;
                } else {
                    obj.async = true;
                }

                ajax.open(obj.type, obj.url, obj.async);

                //5.数据存在和post,通过send和请求头传输数据
                if (obj.data && obj.type === 'post') {
                    ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                    ajax.send(obj.data);
                } else {
                    ajax.send();
                }

                //7.同步异步获取数据(利用回调函数将数据传输出来)
                if (obj.async) { //异步
                    ajax.onreadystatechange = function () {
                        if (ajax.readyState === 4) { //服务器响应成功
                            if (ajax.status === 200) { //请求接口成功
                                let objdata = null;
                                if (obj.dataType === 'json') {
                                    objdata = JSON.parse(ajax.responseText);
                                } else {
                                    objdata = ajax.responseText;
                                }
                                resolve(objdata);


                            } else { //接口有误
                                reject('接口地址有误');
                            }
                        }
                    }
                } else { //同步
                    if (ajax.status === 200) {
                        let objdata = null;
                        if (obj.dataType === 'json') {
                            objdata = JSON.parse(ajax.responseText);
                        } else {
                            objdata = ajax.responseText;
                        }
                        resolve(objdata);
                    } else {
                        reject('接口地址有误');
                    }
                }

            });

            return promise;
        }
    }
}

export { Tool }