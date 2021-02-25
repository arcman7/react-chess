import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Simple Chess Game</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/stats">Stats</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
