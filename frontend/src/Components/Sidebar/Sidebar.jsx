import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

// imports des icones

import burger_icone from '../../Assets/icones/burger_icone.svg'
import request_icone from '../../Assets/icones/red/demande_red.svg'
import order_icone from '../../Assets/icones/red/commande_red.svg'
import home_icone from '../../Assets/icones/red/home_red.svg'
import close_icone from '../../Assets/icones/close_icone.svg'
import product_icone from '../../Assets/icones/red/produit_red.svg'
import kanban_icone from '../../Assets/icones/red/kanban_red.svg'
import './Styles/Sidebar.css'
export default function Sidebar() {
  const [checkWidth, setCheckWidth] = useState(window.innerWidth)

  const checkWidthFunc = () => {
    setCheckWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', checkWidthFunc)

    return () => {
      window.removeEventListener('resize', checkWidthFunc)
    }
  }, [])

  const [toggleNAv, setToggleNav] = useState(false)
  const toggleNavFunc = () => {
    setToggleNav(!toggleNAv)
  }
  return (
    <>
      {checkWidth < 900 && (
        <button onClick={toggleNavFunc} className="button toggle-nav-btn">
          {' '}
          <img src={toggleNAv ? close_icone : burger_icone} alt="menu icone" />
        </button>
      )}
      <nav
        className={
          toggleNAv ? 'container-sidebar visible-nav' : 'container-sidebar'
        }
      >
        <aside className="sidebar">
          <ul>
            <NavLink to={'/'}>
              <li>
                <img src={home_icone} alt="" />
              </li>
            </NavLink>

            <NavLink to={'/requests'}>
              <li>
                <img src={request_icone} alt="" />
              </li>
            </NavLink>
            <NavLink to={'/orders'}>
              <li>
                <img src={order_icone} alt="" />
              </li>
            </NavLink>
            <NavLink to={'/kanbans'}>
              <li>
                <img src={kanban_icone} alt="" />
              </li>
            </NavLink>

            <NavLink to={'/products'}>
              <li>
                <img src={product_icone} alt="" />
              </li>
            </NavLink>
          </ul>
        </aside>
      </nav>
    </>
  )
}
