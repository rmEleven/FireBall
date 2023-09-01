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
        this.move_length = 0;  // 移动距离
        this.vx = 0;           // x轴速度方向
        this.vy = 0;           // y轴速度方向

        this.is_me = is_me;    // 是否是玩家本人
        this.eps = 0.1;        // 小于误差视作0
    }

    start() {
        if (this.is_me) {  // 是玩家本人
            this.add_listening_events();  // 添加鼠标监听事件
        }
    }

    add_listening_events() {
        let outer = this;

        this.playground.gameMap.$canvas.on("contextmenu", function () {
            return false;  // 取消鼠标右键菜单
        });

        this.playground.gameMap.$canvas.mousedown(function (e) {
            if (e.which === 3) {  // 点击鼠标右键
                outer.move_to(e.clientX, e.clientY);  // 移动到点击的位置
            }
        });
    }

    get_dist(x1, y1, x2, y2) {  // 计算两点间距离
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    move_to(tx, ty) {
        console.log("move to", tx, ty);
        this.move_length = this.get_dist(this.x, this.y, tx, ty);  // 计算移动距离
        let angle = Math.atan2(ty - this.y, tx - this.x);  // 计算移动角度
        this.vx = Math.cos(angle);  // 计算x轴移动方向
        this.vy = Math.sin(angle);  // 计算y轴移动方向
    }

    update() {
        if (this.move_length < this.eps) {  // 移动到目标位置
            this.move_length = 0;
            this.vx = 0;
            this.vy = 0;
        } else {  // 未移动到目标位置
            let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);  // 当前帧移动的距离
            this.x += this.vx * moved;  // 移动
            this.y += this.vy * moved;  // 移动
            this.move_length -= moved;  // 更新需要移动的距离
        }

        this.render();  // 每一帧都渲染玩家
    }

    render() {  // 渲染玩家
        this.ctx.fillStyle = this.color;  // 设置颜色

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);  // 渲染圆形
        this.ctx.fill();  // 填充颜色
    }
}