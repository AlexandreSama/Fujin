const {Command} = require('discord-akairo')
const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');

class CreateRaceCommand extends Command{
    constructor(){
        super('createrace', {
            aliases: ['cr', 'createrace'],
            userPermissions: "ADMINISTRATOR",
            category: 'Administration',
            description: {
                content: "La commande clear supprime un certain nombre de message dans un salon",
                usage: 'clear <nombre de messages>',
                examples: ['clear 100']
            },
            slash: true
        })
    }

    execSlash(message, args){
        message.reply("C'est parfait !")
    }

}


module.exports = CreateRaceCommand