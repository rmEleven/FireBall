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

        this.start();
    }

    start() {
        this.getinfo();  // 从服务器端获取信息
    }

    login() {  // 打开登录界面
        ;
    }

    register() {  // 打开注册界面
        ;
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
        //this.$settings.show();
    }

    hide() {
        // 隐藏settings页面
        //this.$settings.hide();
    }
}