const {Listener} = require('discord-akairo');
const {MessageActionRow, MessageButton} = require('discord.js')
class MessageCreateListener extends Listener{
    constructor(){
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate',
        });
    }

    exec(message){
        
    }
}

module.exports = MessageCreateListener