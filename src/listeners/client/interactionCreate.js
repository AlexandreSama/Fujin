const {
    Listener
} = require('discord-akairo');
const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');
const mysql = require('mysql2')
const config = require('../../config.json')
const functions = require('../../utils/functions')

class InteractionCreateListener extends Listener {
    constructor() {
        super('interactionCreate', {
            emitter: 'client',
            event: 'interactionCreate',
        });
    }
    
    async exec(interaction) {
        switch (interaction.commandName) {
            case "cr":
                const modal = new Modal()
                    .setCustomId('createRace')
                    .setTitle('Création de Race');

                const raceNameInput = new TextInputComponent()
                    .setCustomId('raceName')
                    // The label is the prompt the user sees for this input
                    .setLabel("Quel est le nom de cet Race ?")
                    // Short means only a single line of text
                    .setStyle('SHORT');

                const raceHealthInput = new TextInputComponent()
                    .setCustomId('raceHealth')
                    .setLabel("Point de vie de cet race")
                    // Paragraph means multiple lines of text.
                    .setStyle('SHORT');

                const raceAttackInput = new TextInputComponent()
                .setCustomId('raceAttack')
                .setLabel("Point d'attaque de cet race")
                // Paragraph means multiple lines of text.
                .setStyle('SHORT');

                const raceDefenseInput = new TextInputComponent()
                    .setCustomId('raceDefense')
                    .setLabel("Point de défense de cet race")
                    // Paragraph means multiple lines of text.
                    .setStyle('SHORT');

                const raceLoreInput = new TextInputComponent()
                .setCustomId('raceLore')
                .setLabel("Un peu de lore peut-être ?")
                // Paragraph means multiple lines of text.
                .setStyle('PARAGRAPH');

                // An action row only holds one text input,
                // so you need one action row per text input.
                const firstActionRow = new MessageActionRow().addComponents(raceNameInput);
                const secondActionRow = new MessageActionRow().addComponents(raceHealthInput);
                const thirdActionRow = new MessageActionRow().addComponents(raceAttackInput);
                const fourthActionRow = new MessageActionRow().addComponents(raceDefenseInput);
                const fiveActionRow = new MessageActionRow().addComponents(raceLoreInput);

                // Add inputs to the modal
                modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fiveActionRow);
                interaction.showModal(modal)
                break;
        }

        if(interaction.isModalSubmit()){
            let raceName = interaction.fields.getTextInputValue('raceName')
            let raceHealth = interaction.fields.getTextInputValue('raceHealth')
            let raceAttack = interaction.fields.getTextInputValue('raceAttack')
            let raceDefense =interaction.fields.getTextInputValue('raceDefense')
            let raceLore = interaction.fields.getTextInputValue('raceLore')
            functions.writeRaceToDB(interaction, raceName, raceHealth, raceAttack, raceDefense, raceLore)
        }
    }
}

module.exports = InteractionCreateListener