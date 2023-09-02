class Particle extends GameObject {
    constructor(playground, x, y, radius, color, speed, vx, vy, move_length) {
        super();  // 调用父类构造函数，加入全局游戏对象数组
        this.playground = playground;  // 记录GamePlayground对象
        this.ctx = this.playground.gameMap.ctx;  // 取出画布操作的内容

        this.x = x;  // x坐标
        this.y = y;  // y坐标

        this.radius = radius;  // 粒子的半径
        this.color = color;    // 粒子的颜色

        this.speed = speed;    // 移动速度
        this.vx = vx;          // x轴速度方向
        this.vy = vy;          // y轴速度方向
        this.move_length = move_length;  // 移动距离

        this.friction = 0.9;   // 摩擦力

        this.eps = 10;
    }

    start() {
        ;
    }

    update() {
        if (this.speed < this.eps || this.move_length < this.eps) {  // 粒子速度很小或移动距离很小
            this.destroy();  // 销毁粒子对象
            return false;
        } else {
            let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
            this.x += this.vx * moved;    // 移动
            this.y += this.vy * moved;    // 移动
            this.speed *= this.friction;  // 更新移动速度
            this.move_length -= moved;    // 更新移动距离
        }

        this.render();
    }

    render() {  // 渲染粒子
        this.ctx.fillStyle = this.color;  // 设置颜色

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);  // 渲染圆形
        this.ctx.fill();  // 填充颜色
    }
}