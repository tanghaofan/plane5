const React = require("react");
const ReactDom = require("react-dom");
require("../less/index.less");

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
// 自己的飞机
var MyPlane = React.createClass({
    getDefaultProps: function () {
        return {
            style: {
                height: "80px",
                width: "50px",
                backgroundColor: "green",
                position: "absolute",
                bottom: "0px",
                left: "50%",
                marginLeft: "-25px"
            }
        }
    },
    render: function () {
        return (
            <div ref="myPlane" style={this.props.style} id="myPlane" onTouchStart={this.props.drag}></div>
        )
    }
})



// //敌机,添加相应的class
// var SmallPlane = React.createClass({

// })

// var MiddlePlane = React.createClass({
    
// })

// var BigPlane = React.createClass({
    
// })

// //添加敌机，将这些模块放进去
// setInterval(function () {

// }, 1000)    //1000可以修改，改成合适的

// //添加完后，调用planeMove使飞机运动
// function planeMove() {

// }





// //子弹,要能根据n改变子弹数，color改变颜色，speed改变速度，子弹都有一个class， "bullet"
// var Bullet = React.createClass({

// })
// //将子弹添加到飞机头部,添加完后调用bulletMove使子弹运动
// requestAnimationFrame(function () {

// })
// //使子弹移动
// function bulletMove(ele) {

// }

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





// //系统
// //计分板
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
                backgroundColor: "#999",
                fontSize: "30px",
                textAlign: "center",
                letterSpacing: '4px'
            }
        }
    },   
    render: function () {
        return (
            <div id="score" style={this.props.style}>000000000000</div>
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
                backgroundColor: "#999",
                fontSize: "30px",
                textAlign:'center',
                letterSpacing: '12px'
            }
        }
    },   
    render: function () {
        return (
            <div>
                <div id="bomb1" style={this.props.style} ></div>
                <div id="bomb2" style={this.props.style1}>X00</div>
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
                <Info pauseFlag={this.state.pause} timerFirst={timer1}></Info>
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


// ReactDom.render(
//     <Pause/>,
//     document.getElementById("wrapper")
// )


// //公共的计时器,把计算出来的lastTime放到全局中
// var lastTime;
// requestAnimationFrame(function () {

// })


// //判断2个物体有没有撞到(用来判断各种碰撞，捡道具，打中飞机等)
function isCrash(A, B) {
    if (
        ( ( B.offsetTop - A.offsetTop > 0 && B.offsetTop - A.offsetTop < A.offsetHeight )
        && ( B.offsetLeft - A.offsetLeft > 0 && B.offsetLeft - A.offsetLeft < B.offsetWidth) 
        || ( B.offsetLeft - A.offsetLeft < 0 && A.offsetLeft - A.offsetLeft < A.offsetWidth)  
        ) 
        || ( ( A.offsetTop - B.offsetTop > 0 && A.offsetTop - B.offsetTop < B.offsetHeight )
        && ( B.offsetLeft - A.offsetLeft > 0 && B.offsetLeft - A.offsetLeft < B.offsetWidth) 
        || ( B.offsetLeft - A.offsetLeft < 0 && A.offsetLeft - B.offsetLeft < A.offsetWidth)  
        )
        )  {
            
                var num = 1;
                console.log(num);
                num ++;
            
        } else {
            return 0;
        }
    
}

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


        //触发点不对，不应该由touchStart来触发
        function updataBullet() {
            _selft.setState({
                 move: true
            })
            requestAnimationFrame(updataBullet);
        }
        requestAnimationFrame(updataBullet);

        function clear() {
            plane.removeEventListener("touchmove", move);
            plane.removeEventListener("touchend", clear);
        }

        function move(event) {
            plane.style.left = event.touches[0].clientX - disX + "px";
            plane.style.top = event.touches[0].clientY - disY + "px";
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


//-------------------------------------------------动态操作----------------------


//-------------------------------------敌机----------------------
// 移动
function planeMove(ele) {
    var speed = 2;
    function move() {
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
        planeNumber = Math.floor(lastTime / 1000);
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
        var planeNum = planeArry.length;
        planeMove(planeArry[planeNum - 1]);

       if(planeArry[0].offsetTop > 480) {
            $(planeArry[0]).remove();
       } 
    }
}, 1000)    //1000可以修改，改成合适的


//----------------子弹----------------------------

//使子弹移动
function bulletMove(ele) {
    var speed = 18;
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
            .css({left: myPlane.offsetLeft + myPlane.offsetWidth / 2 - 5, top: myPlane.offsetTop - 20})
            .appendTo($("#bulletBox"))
    var bulletArry = document.getElementsByClassName("bullet");
    var i,
        len = bulletArry.length;
    bulletMove(bulletArry[bulletArry.length - 1]);     
    for(i = 0; i < len; i++) {
        if(bulletArry[i]) {
            if(bulletArry[i].offsetTop < 0) {
                bulletArry[i].remove();
            }
        }
    }
}

var timer1 = setInterval(addBullet, 100)


// setInterval(function () {
//     var bulletArray = document.getElementsByClassName("bullet");
//     var planeArray = document.getElementsByClassName("plane"); 
//     var len1 = bulletArray.length;
//     var len2 = planeArray.length;
//     for (var i = 0; i < len1; i ++) {
//         for (var j = 0; j < len2; j ++) {
//             if(isCrash(bulletArray[i], planeArray[j])) {
//                 planeArray[j].style.diaplay = 'none';
//             }
//         }
//     }
// }, 100);
  








