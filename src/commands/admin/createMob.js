const {Command} = require('discord-akairo')

class CreateMobCommand extends Command{
    constructor(){
        super('createmob', {
            aliases: ['createmob'],
            userPermissions: "ADMINISTRATOR",
            category: 'Administration',
            description: {
                content: "La commande createmob permet d'ajouter un monstre ou une créature dans le système de jeu",
                usage: 'createmob',
                examples: ['createmob']
            },
            slash: true
        })
    }

    execSlash(message, args){
        
    }

}


module.exports = CreateMobCommand