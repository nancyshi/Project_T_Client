(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/configs/skill/skillConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0a95f+9eOtLgb0CFOdb2K5l', 'skillConfig', __filename);
// configs/skill/skillConfig.js

"use strict";

var skillConfig = {
    "20001001": {
        animationName: "attack",
        bulletResourceId: 30001,
        moveSpeed: 10,
        offsetX: 0,
        offsetY: 0,
        hurtEffectResourceId: 40001,
        hurtEffectOffsetX: 0,
        hurtEffectOffsetY: 0,
        hurtCoefficient: 1.0,
        additionalBuffId: ""
    }
};

module.exports = skillConfig;

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
        //# sourceMappingURL=skillConfig.js.map
        