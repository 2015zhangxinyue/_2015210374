 window.onload = function () {
            var container =  document.querySelector('container');
            var list = document.querySelector('list');
            var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var prev = document.querySelector('prev');
            var next = document.querySelector('next');
            prev.addeventlistener("click",_prev,false);
            next.addeventlistener("click",_next,false);

            var index = 1;
            var len = 5;
            var animated = false;
            var interval = 3000;
            var timer;

            

            function animate (offset) {
                if (offset == 0) {
                    return;
                }
                animated = true;
                var time = 300;
                var inteval = 10;
                var speed = offset/(time/inteval);
                var left = parseInt(list.style.left) + offset;

                var go = function (){
                    if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                        list.style.left = parseInt(list.style.left) + speed + 'px';
                        setTimeout(go, inteval);
                    }
                    else {
                        list.style.left = left + 'px';
                        if(left>-200){
                            list.style.left = -600 * len + 'px';
                        }
                        if(left<(-600 * len)) {
                            list.style.left = '-600px';
                        }
                        animated = false;
                    }
                }
                go();
            }

            function showButton() {
                for (var i = 0; i < buttons.length ; i++) {
                    if( buttons[i].className == 'on'){
                        buttons[i].className = '';
                        break;
                    }
                }
                buttons[index - 1].className = 'on';
            }

            function play() {
                timer = setTimeout(function () {
                    next.onclick();
                    play();
                }, interval);
            }
            function stop() {
                clearTimeout(timer);
            }

            function _prev(){
                if (index > 5) {
                    index = 1;
                }
                else{
                    index = index + 1;
                }
                showButton();
                if (animated == false) {
                animate(600);
                }
            }
            function _next(){
                if (index == 1) {
                    index = 5;
                }
                else{
                    index = index - 1;
                }
                showButton();
                if (animated == false) {
                animate(-600);
                }
            }


            for (var i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function () {
                    if (animated) {
                        return;
                    }
                    if(this.className == 'on') {
                        return;
                    }
                    var myIndex = parseInt(this.getAttribute('index'));
                    var offset = -600 * (myIndex - index);

                    animate(offset);
                    index = myIndex;
                    showButton();
                }
            }

            container.onmouseover = stop;
            container.onmouseout = play;

            play();

        }