const {Listener} = require('discord-akairo');
const functions = require('../../utils/functions')
class guildMemberUpdateListener extends Listener{
    constructor(){
        super('guildMemberUpdate', {
            emitter: 'client',
            event: 'guildMemberUpdate',
        });
    }

    exec(oldMember, newMember){
        if(newMember.roles.cache.find(r => r.name === "test")){
            console.log(functions.checkUserInDB(newMember.id))
        }else{
            console.log('N\'a pas ou plus le rôle')
        }
    }
}

module.exports = guildMemberUpdateListener