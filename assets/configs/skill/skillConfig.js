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
        additionalBuffId: "",
    }
}

module.exports = skillConfig