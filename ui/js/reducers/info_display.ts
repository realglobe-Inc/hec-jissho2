/**
* 情報欄の表示／非表示
*/
import { Reducer, Store } from '../interfaces/store'
import { InfoDisplayAction, TOGGLE_INFO_DISPLAY } from '../interfaces/actions'

function isSmartPhone (): boolean {
  let ua = navigator.userAgent
  return ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iPod') || ua.includes('Android')
}

let init = !isSmartPhone() // スマートフォンではデフォルトで閉じている
const infoDisplay: Reducer<Store.InfoDisplay> = (state: boolean = init, action: InfoDisplayAction) => {
  switch (action.type) {
    case TOGGLE_INFO_DISPLAY:
      return !state
    default:
      return state
  }
}

export default infoDisplay
