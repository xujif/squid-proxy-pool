const fs = require('fs')
const utils = require('./utils')

const confPath = '/etc/squid/peers.conf'

// init str
if (process.env.NODE_ENV === 'production' && !fs.existsSync(confPath)) {
  let conf = process.env.PROXIES.split(';').filter(s => utils.testProxyStr(s)).map(s => utils.parseProxyStrToSquidConf(s)).join('\n')
  fs.writeFileSync(confPath, conf)
}
