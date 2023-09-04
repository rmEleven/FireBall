class Settings {
    constructor(root) {
        console.log("Settings Created");  // 游戏设置创建的提示信息

        this.root = root;  // 记录Game对象
        this.platform = 'WEB';  // 平台为web
        if (this.root.AcwingOS) {
            this.platform = "ACAPP";  // 平台为acapp
        }
        this.username = '';  // 用户名
        this.photo = '';  // 头像

        // 创建settings前端
        this.$settings = $(`
            <div class="game-settings">

                <div class="game-settings-login">
                    <br>

                    <div class="game-settings-field">
                        <div class="game-settings-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                            <input type="text" class="game-settings-input" placeholder="学工号" id="username" />
                        </div>
                    </div>

                    <div class="game-settings-field">
                        <div class="game-settings-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                                <path
                                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                            </svg>
                            <input type="password" class="game-settings-input" placeholder="密码" id="password" />
                        </div>
                    </div>

                    <button type="submit" class="btn btn-success">登录</button>

                    <p class="text">注册账号</p>
                </div>

                <div class="game-settings-register">
                </div>

            </div>
        `);
        this.$login = this.$settings.find(".game-settings-login");        // 找出login部分
        this.$login.hide();
        this.$register = this.$settings.find(".game-settings-register");  // 找出register部分
        this.$register.hide();
        this.root.$game.append(this.$settings);                           // 把settings前端添加到game前端

        this.start();
    }

    start() {
        this.getinfo();  // 从服务器端获取信息
    }

    login() {  // 打开登录界面
        this.$register.hide();  // 隐藏注册部分
        this.$login.show();     // 显示登录部分
    }

    register() {  // 打开注册界面
        this.$login.hide();     // 隐藏登录部分
        this.$register.show();  // 显示注册部分
    }

    getinfo() {  // 从服务器端获取信息
        let outer = this;
        $.ajax({
            url: 'https://app5952.acapp.acwing.com.cn/settings/getinfo/',
            type: 'GET',
            data: {
                // data: views/settings/getinfo getinfo(request)函数 输入的数据
                platform: outer.platform,
            },
            success: function (resp) {
                // resp: views/settings/getinfo getinfo(request)函数 返回的数据
                console.log(resp);
                if (resp.result === 'success') {     // 服务器返回成功
                    outer.username = resp.username;  // 记录返回的用户名
                    outer.photo = resp.photo;        // 记录返回的头像
                    outer.hide();                    // 隐藏当前界面
                    outer.root.menu.show();          // 显示菜单界面
                } else {  // 服务器返回失败：未登录
                    outer.login();  // 调用登录函数
                }
            }
        });
    }

    show() {
        // 显示settings页面
        this.$settings.show();
    }

    hide() {
        // 隐藏settings页面
        this.$settings.hide();
    }
}