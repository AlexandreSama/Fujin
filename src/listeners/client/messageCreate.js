const {Listener} = require('discord-akairo');
const functions = require('../../utils/functions')
class messageCreateListener extends Listener{
    constructor(){
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate',
        });
    }

    exec(message){
        // console.log(message)
    }
}

module.exports = messageCreateListener