// priority: 1000

// object for storing slimes data
global.baseSlimeValueData = {
    // naturally spawning
    slimy: {
        baseValue: 5,
        currentValue: 5,
        priceRange: [3, 10], // min and max price
        /* The current market volume of the plort to scale off.
        Every sold plort increases this value by 1, and the price is scaled off this value
        up to the max volume, at which point the price is halved.
        each day the current volume is reduced by 25% of its previous value */
        currentVolume: 20, // initial volume on day 0 before any daily adjustments
        maxVolume: 40,
        slimeDupeCost: 8
    },
    puddle: {
        baseValue: 5,
        currentValue: 5,
        priceRange: [3, 10],
        currentVolume: 20,
        maxVolume: 40,
        slimeDupeCost: 8
    },
}

