/**
 * Controller Map
 */
import * as React from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import c from 'classnames'
import Store from '../interfaces/store'
import storeUtil from '../helpers/store_util'
import GoogleMap from 'google-map-react'
import Marker from '../components/marker'
import { Location } from '../interfaces/app'

const { apiKey } = require('../../config')
const cssVars = require('../../scss/vars.json')
const debug = require('debug')('hec:ControllerMap')

interface Props {
  storeState: Store.State
  dispatch: any
}

class ControllerMap extends React.Component<Props, any> {
  render () {
    const s = this
    let { map } = s.props.storeState
    let mapHeight = window.innerHeight - parseInt(cssVars['header-height'], 10)
    return (
      <div className='controller-map' id='controller-map' style={{height: `${mapHeight}px`}}>
        <GoogleMap center={map.center}
                   options={s.createMapOptions}
                   defaultZoom={17}
                   bootstrapURLKeys={{key: apiKey}}
                   onChildClick={s.onMarkerClick}
                   onChange={s.changeCenter}
                   >
          {s.renderMarkers()}
        </GoogleMap>
      </div>
    )
  }

  /**
   * Google Map のオプション。ここでスタイルを設定する。
   */
  createMapOptions () {
    return {
      styles: [
        {
          featureType: 'all',
          stylers: [
            { saturation: 40 }
          ]
        }, {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            { visibility: 'off' }
          ]
        }
      ]
    }
  }

  changeCenter ({ center }: { center: Location }) {
    const s = this
    s.props.dispatch(actions.map.changeMapCenter(center))
  }

  renderMarkers () {
    const s = this
    let {markers, selectedMarker} = s.props.storeState
    return markers.map((marker) =>
      <Marker   key={marker.id}
                {...marker.location}
                markerName={marker.name}
                type={marker.type}
                selected={selectedMarker.id === marker.id}
                />
    )
  }

  onMarkerClick (id) {
    let { dispatch } = this.props
    dispatch(actions.selectedMarker.selectMarker(id))
  }
}

export default connect(
  (storeState: Store.State) => ({ storeState }),
  (dispatch) => ({ dispatch })
)(ControllerMap)
