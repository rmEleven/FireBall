class FireBall extends GameObject {
    constructor(playground, player, x, y, radius, color, speed, move_length, vx, vy, damage) {
        // console.log("FireBall Created");  // 火球创建的提示信息

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

        this.damage = damage;  // 伤害值

        this.eps = 0.1;        // 小于误差视作0
    }

    start() {
        ;
    }

    get_dist(x1, y1, x2, y2) {  // 计算两点间距离
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    is_collision(player) {  // 判断火球是否碰到玩家
        let distance = this.get_dist(this.x, this.y, player.x, player.y);  // 计算圆心距离
        if (distance < this.radius + player.radius) {  // 火球碰到玩家
            return true;
        } else {  // 火球未碰到玩家
            return false;
        }
    }

    attack(player) {  // 火球攻击到玩家
        let angle = Math.atan2(player.y - this.y, player.x - this.x);  // 冲击移动角度
        player.is_attacked(angle, this.damage);  // 玩家被攻击到
        this.destroy();  // 销毁火球对象
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

        for (let i = 0; i < this.playground.players.length; i++) {
            let player = this.playground.players[i];  // 枚举所有玩家
            if (player !== this.player && this.is_collision(player)) {  // 枚举的玩家不是自己 且 火球碰到该玩家
                this.attack(player);  // 攻击该玩家
            }
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