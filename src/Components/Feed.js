import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { database } from '../firebase';
import Posts from './Posts';
import UploadFile from './UploadFile.js';
import Navbar from './Navbar.js'

function Feed() {
  const { user,logout } = useContext(AuthContext)
  const [userData,setUserData] = useState('')
  useEffect(()=>{
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
      setUserData(snapshot.data())
    })
    return ()=> {unsub()}
  },[user])
  return (
    <><Navbar userData={userData}/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div style={{ width: '50%' }}>
        
      </div>
      <UploadFile user={userData}/>
      <Posts userData={userData}/>
    </div>
    </>
  );
}

export default Feed;
;