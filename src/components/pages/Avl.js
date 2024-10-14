import React,{useState} from 'react';
import AVL from '../AVL_Tree/AVL.js';
import 'react-tabs/style/react-tabs.css';
export default function Avl(){
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
      }
      else {
        document.body.classList.remove('active-modal')
      };
    
    
    return(
        <div className='AVL-page'>
            <div className='left-avl-panel'>
                <button onClick={toggleModal} className="btn-modal">ⓘ
                INSTRUCIONS
                </button>
            </div>
            <div className='avl-right'>
                <AVL/>
            </div>
            {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>AVL Instructions</h2><br/>
           
            
            <p>To add a new node to the AVL tree, input an integer in the add field then press the add button.</p><br/>

            
            <p>
              To remove a node, input that node's number into the remove field and press the remove button.
            </p><br/>

            
            <p>To search for a particular node in the AVL tree, input that node's number into the find field then press the find button.
            </p><br/>

            
            <p>
              To traverse the AVL tree, chose one of the following traversal methods presented here.
            </p><br/>

            <p>
              The traversal path will then be displayed in this area.
            </p><br/>

            <button className="close-modal" onClick={toggleModal}>
              x
            </button>
          </div>
        </div>
      )}
        </div>
    )
}