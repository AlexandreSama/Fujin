const {Command} = require('discord-akairo')

class ClearCommand extends Command{
    constructor(){
        super('clear', {
            aliases: ['clear'],
            userPermissions: "MANAGE_MESSAGES",
            args: [{
                id: "numberClear", type: "number", match: 'content'
            }],
            category: 'Moderation',
            description: {
                content: "La commande clear supprime un certain nombre de message dans un salon",
                usage: 'clear <nombre de messages>',
                examples: ['clear 100']
            }
        })
    }

    exec(message, args){
        if(!args.numberClear){
            message.channel.send("Tu dois me donner un nombre de messages a supprimer stp !")
        }else{
            message.channel.bulkDelete(args.numberClear);
            message.channel.send("Un membre du staff viens de supprimer : " + args.numberClear + " messages.")
        }
    }

}


module.exports = ClearCommand