const path = require('path')

module.exports = {
  CODE_OK: 0,
  CODE_CLIENT_ERR: 400,
  CODE_CLIENT_FORBIDDEN: 403,
  CODE_TOKEN_EXPIRE: -900,
  JWT_TOKEN: 'my_token_secret_ynvy895b56',
  JWT_TOKEN_EXPIRE: '30 days',
  UPLOAD_PATH: path.join(__dirname, '../public/upload'),
  PUBLIC_PATH: path.join(__dirname, '../public')
}
