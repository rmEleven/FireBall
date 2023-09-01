class FireBall extends GameObject {
    constructor(playground, player, x, y, radius, color, speed, move_length, vx, vy) {
        console.log("FireBall Created");  // 火球创建的提示信息

        super();  // 调用父类构造函数，加入全局游戏对象数组
        this.playground = playground;  // 记录GamePlayground对象
        this.player = player;          // 记录Player对象
        this.ctx = this.playground.gameMap.ctx;  // 取出画布操作的内容

        this.x = x;  // x坐标
        this.y = y;  // y坐标

        this.radius = radius;  // 球的半径
        this.color = color;    // 球的颜色

        this.speed = speed;              // 移动速度
        this.move_length = move_length;  // 移动距离
        this.vx = vx;          // x轴速度方向
        this.vy = vy;          // y轴速度方向

        this.eps = 0.1;        // 小于误差视作0
    }

    start() {
        ;
    }

    update() {
        if (this.move_length < this.eps) {  // 移动到目标位置
            this.destroy();  // 销毁对象
        } else {  // 未移动到目标位置
            let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);  // 当前帧移动的距离
            this.x += this.vx * moved;  // 移动
            this.y += this.vy * moved;  // 移动
            this.move_length -= moved;  // 更新需要移动的距离
        }

        this.render();  // 每一帧都渲染火球
    }

    render() {  // 渲染火球
        this.ctx.fillStyle = this.color;  // 设置颜色

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);  // 渲染圆形
        this.ctx.fill();  // 填充颜色
    }
}