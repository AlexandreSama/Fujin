const mysql2 = require('mysql2')
const config = require('../config.json')

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

async function writeRaceToDB(interaction, name, health, attack, defense, lore) {
    connection.query(`INSERT INTO race (raceName, baseHealth, baseAttack, baseDefense, lore) VALUES
    ('${name}', '${health}', '${attack}', '${defense}', '${lore}')`, async function(err, result){
        if(err){
            await interaction.reply('Erreur avec la BDD !')
        }
        if(result){
            await interaction.reply('Parfait, la création est réussi !')
        }
    })
}

module.exports = {
    writePlayerToDB,
    checkUserInDB,
    writeRaceToDB
}