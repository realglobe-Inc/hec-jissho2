(function () {
  var handleError = function (err) {
    window.alert('予期せぬエラーが発生しました:')
  }

  window.addEventListener('error', handleError)

  // addEventListener できなかった
  var onUnhandled = window.onunhandledrejection
  var errs = []
  window.onunhandledrejection = function (rejection) {
    onUnhandled && onUnhandled(rejection)
    console.error(rejection.reason)

    // 同じエラーメッセージは複数回警告しないように
    let first = errs.some(function (err) {
      return err.message === rejection.reason.message
    })
    if (first) {
      handleError()
      errs.push(rejection.reason)
    }
  }
})()
