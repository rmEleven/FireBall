class GameMenu {
    constructor(root) {
        console.log("GameMenu Created");  // 游戏菜单创建的提示信息

        this.root = root;  // 记录Game对象
        // 创建menu前端
        this.$menu = $(`
            <div class="game-menu">
                <div class="game-menu-field">
                    <div class="game-menu-field-item game-menu-field-item-single-mode">
                        单人模式
                    </div>
                    <div class="game-menu-field-item game-menu-field-item-multi-mode">
                        多人模式
                    </div>
                    <div class="game-menu-field-item game-menu-field-item-settings">
                        设置
                    </div>
                </div>
            </div>
        `);
        this.root.$game.append(this.$menu);  // 把menu前端添加到game前端

        this.$single_mode = this.$menu.find('.game-menu-field-item-single-mode');  // 找到single-mode按钮
        this.$multi_mode = this.$menu.find('.game-menu-field-item-multi-mode');    // 找到multi-mode按钮
        this.$settings = this.$menu.find('.game-menu-field-item-settings');        // 找到settings按钮

        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$single_mode.click(function () {
            console.log("single-mode clicked");
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mode.click(function () {
            console.log("multi-mode clicked");
        });
        this.$settings.click(function () {
            console.log("settings clicked");
        });
    }

    show() {
        // 显示menu页面
        this.$menu.show();
    }

    hide() {
        // 隐藏menu页面
        this.$menu.hide();
    }
}class GamePlayground {
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
}class Game {
    constructor(id) {
        console.log("Game Created");  // 游戏创建的提示信息

        this.id = id;              // 传入的前端div的id
        this.$game = $('#' + id);  // 找到id对应的前端div

        this.menu = new GameMenu(this);  // 创建menu对象
        this.playground = new GamePlayground(this)  // 创建playground对象

        this.start();
    }

    start() {
        ;
    }
}