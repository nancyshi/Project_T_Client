(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/configs/tower/towerConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2d40dirXqJJcL599wss3gah', 'towerConfig', __filename);
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
            hurtRange: -1
        },
        "2": {
            resId: 20001,
            hurt: 150,
            hurtType: 1,
            hurtDelta: 0.5,
            attackRange: 300,
            hurtRange: -1
        }
    }
};

module.exports = towerConfig;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=towerConfig.js.map
        