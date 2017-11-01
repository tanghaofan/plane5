const React = require("react");
const ReactDom = require("react-dom");






//自己的飞机
var MyPlane = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                position: "absolute",
                bottom: "0px",
                left: "50%",
                marginLeft: "-25px"
            }
        }
    },
    render: function () {
        return (
            <div ref="myPlane" style={this.props.style} id="myPlane" className="myPlane" onTouchStart={this.props.drag}></div>
        )
    }
})


// //道具的样子
// //1.加强子弹
// var BulletBuff = React.createClass({

// })

// //2.炸弹
// var AddBomb = React.createClass({

// })

// //随机把这2种道具添加到游戏中
// setInterval(function () {

// }, 1000)

var Score = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                position: "absolute",
                top: "25px",
                left: "50%",
                height: "30px",
                width: "250px",
                marginLeft: "-125px",
                fontSize: "30px",
                textAlign: "center",
                letterSpacing: '4px'
            }
        }
    },   
    render: function () {
        return (
            <div id="score" style={this.props.style}></div>
        )
    }
})

// //炸弹计数器
var Bomb = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                position: "absolute",
                bottom: "5px",
                left: "5px",
                height: "41px",
                width: "53px",
                backgroundImage: "url('./src/img/3.png')",
            },
            style1: {
                position: "absolute",
                bottom: "10px",
                left: "80px",
                height: "30px",
                width: "70px",
                fontSize: "30px",
                textAlign:'center',
                letterSpacing: '12px'
            }
        }
    },   
    render: function () {
        return (
            <div>
                <div id="bomb1" style={this.props.style}></div>
                <div id="bomb2" style={this.props.style1}></div>
            </div>
        )
    }
})

// //暂停按钮
var Pause = React.createClass({
    getInitialState: function () {
        return {
            pause: false
        }
    },
    getDefaultProps: function () {
        return {
            style: {
                height: "40px",
                width: "36px",
                backgroundImage: "url('./src/img/1.png')",
                position: "absolute",
                top: "20px",
                left: "20px",
            }
        }
    },
    onPauseChange: function () {
        this.setState({
            pause: !this.state.pause
        })
    },
    render: function () {
        return (
            <div>
                <div id="pause" style={this.props.style} onClick={this.onPauseChange}></div>
                <Score></Score>
                <Info pauseFlag={this.state.pause}></Info>
                <Bomb></Bomb>
            </div>
        )
    }
});

// //暂停后的弹窗
var Info = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
                display: 'block',
                width: '150px',
                height: '150px',
                display: 'none'
            },
            style1: {
                width: '150px',
                borderRadius: '35px',
                height: '30px',
                background: '#ddd',
                border:'3px solid #777',
                marginBottom: '3px',
                color: '#777',
                textAlign: 'center',
                lineHeight: '30px',
                fontWeight: 'bolder',
                fontFamily: 'arial'
            }
        }
    },
    render: function() {
        var style = Object.assign({}, this.props.style);
        if(this.props.pauseFlag) {
            style.display = "block";
        }
        return (
            <div style={style}>
                <div style={this.props.style1}>继续</div>
                <div style={this.props.style1}>重新开始</div>
                <div style={this.props.style1}>提交分数</div>
            </div>
        )
    }
})



// //系统
// //计分板
// var Score = React.createClass({

// })

// //炸弹计数器
// var Bomb = React.createClass({

// })

// //暂停按钮
// var Pause = React.createClass({

// })

// //暂停后的弹窗
// var Info = React.createClass({

// })




// //判断2个物体有没有撞到(用来判断各种碰撞，捡道具，打中飞机等)
// function isCrash(A, B) {

// }

    

var App = React.createClass({
    getInitialState: function () {
        return {
            move: false,
        }
    },
    //飞机的拖拽方法
    drag: function (event) {
        var _selft = this;
        // console.log(_selft);
        var event = event || window.event;
        var plane = document.getElementById("myPlane");
        var disX = event.touches[0].clientX - plane.offsetLeft - 25,
            disY = event.touches[0].clientY - plane.offsetTop;
        
        plane.addEventListener("touchmove", move);
        plane.addEventListener("touchend", clear);


        // //触发点不对，不应该由touchStart来触发
        // function updataBullet() {
        //     _selft.setState({
        //          move: true
        //     })
        //     requestAnimationFrame(updataBullet);
        // }
        // requestAnimationFrame(updataBullet);

        function clear() {
            plane.removeEventListener("touchmove", move);
            plane.removeEventListener("touchend", clear);
        }

        function move(event) {
            plane.style.left = event.touches[0].clientX - disX + "px";
            plane.style.top = event.touches[0].clientY - disY + "px";
            if(plane.offsetLeft >= window.innerWidth - plane.offsetWidth) {
                plane.style.left = window.innerWidth - plane.offsetWidth / 2 + "px";
            }else if(plane.offsetLeft <= 0) {
                plane.style.left = 0 + plane.offsetWidth / 2 + "px";
            }
            
            if(plane.offsetTop >= window.innerHeight - plane.offsetHeight) {
                plane.style.top = window.innerHeight - plane.offsetHeight + "px";
            }else if(plane.offsetTop <= 0) {
                plane.style.top = 0;
            }

            event.preventDefault(); //防止屏幕滑动
        }
    },
    render: function () {
        return (
            <div>
                 <Pause></Pause>
                <MyPlane drag={this.drag}></MyPlane>
            </div>
        )
    }
})

ReactDom.render(
    <App/>,
    document.getElementById("wrapper")
)

var scoreNum = "000000000000";
score.innerHTML = scoreNum;
var bomb2Num = "X00";
bomb2.innerHTML = bomb2Num;
//-------------------------------------------------动态操作----------------------

//公共的计时器,把计算出来的lastTime放到全局中
var startKey = true;
var pauseKey = false;
var startTime;
var lastTime;

function add() {
    if(startKey) {
        startTime = Date.now();
        startKey = false;
    }else{
        var endTime = Date.now();
        lastTime = endTime - startTime;
        // console.log(lastTime);
    }
    if(!pauseKey) {
        requestAnimationFrame(add);
    }
    
}
requestAnimationFrame(add);


//-------------------------------------敌机----------------------
// 移动
function planeMove(ele) {
    var speed = 2;
    function move() {
        //判断有没有中子弹
        if(!(ele.num >= 0)) {
            ele.num = 0;
        }
        var $Bullet = document.getElementsByClassName("bullet"),
            len = $Bullet.length,
            i;
        var myPlane = document.getElementById("myPlane");    
        for(i = 0; i < len; i ++) {
            isCrash(ele, $Bullet[i]);
        }
        isCrash(ele, myPlane);

        //---------------------------移动------------------------------
        ele.style.top = ele.offsetTop + speed + "px";
        if(ele.offsetTop <= window.innerHeight) {
            requestAnimationFrame(move);
        }
        
    }
    
    requestAnimationFrame(move);
}

//添加敌机
var enemy = document.getElementById("enemy");
var planeNumber = 1;
setInterval(function () {
    var planeArry = document.getElementsByClassName("plane");
    if(planeNumber < 5) {
        planeNumber = Math.floor(lastTime / 10000) || 1;
    }
    if(planeArry.length < planeNumber) {
        var kind = Math.ceil(Math.random() * 6);  //1~6
        if(kind <= 2) {
            $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - 40)) +"px"}).appendTo(enemy);
        }else if(kind > 2 && kind <= 4) {
            if(document.getElementsByClassName("middlePlane").length < 2) {
                $("<div>").addClass("middlePlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - 50)) +"px"}).appendTo(enemy);
            }else{
                $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - 40)) +"px"}).appendTo(enemy);
            }
        }else{
            if(document.getElementsByClassName("bigPlane").length < 1) {
                $("<div>").addClass("bigPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - 60)) +"px"}).appendTo(enemy);
            }else{
                 $("<div>").addClass("smallPlane plane").css({left: Math.floor(Math.random() * (window.innerWidth - 40)) +"px"}).appendTo(enemy);
            }
            
        }
        planeMove(planeArry[planeArry.length - 1])
    }

    if(planeArry[0]) {
        if(planeArry[0].offsetTop > window.innerHeight) {
            $(planeArry[0]).remove();
        }
    }
}, 1000)    //1000可以修改，改成合适的


//----------------子弹----------------------------

//使子弹移动
function bulletMove(ele) {
    var speed = 10;
    function move() {
        ele.style.top = ele.offsetTop - speed + "px";
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);
}

//添加子弹
var myPlane = $("#myPlane")[0];
function addBullet() {
    $("<div>")
            .addClass("bullet")
            .css({left: myPlane.offsetLeft + myPlane.offsetWidth / 2 - 5, top: myPlane.offsetTop})
            .appendTo($("#bulletBox"))
    var bulletArry = document.getElementsByClassName("bullet");
    bulletMove(bulletArry[bulletArry.length - 1]);     
    var i,
        len = bulletArry.length;
    for(i = 0; i < len; i++) {
        if(bulletArry[i]) {
            if(bulletArry[i].offsetTop < 0) {
                bulletArry[i].remove();
            }
        }
    }
}

var bulletTimer = setInterval(addBullet, 200);

//------------------------------------------道具-------------------------

// setInterval(function () {
//     console.log(lastTime);
// }, 200) 

function itemMove(ele) {
    var speed = 4;
    function move() {
        ele.style.top = ele.offsetTop + speed + "px";
        if(ele.offsetTop <= window.innerHeight) {
            isCrash(ele, myPlane);
            requestAnimationFrame(move);
        }
    }
    requestAnimationFrame(move);
}

function addItem() {
    var item  = document.getElementsByClassName("item");
    if(item) {
        if(item.length < 1) {
            var div = $("<div>");
            div
                .addClass("item")
                .css({left: Math.floor(Math.random() * (window.innerWidth - 30)) +"px"})
                .appendTo($("#itemBox"))

            //随机出现2种不同的道具    
            if(Math.random() * 10 > 5) {
                div.addClass("buffBullet");
            }else{
                div.addClass("boom")
            }        
            
            itemMove(item[item.length - 1]); 
        }
    }
    

    if(item[0].offsetTop > window.innerHeight) {
        $(item[0]).remove();
    }
       
}
setInterval(addItem, 1000)




//吃道具之后触发一个函数。
//1.使子弹变成2个
var doubleBulletTimer;
function doubleBullet() {
    //左边子弹
    $("<div>")
            .addClass("bullet doubleBullet")
            .css({left: myPlane.offsetLeft + myPlane.offsetWidth / 2 - 20, top: myPlane.offsetTop})
            .appendTo($("#bulletBox"))
    //右边子弹        
    $("<div>")
            .addClass("bullet doubleBullet")
            .css({left: myPlane.offsetLeft + myPlane.offsetWidth / 2 + 10, top: myPlane.offsetTop})
            .appendTo($("#bulletBox"))        
    var bulletArry = document.getElementsByClassName("bullet");
    bulletMove(bulletArry[bulletArry.length - 2]); 
    bulletMove(bulletArry[bulletArry.length - 1]);     
    var i,
        len = bulletArry.length;
    for(i = 0; i < len; i++) {
        if(bulletArry[i]) {
            if(bulletArry[i].offsetTop < 0) {
                bulletArry[i].remove();
            }
        }
    }
    
}
function eatBuffBullet() {
    clearInterval(bulletTimer);
    doubleBulletTimer = setInterval(doubleBullet, 200);
    setTimeout(function ()  {
        clearInterval(doubleBulletTimer);
        bulletTimer = setInterval(addBullet, 200);
    }, 2000) 
}


//假如吃到了道具就触发eatBuffBullet函数；
// eatBuffBullet();

// $("<div>").appendTo($("#test"))
// $("<div>").appendTo($("#test"))


//2.增加炸弹数量
function addBoom() {
    var arr1 = bomb2Num.split("");
    arr1[2] = parseInt(arr1[2]) + 1;
        if (parseInt(arr1[2]) == 10) {
            arr1[1] = parseInt(arr1[1]) + 1;
            arr1[2] = 0;
        }
    bomb2Num = arr1.join('');
    bomb2.innerHTML = bomb2Num;
}


//用来触发炸弹
bomb1.onclick = function () {
    //如果炸弹数＞1，就触发
    var arr2 = bomb2Num.split("")
    if (parseInt(arr2[2]) > 0 || parseInt(arr2[1]) > 0) {
        $(".plane").remove();
        if (parseInt(arr2[2]) == 0) {
            arr2[1] = parseInt(arr2[1]) - 1;
            arr2[2] = 9;
        }
        arr2[2] = parseInt(arr2[2]) - 1;

        bomb2Num = arr2.join('');
        bomb2.innerHTML = bomb2Num;
    }
}


// //判断2个物体有没有撞到(用来判断各种碰撞，捡道具，打中飞机等)
function isCrash(oDiv, oDiv2) {
    if(oDiv && oDiv2) {
        var t1 = oDiv.offsetTop;  
        var l1 = oDiv.offsetLeft;  
        var r1 = oDiv.offsetLeft + oDiv.offsetWidth;  
        var b1 = oDiv.offsetTop + oDiv.offsetHeight;  

        var t2 = oDiv2.offsetTop;  
        var l2 = oDiv2.offsetLeft;  
        var r2 = oDiv2.offsetLeft + oDiv2.offsetWidth;  
        var b2 = oDiv2.offsetTop + oDiv2.offsetHeight;  
        if(b1<t2 || l1>r2 || t1>b2 || r1<l2){// 表示没碰上  

        }else{  
            var arr = scoreNum.split("");
            arr[9] = parseInt(arr[9]) + 1;
            for (var i = 9; i > 0; i --) {
                if (parseInt(arr[i]) == 10) {
                    arr[i - 1] = parseInt(arr[i - 1]) + 1;
                    arr[i] = 0;
                }
            }
            scoreNum = arr.join('');
            score.innerHTML = scoreNum;
            oDiv.num ++;
            switch(oDiv.className) {
                case "smallPlane plane": 
                    if(oDiv.num > 1) {
                        $(oDiv).remove();
                    }
                    break;
                case "middlePlane plane": 
                    if(oDiv.num > 6) {
                        $(oDiv).remove();
                    }
                    break;
                case "bigPlane plane": 
                    if(oDiv.num > 10) {
                        $(oDiv).remove();
                    }
                    break;  
                case "item": 
                    console.log(1);
                break;                      
            }
            if(oDiv2.className == "bullet" || oDiv2.className == "bullet doubleBullet") {
                $(oDiv2).remove();
            }else if($(oDiv).hasClass("plane")  && oDiv2.className == "myPlane") {
                window.location.reload();
                alert("game over");
            }else if($(oDiv).hasClass("item") && oDiv2.className == "myPlane") {
                // console.log(1);
                if($(oDiv).hasClass("buffBullet")) {
                    eatBuffBullet();
                }else {
                    addBoom();
                }
                $(oDiv).remove();
            }
        } 
    }
}