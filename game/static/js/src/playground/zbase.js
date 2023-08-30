class GamePlayground {
    constructor(root) {
        console.log("GamePlayground Created");  // 游戏界面创建的提示信息

        this.root = root;  // 记录Game对象
        // 创建playground前端
        this.$playground = $(`
            <div class="game-playground">
                游戏界面
            </div>
        `);
        this.hide();  // 隐藏playground页面
        this.root.$game.append(this.$playground);  // 把pla$playground前端添加到game前端

        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        ;
    }

    show() {
        // 显示playground页面
        this.$playground.show();
    }

    hide() {
        // 隐藏playground页面
        this.$playground.hide();
    }
}