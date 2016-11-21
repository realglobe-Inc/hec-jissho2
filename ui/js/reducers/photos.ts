import { Reducer, Store } from '../interfaces/store'
import { PhotoInfo } from '../interfaces/app'
import * as Actions from '../interfaces/actions'
import * as Im from 'immutable'

let init: Store.Photos = Im.Map<string, PhotoInfo>()

/**
 * Reducer of photos
 */
const photos: Reducer<Store.Photos> = (state: Store.Photos = init, action: Actions.PhotosAction) => {
  switch (action.type) {
    case Actions.SET_PHOTOS:
      let setting = action.photos.map((photo) => [photo.uuid, photo])
      return Im.Map<string, PhotoInfo>(setting)
    case Actions.ADD_PHOTO:
      return state.set(action.photo.uuid, action.photo)
    default:
      return state
  }
}

export default photos