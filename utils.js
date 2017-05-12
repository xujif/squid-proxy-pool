const proxyExp = /(https?):\/\/((\w+:\w+)@)?([^:/]+)(:\d+)?(\?.+)?$/

exports.testProxyStr = function (proxyStr) {
  return proxyExp.test(proxyStr)
}
exports.parseProxyStr = function (proxyStr) {
  let arr = proxyStr.match(proxyExp)
  let query = arr[6]
  let config = {}
  if (query) {
    arr[6].substring(1).split('&').forEach(qs => {
      let kv = qs.split('=')
      config[kv[0]] = kv[1] || true
    })
  }
  return {
    ip: arr[4],
    port: arr[5] ? parseInt(arr[5].substring(1)) : 80,
    auth: arr[3],
    protocal: arr[1],
    config: config
  }
}


exports.parseProxyStrToSquidConf = function (proxyStr) {
  let p = exports.parseProxyStr(proxyStr)
  let authStr = p.auth ? `login=${p.auth}` : ''
  let conf = `cache_peer ${p.ip} parent ${p.port} 0 ${authStr} round-robin proxy-only no-query connect-fail-limit=2`
  return conf
}
