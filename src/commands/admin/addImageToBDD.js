const {Command} = require('discord-akairo')
const Downloader = require("nodejs-file-downloader");

class AddImageToBDDCommand extends Command{
    constructor(){
        super('addimagetobdd', {
            aliases: ['addimage'],
            userPermissions: "ADMINISTRATOR",
            category: 'Administration',
            separator: "|",
            args: [{
                id: "type", type: "string", match: "separate",
            }],
            description: {
                content: "La commande addimage permet d'ajouter une image a un item, un mob ou une race",
                usage: 'addimage type | nom',
                examples: ['addimage items | Araignée_Bleuté']
            },
        })
    }

    exec(message, args){
        if(message.attachments.size >= 1){
            message.attachments.forEach(element => {
                const downloader = new Downloader({
                    url: element.url, //If the file name already exists, a new file with the name 200MB1.zip is created.
                    directory: process.cwd() + `\\src\\utils\\guilds\\${message.guild.id}\\${args.type[0]}`,
                    fileName: `${args.type[1]}.jpg`
                });
                try {
                    downloader.download()
                    console.log('téléchargé !')
                } catch (error) {
                    console.log(error)
                }
            });
        }else{
            message.reply('Il me faut une image a insérer')
        }
    }

}


module.exports = AddImageToBDDCommand