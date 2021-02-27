import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ProfileInfo } from '../features/users/ProfileInfo'
import { FacebookLogin } from '../features/users/FacebookLogin'
import { CreateGame } from '../features/match/CreateGame'

export const Navbar = () => {
  const userInfo = useSelector(state => state.users.userInfo)
  const loggedIn = useSelector(state => state.users.loggedIn)
  return (
    <nav>
      <section className="nav-content">
        <h1 className="game">
          <CreateGame></CreateGame>
        </h1>
        <div className="login">
        <FacebookLogin />
          { loggedIn ? null : <FacebookLogin /> }
        </div>
        <div className="user-info">
          
          <ProfileInfo
            picUrl={userInfo.picUrl}
            name={userInfo.name}
            username={userInfo.username}
          />
        </div>
      </section>
    </nav>
  )
}