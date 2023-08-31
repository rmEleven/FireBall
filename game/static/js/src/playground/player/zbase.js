class Player extends GameObject {
    constructor(playground, x, y, radius, color, speed, is_me) {
        console.log("Player Created");  // 游戏玩家创建的提示信息

        super();  // 调用父类构造函数，加入全局游戏对象数组
        this.playground = playground;  // 记录GamePlayground对象
        this.ctx = this.playground.gameMap.ctx;  // 取出画布操作的内容

        this.x = x;  // x坐标
        this.y = y;  // y坐标
        this.radius = radius;  // 球的半径
        this.color = color;    // 球的颜色
        this.speed = speed;    // 移动速度
        this.is_me = is_me;    // 是否是玩家本人
        this.eps = 0.1;        // 小于误差视作0
    }

    start() {
        ;
    }

    update() {
        this.render();  // 每一帧都渲染玩家
    }

    render() {  // 渲染玩家
        this.ctx.fillStyle = this.color;  // 设置颜色

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);  // 渲染圆形
        this.ctx.fill();  // 填充颜色
    }
}