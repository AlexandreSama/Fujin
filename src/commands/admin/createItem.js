const {Command} = require('discord-akairo')

class CreateItemCommand extends Command{
    constructor(){
        super('createitem', {
            aliases: ['createitem'],
            userPermissions: "ADMINISTRATOR",
            category: 'Administration',
            description: {
                content: "La commande createitem permet d'ajouter un item dans le système de jeu",
                usage: 'createitem',
                examples: ['createitem']
            },
            slash: true
        })
    }

    execSlash(message, args){
        
    }

}


module.exports = CreateItemCommand