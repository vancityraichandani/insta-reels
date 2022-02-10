import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import MovieIcon from '@material-ui/icons/Movie';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import { database } from '../firebase';
import { storage } from '../firebase';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function UploadFile(props) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChange = async (file) => {
        if (file == null) {
            setError('Please select a file first');
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }
        if (file.size / (1024 * 1024) > 100) {
            setError('This video is very big');
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }

        let uid = uuidv4();
        setLoading(true);
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on('state_changed', fn1, fn2, fn3);
        function fn1(snapshot) {
            let prog = (snapshot.bytesTransferred * 100) / snapshot.totalBytes
            console.log(`upload is ${prog} done.`);

        }
        function fn2(error) {
            setError(error);
            setTimeout(() => {
                setError('')
            }, 2000);
            setLoading(false);
            return;
        }
        function fn3() {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log(url);
                let obj = {
                    likes: [],
                    comments: [],
                    pId: uid,
                    pUrl: url,
                    uName: props.user.fullname,
                    uProfile: props.user.profileUrl,
                    userId: props.user.userId,
                    createdAt: database.getTimeStamp()
                }
                database.posts.add(obj).then(async(ref)=>{
                    let res = await database.users.doc(props.user.userId).update({
                        postIds : props.user.postIds!=null? [...props.user.postIds,ref.id] : [ref.id]
                    }).then(()=>{
                        setLoading(false);
                    }).catch((err)=>{
                        setError(err);
                        setLoading(false);
                        setTimeout(()=>{
                            setError('')
                        },2000)
                    })
                })
            })
        }
    }

    return (
        <div style={{margin:'5rem 0 1rem'}}>
            {
                error != '' ? <Alert severity="error">{error}</Alert>
                    :
                    <>
                        <input onChange={(e) => handleChange(e.target.files[0])} type="file" id='upload-input' style={{ display: 'none' }} accept='video/*' />
                        <label htmlFor="upload-input">
                            <Button
                                variant="outlined"
                                color="secondary"
                                disabled={loading}
                                component='span'
                            > <MovieIcon />&nbsp;
                                Upload Video
                            </Button>
                        </label>
                        {loading && <LinearProgress color='secondary' style={{ marginTop: '3%' }} />}
                    </>
            }
        </div>
    );
}

export default UploadFile;
