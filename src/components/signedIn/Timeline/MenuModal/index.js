import React, { useEffect } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

import firebase from '../../../../Firebase.js';

const MenuModal = (props) => {
  const { id, toggleMenuModal, redirectOnDelete } = props;
  const fDB = firebase.firestore();
  const fAuth = firebase.auth();

  useEffect(() => {
    document.addEventListener('click', closeModal);
  }, []);
  
  const deleteEntry = () => {
    fDB.collection('users').doc(fAuth.currentUser.uid).collection('entries').doc(id)
    .delete()
    .then((result) => {
      // Unrender menu modal
      closeModal();
      redirectOnDelete();
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
  }

  const closeModal = () => {
    toggleMenuModal(false);
    document.removeEventListener('click', closeModal);
  }

  return (
    <div className='mm-container'>
      <ul className='mm-list'>
        <Link to={`/timeline/view/${id}`}><li className='mm-list-item'>View Entry</li></Link>
        <Link to={`/timeline/edit/${id}`}><li className='mm-list-item'>Edit Entry</li></Link>
        <li onClick={deleteEntry} className='mm-list-item'>Delete Entry</li>  
      </ul>
    </div>
  );
}

export default MenuModal;