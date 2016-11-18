const { port } = require('../env')

module.exports = {
  // Report Server の Master Actor の接続先
  ReportServer: {
    masterActorConifg: {
      protocol: 'http',
      hostname: 'localhost',
      port: port.UI
    }
  },
  // Camera server の notify Actor の接続先
  CameraServer: {
    cameraActorConfig: {
      protocol: 'http',
      hostname: 'localhost',
      port: port.UI
    }
  }
}
