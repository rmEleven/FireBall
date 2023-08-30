class GameMenu {
    constructor(root) {
        console.log("GameMenu Created");  // 游戏菜单创建的提示信息

        this.root = root;  // 记录Game对象
        // 创建menu前端
        this.$menu = $(`
            <div class="game-menu">
            </div>
        `);
        this.root.$game.append(this.$menu);  // 把menu前端添加到game前端
    }
}class Game {
    constructor(id) {
        console.log("Game Created");  // 游戏创建的提示信息

        this.id = id;              // 传入的前端div的id
        this.$game = $('#' + id);  // 找到id对应的前端div

        this.menu = new GameMenu(this);  // 创建menu对象
    }
}