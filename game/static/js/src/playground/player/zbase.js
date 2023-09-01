class Player extends GameObject {
    constructor(playground, x, y, radius, color, speed, is_me) {
        console.log("Player Created");  // 游戏玩家创建的提示信息

        super();  // 调用父类构造函数，加入全局游戏对象数组
        this.playground = playground;  // 记录GamePlayground对象
        this.ctx = this.playground.gameMap.ctx;  // 取出画布操作的内容

        this.x = x;  // x坐标
        this.y = y;  // y坐标

        this.radius = radius;   // 球的半径
        this.color = color;     // 球的颜色

        this.speed = speed;     // 移动速度
        this.move_length = 0;   // 移动距离
        this.vx = 0;            // x轴速度方向
        this.vy = 0;            // y轴速度方向

        this.cur_skill = null;  // 选择的技能

        this.is_me = is_me;     // 是否是玩家本人
        this.eps = 0.1;         // 小于误差视作0
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
            } else if (e.which === 1) {  // 点击鼠标左键
                if (outer.cur_skill === "fireball") {  // 当前技能是火球
                    outer.shoot_fireball(e.clientX, e.clientY);  // 发射火球
                }

                outer.cur_skill = null;  // 清空技能选择
            }
        });

        $(window).keydown(function (e) {
            if (e.which === 81) {  // q
                outer.cur_skill = "fireball";
                return false;
            }
        });
    }

    get_dist(x1, y1, x2, y2) {  // 计算两点间距离
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    move_to(tx, ty) {
        this.move_length = this.get_dist(this.x, this.y, tx, ty);  // 计算移动距离
        let angle = Math.atan2(ty - this.y, tx - this.x);  // 计算移动角度
        this.vx = Math.cos(angle);  // 计算x轴移动方向
        this.vy = Math.sin(angle);  // 计算y轴移动方向
    }

    shoot_fireball(tx, ty) {
        let x = this.x;
        let y = this.y;

        let radius = this.playground.height * 0.01;
        let color = "orange";

        let speed = this.playground.height * 0.5;
        let move_length = this.playground.height * 1.0;

        let angle = Math.atan2(ty - y, tx - x);
        let vx = Math.cos(angle);
        let vy = Math.sin(angle);

        new FireBall(this.playground, this, x, y, radius, color, speed, move_length, vx, vy);
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