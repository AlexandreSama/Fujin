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
        let authorid = message.author.id;
        const filter = message => message.author.id == authorid;
        console.log(message.channel.lastMessage.author.id)

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('sell')
            .setLabel('Vendre')
            .setStyle('SUCCESS'),

            new MessageButton()
            .setCustomId('buy')
            .setLabel('Acheter')
            .setStyle('SUCCESS')
        )
        if(message.channel.name === "salon-de-thé" && !message.author.bot){
            message.channel.send({content: `Bonjour et bienvenue dans notre boutique ! Souhaitez-vous acheter des objets de qualités ou vendre vos trouvailles ?`, components: [row]})
        }
    }
}

module.exports = MessageCreateListener