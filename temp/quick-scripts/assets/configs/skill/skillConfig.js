(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/configs/skill/skillConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0a95f+9eOtLgb0CFOdb2K5l', 'skillConfig', __filename);
// configs/skill/skillConfig.js

"use strict";

var skillConfig = {
    "20001001": {
        skillType: 1,
        attackRange: 1000,
        faction: 1, //1 is enemy , 2 is self's faction
        targetNum: 1, //-1 is all target of the range
        hurtRange: -1, //-1 is the target
        hurtType: 1, //1 is physical , 2 is magical

        animationName: "attack",
        bulletResourceId: 30001,
        moveSpeed: 1000,
        offsetX: 17.583,
        offsetY: 93.278,
        hurtEffectResourceId: "",
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
        