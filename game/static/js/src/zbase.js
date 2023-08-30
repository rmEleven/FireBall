class Game {
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