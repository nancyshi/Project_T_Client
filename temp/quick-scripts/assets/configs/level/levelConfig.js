(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/configs/level/levelConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8eafe2ghUVJII4QM9pdKv0g', 'levelConfig', __filename);
// configs/refresh/levelConfig.js

"use strict";

var levelConfig = {
    "level_01": {
        refreshPlanId: 1001,
        maxHp: 100
    },
    "level_02": {
        refreshPlanId: 1001,
        maxHp: 10
    }
};

module.exports = levelConfig;

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
        //# sourceMappingURL=levelConfig.js.map
        