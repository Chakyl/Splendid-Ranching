// Borrowed from society



ItemEvents.tooltip(e => {
    for (let coinEntry of Object.entries(global.coinObj)) {
        e.addAdvanced(coinEntry[0], (item, advanced, text) => {
            let val = global.coinObj[item.id]
            if (e.shift) {
                text.add(1, [
                    `§6${global.calculateCost(val, 1, item.count)}§a¤`,
                    item.count > 1 ? '§7 Stack Value' : ''
                ])
            } else {
                text.add(1, [
                    `§6${global.calculateCost(val, 1, 1)}§a¤`,
                    item.count > 1 ? '§8 [§7Shift§8]' : ''
                ])
            }
        })
    }
})

