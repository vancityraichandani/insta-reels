import React, { useEffect, useState } from 'react';
import './Posts.css';
import { database } from '../firebase';
import FavoriteIcon from '@mui/icons-material/Favorite';
function Like2({ userData, postData }) {
  const [like, setLike] = useState(null)
  useEffect(() => {
    let check = postData.likes.includes(userData.userId) ? true : false
    setLike(check)
  }, [postData])
  const handleLike = () => {
    console.log("hi");
    if (like == true) {
      let narr = postData.likes.filter((e) =>
        e != userData.userId
      )
      database.posts.doc(postData.postId).update({
        likes: narr
      })
      // setLike(false);
    } else {
      let narr = [...postData.likes, userData.userId]
      database.posts.doc(postData.postId).update({
        likes: narr
      })
      // setLike(true);

    }
  }
  return (
    <div>
      {
        like != null ?
          <>
            {
              like == true ? <FavoriteIcon style={{padding:'1rem',paddingTop:'0.5rem'}} onClick={handleLike} className={`like`} /> : <FavoriteIcon style={{padding:'1rem',paddingTop:'0.5rem'}} onClick={handleLike} className={`unlike2`} />
            }
          </> :
          <>
            {/* <FavoriteIcon className={`icon-styling`} /> */}
          </>
      }
    </div>
  );
}

export default Like2;
