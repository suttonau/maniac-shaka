import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'

export default function handleMovement (player) {
  function getNewPoisition (direction) {
    const oldPos = store.getState().player.position
    switch (direction) {
      case 'WEST':
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]]
      case 'EAST':
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]]
      case 'NORTH':
        return [oldPos[0], oldPos[1] - SPRITE_SIZE]
      case 'SOUTH':
        return [oldPos[0], oldPos[1] + SPRITE_SIZE]
    }
  }

  function observeBoundaries (oldPos, newPos) {
    return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
    (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
      ? newPos : oldPos
  }

  function dispatchMove (direction) {
    const oldPos = store.getState().player.position
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: observeBoundaries(oldPos, getNewPoisition(direction))
      }
    })
  }

  function handleKeyDown (e) {
    switch (e.keyCode) {
      case 37:
        return dispatchMove('WEST')

      case 38:
        return dispatchMove('NORTH')

      case 39:
        return dispatchMove('EAST')

      case 40:
        return dispatchMove('SOUTH')
      default:
        console.log(e.keyCode)
    }
  }

  window.addEventListener('keydown', (e) => {
    handleKeyDown(e)
  })

  return player
}
