class Wait {
  static forMs (time) {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }

  static async forCondition (fnPredict, spanMs = 100) {
    while (true) {
      if (fnPredict()) return
      await Wait.forMs(spanMs)
    }
  }
}

module.exports = Wait
