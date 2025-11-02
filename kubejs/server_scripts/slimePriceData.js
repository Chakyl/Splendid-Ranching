// object for storing slimes data
const baseSlimeData = {
    all_seeing: {
        baseValue: 10,
        currentMultiplier: 1,
        minMultiplier: 0.5,
        maxMultiplier: 2
    },
    bitwise: {
        baseValue: 13,
        currentMultiplier: 1,
        minMultiplier: 0.5,
        maxMultiplier: 2
    },
    blazing: {
        baseValue: 15,
        currentMultiplier: 1,
        minMultiplier: 0.5,
        maxMultiplier: 2
    },
    bony: {
        baseValue: 20,
        currentMultiplier: 1,
        minMultiplier: 0.5,
        maxMultiplier: 2
    },
    boomcat: {
        baseValue: 30,
        currentMultiplier: 1,
        minMultiplier: 0.5,
        maxMultiplier: 2
    }
}

ServerEvents.loaded(e => {
    if (e.server.persistentData['slime_data'] === undefined) {
        e.server.persistentData['slime_data'] = baseSlimeData
    }
})

ItemEvents.firstRightClicked('minecraft:iron_sword', e => {
    e.player.sendData('kubejs:slime_data', e.server.persistentData['slime_data'])
})

ItemEvents.firstLeftClicked('minecraft:iron_sword', e => {
    e.server.persistentData['slime_data'] = baseSlimeData
})