const {Command} = require('discord-akairo')

class ShowInventoryCommand extends Command{
    constructor(){
        super('showinventory', {
            aliases: ['si'],
            args: [{
                id: "Player", type: "member"
            }],
            category: 'Roleplay',
            description: {
                content: "La commande showinventory permet de voir l'inventaire de son personnage ainsi que son argent",
                usage: 'showinventory',
                examples: ['showinventory']
            },
            slash: true
        })
    }

    execSlash(message, args){
        console.log(args.Player)
    }

}


module.exports = ShowInventoryCommand