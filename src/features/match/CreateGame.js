import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AndelaDropDown } from './AndelaDropDown'
import { LRDropDown } from './LRDropDown'

const GAME_MODES = [
  'count-down',
  'timed',
  'timed-per-turn',
  'no time-limit'
]

const OPPONENT_MODES = [
  'Challenge a friend',
  'Wait for someone',
]

export const CreateGame = () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  }
  // const gameModes = GAME_MODES.map((mode, ind) => (
  //   <option key={mode} value={ind}>
  //       {mode}
  //   </option>
  // ))
  // const opponentModes = OPPONENT_MODES.map((mode, ind) => (
  //   <option key={mode} value={ind}>
  //     {mode}
  //   </option>
  // ))
  const [gameMode, setGameMode] = useState(GAME_MODES[0])
  const [opponent, setOpponent] = useState(OPPONENT_MODES[0])

  return (
    <div className='create-game'>
      <h2>Create A Game:</h2>
      {/* <AndelaDropDown listItems={GAME_MODES}/>
      <AndelaDropDown listItems={OPPONENT_MODES}/> */}
      <LRDropDown
        listItems={GAME_MODES}
        title={'Game Mode'}
        selectCB={setGameMode}
      />
      <LRDropDown
        listItems={OPPONENT_MODES}
        title={'Opponent'}
        selectCB={setOpponent}
      />
    </div>
  )

  // return (
  //   <div className='create-game'>
  //     <h2>Create A Game:</h2>
  //     <form style={style}>
  //       <label htmlFor="mode">Game mode:</label>
  //       <select
  //         id="mode"
  //         name="mode"
  //         value="Countdown"
  //         >
  //         {gameModes}
  //       </select>
  //       <label htmlFor="opponent">Who's gonna play?</label>
  //       <select
  //         id="opponent"
  //         name="opponent"
  //         value="Wait for player"
  //         >
  //         {opponentModes}
  //       </select>

  //       <button type="button">Create Match!</button>
  //     </form>
  //   </div>
  // )
}