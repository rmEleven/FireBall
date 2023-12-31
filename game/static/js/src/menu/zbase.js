class GameMenu {
    constructor(root) {
        console.log("GameMenu Created");  // 游戏菜单创建的提示信息

        this.root = root;  // 记录Game对象
        // 创建menu前端
        this.$menu = $(`
            <div class="game-menu">
                <div class="game-menu-field">
                    <br>
                    <div class="game-menu-field-item game-menu-field-item-single-mode">
                        单人模式
                    </div>
                    <div class="game-menu-field-item game-menu-field-item-multi-mode">
                        多人模式
                    </div>
                    <div class="game-menu-field-item game-menu-field-item-settings">
                        退出
                    </div>
                    <div class="game-menu-field-text">
                        鼠标右键移动
                    </div>
                    <div class="game-menu-field-text">
                        Q键选中技能
                    </div>
                    <div class="game-menu-field-text">
                        鼠标左键释放技能
                    </div>
                </div>
            </div>
        `);
        this.hide();  // 默认关闭菜单界面
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
            outer.hide();                  // 隐藏菜单界面
            outer.root.playground.show();  // 显示游戏界面
        });
        this.$multi_mode.click(function () {
            console.log("multi-mode clicked");
        });
        this.$settings.click(function () {
            console.log("settings clicked");
            outer.root.settings.logout_on_remote();
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
}