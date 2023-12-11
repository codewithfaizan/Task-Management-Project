const { createLogger, transports, format } = require('winston')
const moment = require('moment');

// ------- Logger Function --------

const customFormat = format.printf(({ level, message, timestamp }) => {
    return `[${level}] ${message}, ${moment(timestamp).format('YYYY-MM-DD HH:mm:ss')} `;
  });
  

const logger = createLogger({
    transports: [
        new transports.File(
            {
                filename: 'user.log',
                level: 'info',
                format: format.combine(format.timestamp('YYYY-MM-DD HH:mm:ss'), customFormat)
            }
        ),
        new transports.File(
            {
                filename: 'user-error.log',
                level: 'error',
                format: format.combine(format.timestamp('YYYY-MM-DD HH:mm:ss'), customFormat)
            }
        ),
    ],
})

module.exports = logger;