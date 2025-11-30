PlayerEvents.loggedIn(e => {
    if (!e.hasGameStage('started')) {
        e.player.give('splendid_slimes:slime_vac')
        e.player.give('ftbquests:book')
        e.player.give('numismatics_utils:bank_meter')
        e.player.give('numismatics:magenta_card')

        e.addGameStage('started')
    }
})
