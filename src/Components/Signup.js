import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import {useState,useContext} from 'react';
import Alert from '@material-ui/lab/Alert';
import './Signup.css'
import insta from '../Assets/insta.png'
import TextField from '@mui/material/TextField'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Link,useHistory } from 'react-router-dom';
import {AuthContext} from '../Context/AuthContext';
import {database,storage} from '../firebase.js';

export default function Signup() {
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        card2: {
            marginTop: '4%',
            height: '5vh',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center'
        }
    })
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [file,setFile] = useState(null);
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useHistory();
    const {signup} = useContext(AuthContext);

    const handleClick = async() => {
        if(file == null){
            setError('Please upload profile image first!');
            setTimeout(()=>{
                setError('')
            },2000);
            return;
        }
        try{
            setError('');
            setLoading(true);
            let userObj = await signup(email,password);
            let uid = userObj.user.uid;
            console.log(uid);
            const uploadTask = storage.ref( `/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                let prog = (snapshot.bytesTransferred*100)/snapshot.totalBytes
                console.log(`upload is ${prog} done.`);

            }
            function fn2(error){
                setError(error);
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false);
                return;
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);
                  database.users.doc(uid).set({
                      email:email,
                      userId:uid,
                      fullname:name,
                      profileUrl:url,
                      createdAt:database.getTimeStamp()
                  })  
                })
                setLoading(false);
                history.push('/');
            }
        }catch(err){
            setError(err);
            setTimeout(()=>{
                setError('')
            },2000);
            return;
        }
    }

    return (
        <div className="signupWrapper">
            <div className="cardWrapper">
                <Card variant="outlined">
                    <div className="insta-logo">
                        <img src={insta} alt="insta" />
                    </div>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1" component="div">
                            Sign up to see photos and videos from your friends
                        </Typography>
                        {error!='' && <Alert severity="error">{error}</Alert>}

                        <TextField type="Email" className="outlined-basic" size="small" label="Email" variant="outlined" style ={{width: '100%'}} margin="dense" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <TextField type="Password" className="outlined-basic" size="small" label="Password" variant="outlined" style ={{width: '100%'}} margin="dense" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <TextField type="text" className="outlined-basic" size="small" label="Full Name" variant="outlined" style ={{width: '100%'}} margin="dense" value={name} onChange={(e)=>setName(e.target.value)}/>

                        <Button margin="dense" startIcon={<CloudUploadIcon />} style ={{width: '100%'}} variant="outlined" color="secondary" component="label" size="small">Upload Profile Image
                            <input accept='image/*' type="file" hidden onChange={(e)=>setFile(e.target.files[0])} />
                        </Button>

                    </CardContent>
                    <CardActions>
                        <Button variant="contained" style ={{width: '100%'}} size="small" disabled={loading} onClick={handleClick}>
                            Signup
                        </Button>
                    </CardActions>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            By clicking Signup, you agree to our terms, conditions & Cookies policy.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card2} variant="outlined">
                    <Typography style ={{width: '100%'}}>
                        Already having an account ? <Link style={{textDecoration:'none'}} to= "/login">Login</Link>
                    </Typography>
                </Card>
            </div>
        </div>
    );
}
