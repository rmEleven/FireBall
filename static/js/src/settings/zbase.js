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
                        <div class="game-settings-item game-settings-item-username">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                            <input type="text" class="game-settings-input" placeholder="用户名" id="username" />
                        </div>
                    </div>

                    <div class="game-settings-field">
                        <div class="game-settings-item game-settings-item-password">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                                <path
                                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                            </svg>
                            <input type="password" class="game-settings-input" placeholder="密码" id="password" />
                        </div>
                    </div>

                    <div class="game-settings-error-message"></div>
                    <button type="submit" class="game-settings-submit">登录</button>

                    <div class="game-setting-qq-field">
                        <img class="game-setting-qq-img" width="30" src="https://app5952.acapp.acwing.com.cn/static/image/settings/qq.png">
                        <p class="game-setting-qq-text">一键登录</p>
                    </div>

                    <p class="game-settings-text">注册账号</p>
                </div>

                <div class="game-settings-register">
                    <br>

                    <div class="game-settings-field">
                        <div class="game-settings-item game-settings-item-username">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                            <input type="text" class="game-settings-input" placeholder="用户名" id="username" />
                        </div>
                    </div>

                    <div class="game-settings-field">
                        <div class="game-settings-item game-settings-item-password">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                                <path
                                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                            </svg>
                            <input type="password" class="game-settings-input" placeholder="密码" id="password" />
                        </div>
                    </div>

                    <div class="game-settings-field">
                        <div class="game-settings-item game-settings-item-repassword">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                                <path
                                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                            </svg>
                            <input type="password" class="game-settings-input" placeholder="确认密码" id="repassword" />
                        </div>
                    </div>

                    <div class="game-settings-error-message"></div>
                    <button type="submit" class="game-settings-submit">注册</button>

                    <div class="game-setting-qq-field">
                        <img class="game-setting-qq-img" width="30" src="https://app5952.acapp.acwing.com.cn/static/image/settings/qq.png">
                        <p class="game-setting-qq-text">一键登录</p>
                    </div>

                    <p class="game-settings-text">登录账号</p>
                </div>

            </div>
        `);
        this.$login = this.$settings.find(".game-settings-login");        // 找出login部分
        this.$login_username = this.$login.find(".game-settings-item-username>input");
        this.$login_password = this.$login.find(".game-settings-item-password>input");
        this.$login_error_messgae = this.$login.find(".game-settings-error-message");
        this.$login_submit = this.$login.find(".game-settings-submit");
        this.$login_to_register = this.$login.find(".game-settings-text");
        this.$login.hide();

        this.$register = this.$settings.find(".game-settings-register");  // 找出register部分
        this.$register_username = this.$register.find(".game-settings-item-username>input");
        this.$register_password = this.$register.find(".game-settings-item-password>input");
        this.$register_repassword = this.$register.find(".game-settings-item-repassword>input");
        this.$register_error_messgae = this.$register.find(".game-settings-error-message");
        this.$register_submit = this.$register.find(".game-settings-submit");
        this.$register_to_login = this.$register.find(".game-settings-text");
        this.$register.hide();

        this.$qq_login = this.$settings.find(".game-setting-qq-img");  // 找出qq一键登录的图片

        this.root.$game.append(this.$settings);                           // 把settings前端添加到game前端

        this.start();
    }

    start() {
        this.getinfo();  // 从服务器端获取信息
        this.add_listening_events();  // 添加事件监听函数
    }

    add_listening_events() {
        this.add_listening_events_login();  // 添加登录界面的事件监听函数
        this.add_listening_events_register();  // 添加注册界面的事件监听函数

        // 添加qq一键登录的事件监听函数
        let outer = this;
        this.$qq_login.click(function () {  // 点击qq一键登录触发qq登录
            outer.qq_login();
        });
    }

    add_listening_events_login() {
        let outer = this;
        this.$login_submit.click(function () {  // 点击提交按钮触发登录
            outer.login_on_remote();
        })
        this.$login_to_register.click(function () {  // 点击切换文本触发切换
            outer.register();
        });
    }

    add_listening_events_register() {
        let outer = this;
        this.$register_submit.click(function () {  // 点击提交按钮触发注册
            outer.register_on_remote();
        })
        this.$register_to_login.click(function () {  // 点击切换文本触发切换
            outer.login();
        });
    }

    qq_login() {
        $.ajax({
            url: 'https://app5952.acapp.acwing.com.cn/settings/qq/apply_code/',
            type: 'GET',
            success: function (resp) {
                // resp: views/settings/qq/apply_code apply_code(request) 返回的数据
                console.log(resp);
                if (resp.result === 'success') {
                    // window.location.replace(resp.apply_code_url);
                }
            }
        });
    }

    login_on_remote() {  // 在服务器上登录
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_messgae.empty();

        let outer = this;
        $.ajax({
            url: 'https://app5952.acapp.acwing.com.cn/settings/login/',
            type: 'GET',
            data: {
                // data: views/settings/login signin(request)函数 输入的数据
                username: username,
                password: password,
            },
            success: function (resp) {
                // resp: views/settings/login signin(request)函数 返回的数据
                console.log(resp);
                if (resp.result === 'success') {     // 服务器返回成功
                    console.log("刷新");
                    location.reload();
                } else {  // 服务器返回失败：用户名或密码不正确
                    outer.$login_error_messgae.html(resp.result);
                }
            }
        });
    }

    logout_on_remote() {  // 在服务器上退出
        if (this.platform === "ACAPP")
            return false;
        $.ajax({
            url: 'https://app5952.acapp.acwing.com.cn/settings/logout/',
            type: 'GET',
            success: function (resp) {
                // resp: views/settings/logout signout(request)函数 返回的数据
                console.log(resp);
                if (resp.result === 'success') {     // 服务器返回成功
                    console.log("刷新");
                    location.reload();
                }
            }
        });
    }

    register_on_remote() {  // 在服务器上注册
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let repassword = this.$register_repassword.val();
        this.$register_error_messgae.empty();

        let outer = this;
        $.ajax({
            url: 'https://app5952.acapp.acwing.com.cn/settings/register/',
            type: 'GET',
            data: {
                // data: views/settings/register register(request)函数 输入的数据
                username: username,
                password: password,
                repassword: repassword,
            },
            success: function (resp) {
                // resp: views/settings/register register(request)函数 返回的数据
                console.log(resp);
                if (resp.result === 'success') {     // 服务器返回成功
                    console.log("刷新");
                    location.reload();
                } else {  // 服务器返回失败：错误信息
                    outer.$register_error_messgae.html(resp.result);
                }
            }
        });
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
                    //outer.register();
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