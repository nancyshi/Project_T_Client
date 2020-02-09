"use strict";
cc._RF.push(module, '2d40dirXqJJcL599wss3gah', 'towerConfig');
// configs/tower/towerConfig.js

"use strict";

var towerConfig = {
    "20001": {
        "1": {
            resId: 20001,
            hurt: 100,
            hurtType: 1,
            hurtDelta: 0.5,
            attackRange: 300,
            hurtRange: -1,
            buildExpend: 5,
            skills: [20001001]
        },
        "2": {
            resId: 20001,
            hurt: 150,
            hurtType: 1,
            hurtDelta: 0.5,
            attackRange: 300,
            hurtRange: -1,
            buildExpend: 5,
            skills: [20001001]
        }
    }
};

module.exports = towerConfig;

cc._RF.pop();