class Player extends GameObject {
    constructor(playground, x, y, radius, color, speed, is_me) {
        // console.log("Player Created");  // 游戏玩家创建的提示信息

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

        this.d_speed = 0;        // 冲击移动速度
        this.d_vx = 0;           // 冲击x轴速度方向
        this.d_vy = 0;           // 冲击y轴速度方向

        this.friction = 0.9;     // 摩擦力

        this.cur_skill = null;  // 选择的技能

        this.is_me = is_me;     // 是否是玩家本人
        this.eps = 0.1;         // 小于误差视作0
    }

    start() {
        if (this.is_me) {  // 是玩家本人
            this.add_listening_events();  // 添加鼠标监听事件
        } else {  // 是机器人
            let tx = Math.random() * this.playground.width;   // 随机目标位置
            let ty = Math.random() * this.playground.height;  // 随机目标位置
            this.move_to(tx, ty);
        }
    }

    add_listening_events() {
        let outer = this;

        this.playground.gameMap.$canvas.on("contextmenu", function () {
            return false;  // 取消鼠标右键菜单
        });

        this.playground.gameMap.$canvas.mousedown(function (e) {
            const rect = outer.ctx.canvas.getBoundingClientRect();  // 坐标系映射
            if (e.which === 3) {  // 点击鼠标右键
                outer.move_to(e.clientX - rect.left, e.clientY - rect.top);  // 移动到点击的位置
            } else if (e.which === 1) {  // 点击鼠标左键
                if (outer.cur_skill === "fireball") {  // 当前技能是火球
                    outer.shoot_fireball(e.clientX - rect.left, e.clientY - rect.top);  // 发射火球
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

    remove_listening_events() {
        this.playground.gameMap.$canvas.off("mousedown"); // 取消mousedown事件监听
        $(window).off("keydown"); // 取消keydown事件监听
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

    shoot_fireball(tx, ty) {  // 发射火球
        let x = this.x;
        let y = this.y;

        let radius = this.playground.height * 0.01;
        let color = "orange";

        let speed = this.playground.height * 0.5;
        let move_length = this.playground.height * 1.0;

        let angle = Math.atan2(ty - y, tx - x);
        let vx = Math.cos(angle);
        let vy = Math.sin(angle);

        let damage = this.playground.height * 0.01

        new FireBall(this.playground, this, x, y, radius, color, speed, move_length, vx, vy, damage);  // 创建火球对象
    }

    is_attacked(angle, damage) {  // 玩家被攻击到
        let particle_num = 10 + Math.floor(Math.random() * 10);  // 随机粒子数量
        for (let i = 0; i < particle_num; i++) {
            let x = this.x;
            let y = this.y;

            let radius = this.radius * Math.random() * 0.2;
            let color = this.color;

            let speed = this.speed * 5;
            let angle = 2 * Math.PI * Math.random();
            let vx = Math.cos(angle);
            let vy = Math.sin(angle);
            let move_length = this.radius * 5;

            new Particle(this.playground, x, y, radius, color, speed, vx, vy, move_length);  // 创建粒子
        }

        this.radius -= damage;  // 玩家受到伤害

        if (this.radius < this.eps) {  // 玩家被击杀
            if (this.is_me) {  // 玩家本人被击杀
                this.remove_listening_events();  // 取消监听事件
            }
            this.destroy();  // 销毁玩家对象
            return false;
        } else {  // 玩家被击杀 受到冲击移动
            this.d_speed = damage * 60;   // 冲击移动速度
            this.d_vx = Math.cos(angle);  // 冲击x轴速度方向
            this.d_vy = Math.sin(angle);  // 冲击y轴速度方向

            this.speed *= 1.4;  // 速度提升
        }
    }

    update() {
        if (this.d_speed > 10) {  // 受到火球冲击
            this.vx = this.vy = this.move_length = 0;  // 清空原先的移动
            let moved = this.d_speed * this.timedelta / 1000;
            this.x += this.d_vx * moved;  // 移动
            this.y += this.d_vy * moved;  // 移动
            this.d_speed *= this.friction;  // 移速减小
        }

        if (!this.is_me && Math.random() < 1 / 200) {  // 机器人发射火球
            let target = this;  // 设置随机目标
            while (target === this) {  // 随机目标是自己就继续寻找
                let target_index = Math.floor(Math.random() * this.playground.players.length);  // 随机目标下标
                target = this.playground.players[target_index];  // 更新随机目标
            }
            let tx = target.x + target.speed * target.vx * this.timedelta / 1000 * 0.3;
            let ty = target.y + target.speed * target.vy * this.timedelta / 1000 * 0.3;
            this.shoot_fireball(tx, ty);  // 发射火球
        }

        if (this.move_length < this.eps) {  // 移动到目标位置
            this.move_length = 0;
            this.vx = 0;
            this.vy = 0;
            if (!this.is_me) {  // 是机器人
                let tx = Math.random() * this.playground.width;   // 随机目标位置
                let ty = Math.random() * this.playground.height;  // 随机目标位置
                this.move_to(tx, ty);  // 移动到随机位置
            }
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

    on_deatroy() {  // 玩家被击杀后 从玩家数组中删除
        for (let i = 0; i < this.playground.players.length; i++) {
            if (this.playground.players[i] === this) {
                this.playground.players.splice(i, 1);  // 从下标为i的元素开始删除1个
                break;
            }
        }
    }
}