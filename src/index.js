const GotoClient = require('./structure/GotoClient')
const config = require('./config.json')

let client = new GotoClient({
    prefix: '?',
})

client.login(config.token)