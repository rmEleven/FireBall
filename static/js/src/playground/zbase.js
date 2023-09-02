class GamePlayground {
    constructor(root) {
        console.log("GamePlayground Created");  // 游戏界面创建的提示信息

        this.root = root;  // 记录Game对象
        // 创建playground前端
        this.$playground = $(`
            <div class="game-playground">
            </div>
        `);
        this.hide();  // 隐藏playground页面

        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        ;
    }

    show() {
        this.$playground.show();  // 显示playground页面

        this.root.$game.append(this.$playground);  // 把playground前端添加到game前端

        // 记录游戏界面长和宽
        this.width = this.$playground.width();
        this.height = this.$playground.height();

        this.gameMap = new GameMap(this);  // 创建游戏地图

        // 记录玩家
        this.players = [];
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "rgb(83,131,236)", this.height * 0.15, true));

        let robot_num = 5;  // 机器人数量
        let robot_color = ["lightcoral", "lightgray", "lightgreen", "lightsalmon", "lightyellow"];  // 机器人颜色
        for (let i = 0; i < robot_num; i++) {
            let x = Math.random() * this.width;   // 随机目标位置
            let y = Math.random() * this.height;  // 随机目标位置
            let color_index = Math.floor(Math.random() * robot_color.length);  // 随机颜色下标
            this.players.push(new Player(this, x, y, this.height * 0.05, robot_color[color_index], this.height * 0.15, false));  // 创建机器人
        }
    }

    hide() {
        // 隐藏playground页面
        this.$playground.hide();
    }
}