import Phaser from 'phaser'

import io from 'socket.io-client'

export default class extends Phaser.State {
    preload() {
        this.load.image('loadingBar', 'assets/images/loadingbar.png')
        this.load.image('loadingOutline', 'assets/images/loadingoutline.png')

        this.physics.startSystem(Phaser.Physics.ARCADE)
    }

    create() {
        // Connect to the server
        this.game.socket = io.connect('http://localhost:8000');

        this.game.socket.on('connect', () => {
            this.game.socket.emit('join', 'Client join')
        })

        // Keep the game running if the browser window loses focus.  Switching browser tabs
        // will still pause the game.
        this.game.stage.disableVisibilityChange = true
        this.state.start('Preloader')
    }
}