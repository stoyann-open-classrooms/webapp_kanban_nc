import { useState } from 'react'
import "./Dialog.css"
import close_icone from '../../../Assets/icones/close_icone.svg'
import {FaPlus} from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
function Dialog({ btn, children, addIcone, editIcone }) {
  const [modal, setModal] = useState(true)

  const toogleModal = (e) => {
    setModal(!modal)
  }

  return (
    <>
      <button className="add-btn" onClick={toogleModal}>
        {!addIcone ? <FaPlus/>: ''}
      </button>
      {!modal ? (
        <div className="overlay">
            <ToastContainer/>
          <div className="modal">
            <button
              onKeyUp={toogleModal}
              onClick={toogleModal}
              className="close-Modal"
            >
              <img src={close_icone} alt="fermeture boite de dialogue." />
            </button>
            <div className="dialog_form">{children}</div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default Dialog
