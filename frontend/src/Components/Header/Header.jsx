import React, { useEffect, useState } from 'react'
import './styles/Header.css'
import { Link } from 'react-router-dom'


export default function Header() {
  const [time, setTime] = useState()

  useEffect(() => {
    setInterval(() => {
      const timer = new Date()
      setTime(timer.toLocaleTimeString())
    }, 1000)
  }, [])

  return (
    <>
      <header>
        <div className="stats">
          <div className="time">
            <h3>{time}</h3>
          </div>
          <div className="title">
            <Link to={'/'}>
              <h1>SFAC dashboard</h1>
            </Link>
          </div>
          <Link to={'/requests'}>
            <div className="notif">
              <p>demande à traiter</p>
              <p>0</p>
            </div>
          </Link>
        </div>
      </header>
    </>
  )
}
