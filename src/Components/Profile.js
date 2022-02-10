import { CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../firebase'
import Navbar from './Navbar'
import './Profile.css'
import Video from './Video';
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import Like2 from './Like2';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import AddComment from './AddComment';
import Comments from './Comments';


function Profile() {
    const { id } = useParams()
    const [userData, setUserData] = useState(null)
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        database.users.doc(id).onSnapshot((snap) => {
            setUserData(snap.data())
        })
    }, [id])

    useEffect(async () => {
        if (userData != null) {
            let parr = []
            for (let i = 0; i < userData.postIds.length; i++) {
                let postData = await database.posts.doc(userData.postIds[i]).get()
                parr.push({...postData.data(),postId:postData.id})
            }
            setPosts(parr)
        }
    })
    const [open, setOpen] = useState(null);
    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    return (
        <div>
            {
                posts == null || userData == null ? <CircularProgress color='secondary' /> :
                    <div>
                        <Navbar userData={userData} />
                        <div className="spacer"></div>
                        <div className="container">
                            <div className="upper-part">
                                <div className="profile-img">
                                    <img src={userData.profileUrl} alt="" />
                                </div>
                                <div className="info">
                                    <Typography variant="h5">
                                        Email : {userData.email}
                                    </Typography>
                                    <Typography variant="h6">
                                        Posts : {userData.postIds.length}
                                    </Typography>
                                </div>
                            </div>
                            <hr style={{ margin: '2rem 0' }} />
                            <div className="profile-videos">
                                <div className="profile-video-container">
                                    {
                                        posts.map((post, index) => (
                                            <React.Fragment key={index}>
                                                <div className="videos">
                                                    <div className="video-modal">
                                                        <video muted='muted' onClick={() => handleClickOpen(post.pId)}>
                                                            <source src={post.pUrl} />
                                                        </video>
                                                        <Dialog
                                                            open={open == post.pId}
                                                            onClose={handleClose}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                            fullWidth={true}
                                                            maxWidth='md'
                                                        >

                                                            <div className="modal">
                                                                <div className="video-modal">
                                                                    <video autoPlay={true} muted='muted' controls>
                                                                        <source src={post.pUrl} />
                                                                    </video>
                                                                </div>
                                                                <div className="comment-modal">
                                                                    <Card className='card1'>
                                                                        <Comments postData={post} />

                                                                    </Card>
                                                                    {/* 2nd card */}
                                                                    <Card variant='outlined' className='card2'>

                                                                        <Typography style={{ padding: '0.5rem' }}>
                                                                            {post.likes.length == 0 ? 'Waiting for Likes' : `Liked by ${post.likes.length} people`}
                                                                        </Typography>
                                                                        <div style={{ display: 'flex' }}>
                                                                            <Like2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} postData={post} userData={userData} />
                                                                            <AddComment userData={userData} postData={post} />
                                                                        </div>
                                                                    </Card>
                                                                </div>
                                                            </div>

                                                        </Dialog>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }


        </div>
    )
}

export default Profile