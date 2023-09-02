class GameMap extends GameObject {  // 继承GameObject类
    constructor(playground) {
        console.log("GameMap Created");  // 游戏地图创建的提示信息

        super();  // 调用父类构造函数，加入全局游戏对象数组
        this.playground = playground;  // 记录GamePlayground对象

        this.$canvas = $(`<canvas>画布</canvas>`);         // 创建地图前端画布
        this.ctx = this.$canvas[0].getContext('2d');       // 取出画布操作的内容
        this.ctx.canvas.width = this.playground.width;     // 设置宽度
        this.ctx.canvas.height = this.playground.height;   // 设置高度
        this.playground.$playground.append(this.$canvas);  // 把canvas前端添加到playground前端

        this.start();
    }

    start() {
        ;
    }

    update() {
        this.render();  // 每一帧都渲染地图
    }

    render() {  // 渲染地图
        this.ctx.fillStyle = "rgba(0,0,0,0.2)";  // 设置颜色
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);  // 渲染矩形
    }
}