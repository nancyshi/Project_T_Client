(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/configs/tower/towerConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '88d4fxn3edJ/Y6E53feB4E8', 'towerConfig', __filename);
// configs/tower/towerConfig.js

"use strict";

var towerConfig = {
    "20001": {
        "level_1": {
            prefabName: "acherTow_101_01",
            hurt: 100,
            hurtType: 1,
            hurtDelta: 1,
            iconName: "icon_acherTower"
        },
        "level_2": {
            prefabName: "acherTow_101_01",
            hurt: 150,
            hurtType: 1,
            hurtDelta: 0.5,
            iconName: "icon_acherTower"
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
        