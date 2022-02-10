import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from './Video';
import './Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import Like2 from './Like2';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddComment from './AddComment';
import Comments from './Comments';
function Posts({ userData }) {
    const [posts, setPosts] = useState(null);
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            parr = [];
            querySnapshot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data)
            })
            setPosts(parr)
        })
        return unsub
    }, [])
    const callback = (entries) => {
        entries.forEach((entry)=>{
            let ele = entry.target.childNodes[0]
            ele.play().then(()=>{
                if(!ele.paused && !entry.isIntersecting){
                    ele.pause()
                }
            })
        })
    }
    let observer = new IntersectionObserver(callback,{threshold:0.6});
    useEffect(()=>{
        const elements = document.querySelectorAll('.videos')
        elements.forEach((element)=>{
            observer.observe(element);
        })
        return()=>{
            observer.disconnect();
        }
    },[posts])
    return (
        <div>
            {
                posts == null || userData == null ? <CircularProgress style={{ marginTop: '90%' }} color='secondary' /> :
                    <div className="video-container">
                        {
                            posts.map((post, index) => (
                                <React.Fragment key={index}>
                                    <div className="videos">
                                        <Video src={post.pUrl} />
                                        <div className="ava" style={{ display: 'flex' }}>
                                            <Avatar alt="avatar" src={userData.profileUrl} />
                                            <h4>{userData.fullname}</h4>
                                        </div>
                                        <Like userData={userData} postData={post} />
                                        <ChatBubbleIcon className='chat-style' onClick={() => handleClickOpen(post.pId)} />
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
                                                        <Comments postData={post}/>
                                                        
                                                    </Card>
                                                    {/* 2nd card */}
                                                    <Card variant='outlined' className='card2'>
                                                        
                                                        <Typography style={{padding:'0.5rem'}}>
                                                            {post.likes.length == 0? 'Waiting for Likes':`Liked by ${post.likes.length} people`}
                                                        </Typography>
                                                        <div style={{display:'flex'}}>
                                                            <Like2 style={{display:'flex',alignItems:'center',justifyContent:'center'}} postData={post} userData={userData}/>
                                                            <AddComment userData={userData} postData={post}/>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>

                                        </Dialog>
                                    </div>
                                </React.Fragment>
                            ))
                        }
                    </div>
            }
        </div>

    );
}

export default Posts;
