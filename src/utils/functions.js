const mysql2 = require('mysql2')
const config = require('../config.json')
const fs = require('fs')

/* It's creating a connection to the database. */
const connection =  mysql2.createConnection({
    host: config.databaseHost,
    user: config.databaseUsername,
    database: config.databaseName
});

/**
 * It takes a discordID and a race name as parameters, then it checks if the race exists in the
 * database, if it does, it creates a new player with the base stats of the race.
 * @param discordID - The discord ID of the user
 * @param race - String
 */
async function writePlayerToDB(discordID, race) {
    connection.query(`SELECT baseHealth, baseAttack, baseDefense 
    FROM race WHERE raceName = ${race}`, function(err, result){

        if(err){
            throw err
        }

        if(result.length > 0){
            connection.query(`INSERT INTO players (discordId, health, attack, defense, money, inventory, race) 
            VALUES ('${discordID}', '${result.baseHealth}', '${result.baseAttack}', '${result.baseDefense}', '1000', '[{}]', '${race}'
            )`, function(err, result){
                
                if(err){
                    throw err
                }

                console.log('Parfait')
            })
        }else{
            console.log("Pas de race a ce nom !")
        }
    })
}

/**
 * It checks if a user is in the database, if he is, it returns true, if not, it returns false.
 * @param discordId - The discord ID of the user.
 */
async function checkUserInDB(discordId) {
    connection.query(`SELECT * FROM players WHERE discordId = ${discordId}`, function(err, result){
        if(err){
            console.log('Erreur avec la BDD')
        }
        if(result.length > 0){
            console.log('Un personnage !')
        }else{
            console.log('Pas de personnage !')
        }
    })
}

/**
 * It takes in 5 parameters, and then inserts them into a database.
 * </code>
 * @param interaction - The interaction object from the interaction handler
 * @param name - String
 * @param health - 100
 * @param attack - number
 * @param defense - number
 * @param lore - The lore of the race
 */
async function writeRaceToDB(interaction, name, health, attack, defense, lore) {
    connection.query(`INSERT INTO races (raceName, baseHealth, baseAttack, baseDefense, lore) VALUES
    ('${name}', '${health}', '${attack}', '${defense}', '${lore}')`, async function(err, result){
        if(err){
            await interaction.reply('Erreur avec la BDD !')
        }
        if(result){
            await interaction.reply('Ajout de la race réussi !')
        }
    })
}

/**
 * It takes in 5 parameters, and then inserts them into a table in a MySQL database.
 * </code>
 * @param interaction - The interaction object, which is the object that contains the message, the
 * author, the channel, etc.
 * @param name - The name of the mob
 * @param health - 100
 * @param attack - The attack of the mob
 * @param defense - 0
 * @param lore - The lore of the mob
 */
async function writeMobToDB(interaction, name, health, attack, defense, lore) {
    connection.query(`INSERT INTO mobs (mobName, baseHealth, baseAttack, baseDefense, lore) VALUES
    ('${name}', '${health}', '${attack}', '${defense}', '${lore}')`, async function(err, result){
        if(err){
            console.log(err)
            await interaction.reply('Erreur avec la BDD !')
        }
        if(result){
            await interaction.reply('A-tu une image ?')
        }
    })
}

/**
 * It takes in 5 arguments, and then inserts them into a database.
 * @param interaction - the interaction object
 * @param name - The name of the item
 * @param damage - int
 * @param defense - int
 * @param effects - "1,2,3"
 * @param lore - string
 */
async function writeItemToDB(interaction, name, damage, defense, effects, lore) {
    connection.query(`INSERT INTO items (name, damage, defense, effects, lore) VALUES 
    ('${name}', '${damage}', '${defense}', '${effects}', '${lore}')`, async function(err, result){
        if(err){
            console.log(err)
            await interaction.reply('Erreur avec la BDD')
        }
        if(result){
            await interaction.reply('Ajout de l\'item réussi !')
        }
    })
}

/**
 * It creates a database with the server ID, then creates 3 tables in that database.
 * </code>
 * @param serverID - The ID of the server
 * @param interaction - The message object
 */
async function writeServerToDB(serverID, interaction) {
    connection.query('CREATE DATABASE' + '`' + `${serverID}` + '`', async function(err, result){
        if(err){
            console.log(err)
        }
        if(result){
            connection.query('USE' + '`' + `${serverID}` + '`', async function(err, result){
                if(err){
                    console.log(err)
                }
                if(result){
                    connection.query(`CREATE TABLE items (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, damage BIGINT(20) NOT NULL, defense BIGINT(20) NOT NULL, effects TEXT NOT NULL, lore TEXT NOT NULL)`, function(err, result){
                        if(err){
                            console.log(err)
                        }
                        if(result){
                            connection.query(`CREATE TABLE players (id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, discordId INT(11) NOT NULL, health INT(11) NOT NULL, attack INT(11) NOT NULL, defense INT(11) NOT NULL, money INT(11) NOT NULL, inventory JSON NOT NULL, race VARCHAR(255) NOT NULL)`, function(err, result){
                                if(err){
                                    console.log(err)
                                }
                                if(result){
                                    connection.query(`CREATE TABLE races ( id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, raceName VARCHAR(255) NOT NULL, baseHealth INT(11) NOT NULL, baseAttack INT(11) NOT NULL, baseDefense INT(11) NOT NULL, lore TEXT NOT NULL)`, function(err, result){
                                        if(err){
                                            console.log(err)
                                        }
                                        if(result){
                                            connection.query(`CREATE TABLE mobs ( id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, mobName VARCHAR(255) NOT NULL, baseHealth INT(11) NOT NULL, baseAttack INT(11) NOT NULL, baseDefense INT(11) NOT NULL, lore TEXT NOT NULL)`, function(err, result){
                                                if(err){
                                                    console.log(err)
                                                }
                                                if(result){
                                                    let folders = ["mobs", "items", "races"]
                                                    fs.mkdirSync(__dirname + `\\guilds\\${serverID}`)
                                                    folders.forEach(element => {
                                                        fs.mkdirSync(__dirname + `\\guilds\\${serverID}\\${element}`)
                                                    })
                                                    interaction.channel.send('La configuration est terminé ! Merci a vous !')
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

/**
 * It checks if a database exists, if it doesn't, it creates it.
 * @param serverID - The ID of the server the bot is in.
 * @param interaction - The interaction object that is passed to the command handler.
 */
async function checkDB(serverID, interaction) {
    connection.query(`USE ${serverID}`, async function(err, result){
        if(err){
            writeServerToDB(serverID, interaction)
        }
        if(result){
            await interaction.reply('Tu a déjà fait la configuration !')
        }
    })
}

module.exports = {
    writePlayerToDB,
    checkUserInDB,
    writeRaceToDB,
    writeItemToDB,
    writeMobToDB,
    checkDB,
    writeServerToDB
}