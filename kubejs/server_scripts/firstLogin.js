PlayerEvents.loggedIn(e => {
    if (!e.hasGameStage('started')) {
        e.player.give('ftbquests:book')
        e.player.give('waystones:waystone')
        e.player.give('splendid_slimes:slime_vac')

        e.addGameStage('started')
    }
})
