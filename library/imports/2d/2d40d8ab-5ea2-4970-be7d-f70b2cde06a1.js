"use strict";
cc._RF.push(module, '2d40dirXqJJcL599wss3gah', 'towerConfig');
// configs/tower/towerConfig.js

"use strict";

var towerConfig = {
    "20001": {
        "1": {
            resId: 20001,
            hurt: 100,
            buildExpend: 2,
            skills: {
                "20001001": {
                    isCommonSkill: 1,
                    cd: 1
                }
            }
        },
        "2": {
            resId: 20001,
            hurt: 150,
            buildExpend: 5,
            skills: {
                "20001001": {
                    isCommonSkill: 1,
                    cd: 1
                }
            }
        }
    }
};

module.exports = towerConfig;

cc._RF.pop();