// 日志功能暂未使用，此代码仅供参考 2019-7-23 15:27:51
const app = express();

// log4js
const log4js = require('log4js');
log4js.configure({
  appenders: {
    console: { type: 'console' },
    access: {type: 'file', filename: './logs/access.log'}
  },
  categories: {
    default: {appenders: ['console', 'access'], level: 'info'}
  }
});
const logger = log4js.getLogger();
app.use(log4js.connectLogger(logger, { level: 'info' }));

logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Comté.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');
