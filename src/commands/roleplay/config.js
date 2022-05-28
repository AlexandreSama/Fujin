const {Command} = require('discord-akairo')

class ConfigCommand extends Command{
    constructor(){
        super('config', {
            aliases: ['config'],
            category: 'Roleplay',
            description: {
                content: "La commande config permet de configurer le bot pour qu'il soit prêt a être utilisé lors d'un rp",
                usage: 'config',
                examples: ['config']
            },
            slash: true
        })
    }

    execSlash(message, args){

    }

}


module.exports = ConfigCommand