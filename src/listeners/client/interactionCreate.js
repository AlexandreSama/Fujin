const {Listener} = require('discord-akairo');
const mysql = require('mysql2')
const Discord = require('discord.js')
const config = require('../../config.json')

class InteractionCreateListener extends Listener{
    constructor(){
        super('interactionCreate', {
            emitter: 'client',
            event: 'interactionCreate',
        });
    }

    exec(interaction){

        const connection = mysql.createConnection({
            host: config.databaseHost,
            user: config.databaseUsername,
            database: config.databaseName,
            supportBigNumbers: true
        });

        if(interaction.customId === "sell"){
            connection.query(`SELECT inventory FROM players WHERE playerid = ${interaction.member.user.id}`, function(errors, results){
                if(errors){
                    console.log(errors)
                }
                if(results){
                    let embedSell = new Discord.MessageEmbed()
                    .setTitle('Objets en ta possession')
                    .setDescription('Alors ? Que souhaite-tu me vendre ?')
                    let inventory = results[0]['inventory']['armes']
                    inventory.forEach(element => {
                        embedSell.addField('\u200B', '\u200B')
                        embedSell.addField('Nom', element.name, false)
                        embedSell.addField('Valeur', element.value, true)
                    });
                    interaction.reply({embeds: [embedSell]})
                }
            })
        }
        if(interaction.customId === "buy"){

        }
    }
}

module.exports = InteractionCreateListener