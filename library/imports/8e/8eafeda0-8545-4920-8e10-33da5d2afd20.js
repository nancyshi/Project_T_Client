"use strict";
cc._RF.push(module, '8eafe2ghUVJII4QM9pdKv0g', 'levelConfig');
// configs/level/levelConfig.js

"use strict";

var levelConfig = {
    "level_01": {
        refreshPlanId: 1001,
        maxHp: 100,
        initResourceNum: 0,
        resourceIncreaseSpeed: 3, //how many seconds will increase one resource num
        maxResourceNum: 5
    },
    "level_02": {
        refreshPlanId: 1001,
        maxHp: 10,
        initResourceNum: 0,
        resourceIncreaseSpeed: 3,
        maxResourceNum: 20
    }
};

module.exports = levelConfig;

cc._RF.pop();