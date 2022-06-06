const {Command} = require('discord-akairo')
const Discord = require('discord.js');
const {stripIndent} = require('common-tags')

/* The help command is a command that displays all the commands available in the bot. */
class HelpCommand extends Command{
    constructor(){
        super('help', {
            aliases: ['help'],
            category: 'Misc',
            args: [{ id: "command", type: 'commandAlias'}],
            description: {
                content: "La commande help renvoi des informations sur les commandes",
                usage: 'help <command>',
                examples: ['help', 'help botinfos']
            }
        })
    }

    exec(message, args){
        const prefix = this.handler.prefix
        const command = args.command
        if(!command){
            let embed = new Discord.MessageEmbed()
            .setAuthor(`Bonjour, mon nom est ${this.client.user.username}`, this.client.user.displayAvatarURL())
            .setDescription('Retrouvez la liste de toutes nos commandes ci-dessous ! En cas de besoin, rejoignez notre serveur !')

            for (const category of this.handler.categories.values()) {
                embed.addField(
                    `ф ${category.id}`,
                    category.filter(cmd => cmd.aliases.length > 0).map(cmd => `\`${cmd.aliases[0]}\``).join(', ')
                )
                
            }

            embed.addField(
                '------------', 
                `**\`${prefix} help <commande>\` pour des infos sur une commande spécifique**
                Exemples : \`${prefix} help ping\` | \`${prefix} help botinfos\``)

            return message.channel.send({ embeds: [embed]})
        }

        return message.channel.send(stripIndent`
        \`\`\`makefile
        [Help : Commande -> ${command.aliases[0]}] ${command.ownerOnly ? '/!\\ Créateurs uniquement' : ''}
        
        Description: ${command.description.content}
        Utilisation: ${prefix}${command.description.usage}
        Exemples : ${prefix}${command.description.examples.join(` | ${prefix}`)}
        
        \`\`\``)

    }

}


module.exports = HelpCommand