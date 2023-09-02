let GAME_OBJECTS = [];  // 记录所有游戏对象的全局数组

class GameObject {
    constructor() {
        GAME_OBJECTS.push(this);        // 游戏对象加入全局数组
        this.has_called_start = false;  // 是否执行过start函数
        this.timedelta = 0;             // 目前帧距离上一帧的时间间隔
    }

    start() {
        // 只在第一帧执行一次
    }

    update() {
        // 每一帧都会执行
    }

    on_destroy() {
        // 在被删除前执行一次
    }

    destroy() {
        // 删掉该游戏对象：从全局数组删除
        this.on_destroy();

        for (let i = 0; i < GAME_OBJECTS.length; i++) {
            if (GAME_OBJECTS[i] === this) {
                GAME_OBJECTS.splice(i, 1);  // 从下标为i的元素开始删除1个
                break;
            }
        }
    }
}

let last_timestamp;  // 上一帧的时间戳

let GAME_ANIMATION = function (timestamp) {
    for (let i = 0; i < GAME_OBJECTS.length; i++) {
        let obj = GAME_OBJECTS[i];
        if (!obj.has_called_start) {      // 未执行过start
            obj.start();                  // 执行start
            obj.has_called_start = true;  // 标记为执行过start
        } else {                                         // 执行过start
            obj.timedelta = timestamp - last_timestamp;  // 更新时间间隔
            obj.update();                                // 执行update
        }
    }
    last_timestamp = timestamp;  // 更新上一帧的时间戳

    requestAnimationFrame(GAME_ANIMATION);
};

// 下一帧调用函数
requestAnimationFrame(GAME_ANIMATION);