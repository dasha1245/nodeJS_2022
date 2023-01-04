const removeOldTokens = require('./removeOldTokens')

const cronRunner = () => {
    removeOldTokens.start()
}

module.exports = {
    cronRunner
}