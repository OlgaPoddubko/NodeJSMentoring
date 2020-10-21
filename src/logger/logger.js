import winston from 'winston'

const logConfig = {
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'src/logger/logs/error.log', level: 'error'
    }),
    new winston.transports.File({
      filename: 'src/logger/logs/info.log', level: 'info'
    }),
  ]
};

const logger = winston.createLogger(logConfig)

if(process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  )
}

const infoMessageTemplate = (handlerName, req) => `${handlerName}, method: ${req.method}, url: '${req.url}'`
const errorMessageTemplate = (handlerName, req, error) => `${handlerName}, method: ${req.method}, error: ${error}`

export { logger, infoMessageTemplate, errorMessageTemplate }
