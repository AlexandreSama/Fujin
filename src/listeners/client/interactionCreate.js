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
            case "createrace":
                const modalRace = new Modal()
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
                modalRace.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fiveActionRow);
                interaction.showModal(modalRace)
            break;

            case "createitem":
                const modalItem = new Modal()
                    .setCustomId('createItem')
                    .setTitle('Création d\'un Item');

                const itemNameInput = new TextInputComponent()
                    .setCustomId('itemName')
                    // The label is the prompt the user sees for this input
                    .setLabel("Quel est le nom de cet item ?")
                    // Short means only a single line of text
                    .setStyle('SHORT');

                const itemDamageInput = new TextInputComponent()
                    .setCustomId('itemDamage')
                    .setLabel("Point de dégat de l'item")
                    // Paragraph means multiple lines of text.
                    .setStyle('SHORT');

                const itemDefenseInput = new TextInputComponent()
                .setCustomId('itemDefense')
                .setLabel("Point de défense de l'item")
                // Paragraph means multiple lines of text.
                .setStyle('SHORT');

                const itemEffectsInput = new TextInputComponent()
                    .setCustomId('itemEffects')
                    .setLabel("Les effets de cet item")
                    // Paragraph means multiple lines of text.
                    .setStyle('SHORT');

                const itemLoreInput = new TextInputComponent()
                .setCustomId('itemLore')
                .setLabel("Un peu de lore peut-être ?")
                // Paragraph means multiple lines of text.
                .setStyle('PARAGRAPH');

                // An action row only holds one text input,
                // so you need one action row per text input.
                const firstActionRowItem = new MessageActionRow().addComponents(itemNameInput);
                const secondActionRowItem = new MessageActionRow().addComponents(itemDamageInput);
                const thirdActionRowItem = new MessageActionRow().addComponents(itemDefenseInput);
                const fourthActionRowItem = new MessageActionRow().addComponents(itemEffectsInput);
                const fiveActionRowItem = new MessageActionRow().addComponents(itemLoreInput);

                // Add inputs to the modal
                modalItem.addComponents(firstActionRowItem, secondActionRowItem, thirdActionRowItem, fourthActionRowItem, fiveActionRowItem);
                interaction.showModal(modalItem)
            break;
        }

        if(interaction.isModalSubmit()){

            switch (interaction.customId) {
                
                case "createItem":
                    let itemName = interaction.fields.getTextInputValue('itemName')
                    let itemDamage = interaction.fields.getTextInputValue('itemDamage')
                    let itemDefense = interaction.fields.getTextInputValue('itemDefense')
                    let itemEffects =interaction.fields.getTextInputValue('itemEffects')
                    let itemLore = interaction.fields.getTextInputValue('itemLore')
                    functions.writeItemToDB(interaction, itemName, itemDamage, itemDefense, itemEffects, itemLore)

                break;

                case "createRace":
                    let raceName = interaction.fields.getTextInputValue('raceName')
                    let raceHealth = interaction.fields.getTextInputValue('raceHealth')
                    let raceAttack = interaction.fields.getTextInputValue('raceAttack')
                    let raceDefense =interaction.fields.getTextInputValue('raceDefense')
                    let raceLore = interaction.fields.getTextInputValue('raceLore')
                    functions.writeRaceToDB(interaction, raceName, raceHealth, raceAttack, raceDefense, raceLore)

                break;
            }

        }
    }
}

module.exports = InteractionCreateListener