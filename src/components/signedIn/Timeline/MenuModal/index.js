import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

import firebase from '../../../../Firebase.js';

const MenuModal = (props) => {
  const { id } = props;
  const fDB = firebase.firestore();
  const fAuth = firebase.auth();
  
  const deleteEntry = () => {
    fDB.collection('users').doc(fAuth.currentUser.uid).collection('entries').doc(id)
    .delete()
    .then((result) => {
      console.log('Entry successfully deleted.');
      // Unrender menu modal
      props.toggleMenuModal(false);
    })
    .catch((error) => {
      console.log(`Error: ${error.message}`);
    });
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