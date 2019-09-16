import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import walkSprite from './player-walk.png'
import handleMovement from './movement'

function Player (props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url(${walkSprite})`,
        backgroundPosition: '12.5% 5%',
        width: '70px',
        height: '70px'
      }}
    />
  )
}

// Player.propTypes = {
//   top: PropTypes.number,
//   left: PropTypes.number
// }

function mapStateToProps (state) {
  return {
    ...state.player
  }
}

export default connect(mapStateToProps)(handleMovement(Player))
