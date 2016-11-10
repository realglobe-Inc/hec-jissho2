import { CountAction } from '../interfaces/actions'

const count = (state: number = 0, action: CountAction) => {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return state + 1
    default:
      return state
  }
}

export default count
