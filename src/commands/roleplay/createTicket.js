const {
    Command
} = require('discord-akairo')
const {
    MessageEmbed,
    Permissions
} = require('discord.js');
const {
    MessageActionRow,
    MessageSelectMenu,
    Discord,
    MessageButton
} = require('discord.js');

class CreateTicketCommand extends Command {
    constructor() {
        super('createticket', {
            aliases: ['ct'],
            category: 'Roleplay',
            description: {
                content: "La commande createticket permet de crée un ticket pour valider le personnage",
                usage: 'createticket',
                examples: ['createticket']
            },
            slash: true,
            slashOptions: [{
                name: "createticket",
                description: "La commande createticket permet de crée un ticket pour valider le personnage",
                type: 'STRING',
                autocomplete: false
            }]
        })
    }

    execSlash(message, args) {
        let modRole = message.guild.roles.cache.find(role => role.name == "Mods")
        message.guild.channels.create(`ticket-de-${message.author.username}`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [{
                    id: message.author.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: message.guild.roles.everyone,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL]
                },
                {
                    id: modRole.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL]
                }
            ]
        }).then(channel => {
            let category = message.guild.channels.cache.get("963464344371359774")
            channel.setParent(category.id).then(channel => {
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('validerfiche')
                        .setLabel('Fiche validé !')
                        .setStyle('SUCCESS')
                        .setEmoji('✅')
                    )
                    .addComponents(
                        new MessageButton()
                        .setCustomId('refuserfiche')
                        .setLabel('Fiche refusé !')
                        .setStyle('DANGER')
                        .setEmoji('❎')
                    )
                const exampleEmbed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('Vérification de fiche')
                    .setDescription(`<@${message.author.id}>, tu peut poster ta fiche ici ! \n Quand les modérateurs l'auront validé, tu sera tenu au courant et ton ticket sera fermé `)
                channel.send({
                    embeds: [exampleEmbed],
                    components: [row]
                })
                channel.send(`<@${message.author.id}>`).then(message => {
                    message.delete()
                })
            })
        }).catch(err => {
            console.log(err)
            message.channel.send(`Une erreur s'est produite, merci d'en informer mon créateur !`)
        })
    }

}


module.exports = CreateTicketCommand