let slimeData = {}

NetworkEvents.dataReceived('kubejs:slime_data', e => {
    slimeData = e.data
    e.player.tell(`received data`)
})

ItemEvents.tooltip(e => {
    e.addAdvanced(`splendid_slimes:plort`, (stack, advanced, tooltip) => {
        let plort = stack.nbt['plort'].id.split(':')[1]

        tooltip.add(2, `§a¤ §6${slimeData[plort].baseValue}`)
    })
})