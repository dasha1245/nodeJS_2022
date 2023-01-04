const {CronJob} = require('cron');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const {authService} = require('../service')

dayjs.extend(utc);

module.exports = new CronJob(
    '* */60 * * * *',
    async function() {
        try {
            console.log('Starting removing')
            const hourAgo = dayjs().utc().subtract(1, 'hour')
            await authService.deleteAllTokensPair({createdAt : {$lte: hourAgo}})
            console.log('Finishing removing')

        } catch (e) {
            console.error(e)
        }
    }
)

