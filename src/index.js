const GotoClient = require('./structure/GotoClient')
const config = require('./config.json')
const Discord = require('discord.js');
const util = require('minecraft-server-util');

let client = new GotoClient({
    prefix: '?',
})

client.login(config.token)