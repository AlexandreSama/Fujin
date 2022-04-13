const {
    Listener
} = require('discord-akairo');
const mysql = require('mysql2')
const config = require('../../config.json')
const {
    Permissions
} = require('discord.js');
const functions = require('../../utils/functions')

class InteractionCreateListener extends Listener {
    constructor() {
        super('interactionCreate', {
            emitter: 'client',
            event: 'interactionCreate',
        });
    }
    
    async exec(interaction) {
        if (!interaction.isButton()) return;
	    if(interaction.customId == "validerficher" || "refuserfiche" && interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)){
            console.log("ok")
        }else{
            console.log('Pas la perm !')
        }
    }
}

module.exports = InteractionCreateListener