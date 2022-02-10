import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Alert from '@material-ui/lab/Alert';
import './Login.css'
import insta from '../Assets/insta.png'
import TextField from '@mui/material/TextField'
import { Link, useHistory } from 'react-router-dom';
import bg from '../Assets/instaimg.png'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import img5 from '../Assets/img5.jpg'
import {useContext,useState} from 'react'
import {AuthContext} from '../Context/AuthContext';

export default function Login() {
    const store = useContext(AuthContext);
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        text2: {
            color: 'purple',
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
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const history = useHistory()
    const {login} = useContext(AuthContext);

    const handleClick = async()=>{
        try{
            setError('');
            setLoading(true)
            let res = await login(email,password);
            setLoading(false);
            history.push('/')
        }catch(err){
            setError(err);
            setTimeout(()=>{
                setError('')
            },2000);
            setLoading(false)
        }
    }
    
    return (

        // 2 divs inside loginwrapper: 
        // 1st for image carousel
        // 2nd for login textfield
        <div className="loginWrapper">
            <div className="imgcar" style={{ backgroundImage: 'url(' + bg + ')', backgroudSize: 'contain' }}>

                <div className="car">
                    {/* carousel for displaying images on login page */}
                    <CarouselProvider
                    visibleSlides={1}
                        naturalSlideWidth={238}
                        naturalSlideHeight={423}
                        totalSlides={5}
                        hasMasterSpinner
                        isPlaying={true}
                        infinite={true}
                        dragEnabled={false}
                        touchEnabled={false}
                        interval={3000}
                        playDirection={'forward'}
                    >
                        <Slider>
                            <Slide index={0}><Image src={img1} /></Slide>
                            <Slide index={1}><Image src={img2} /></Slide>
                            <Slide index={2}><Image src={img3} /></Slide>
                            <Slide index={3}><Image src={img4} /></Slide>
                            <Slide index={4}><Image src={img5} /></Slide>
                        </Slider>
                    </CarouselProvider>

                </div>

            </div>

            {/* 2nd */}
            <div className="cardWrapper">
                <Card variant="outlined">
                    <div className="insta-logo">
                        <img src={insta} alt="insta" />
                    </div>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1" component="div">
                            Login to see photos and videos from your friends
                        </Typography>
                        {error!='' && <Alert severity="error">{error}</Alert>}

                        <TextField type="Email" className="outlined-basic" size="small" label="Email" variant="outlined" style ={{width: '100%'}} margin="dense"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <TextField type="Password" className="outlined-basic" size="small" label="Password" variant="outlined" style ={{width: '100%'}} margin="dense" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                        <Link to='/forgot' style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginBottom: '10px' }} className={classes.text2} variant="subtitle1" >
                            Forgot password?
                        </Link>
                        <Button variant="contained" style ={{width: '100%'}} size="small" disabled={loading} onClick={handleClick}>
                            Login
                        </Button>

                    </CardContent>
                    <CardActions>

                    </CardActions>
                </Card>
                <Card className={classes.card2} variant="outlined">
                    <Typography style ={{width: '100%',display:'flex',justifyContent:'center'}}>
                        Not having an account ? <Link style={{textDecoration:'none'}} to= "/signup">Signup</Link>
                    </Typography>
                </Card>

            </div>



        </div>



    );
}
