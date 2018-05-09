if (process.env.NODE_ENV === 'production') {
  module.exports = require('./config.prod.json'); // eslint-disable-line
} else if (process.env.REACT_APP_HOST_ENV === 'test-server' || process.env.NODE_ENV === 'test') {
  module.exports = require('./config.test.json'); // eslint-disable-line
} else {
  module.exports = require('./config.dev.json'); // eslint-disable-line
}
