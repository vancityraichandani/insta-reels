import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import {makeStyles} from '@mui/styles'
import insta from '../Assets/insta.png'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import { Avatar } from '@mui/material';







const useStyles = makeStyles({
    appb:{
        background:  'white'
    }
})

export default function Navbar({userData}) {

    

const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory();
  const {logout} = React.useContext(AuthContext)
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    history.push(`/profile/${userData.userId}`)
  }

  const handleLogout = async() => {
    await logout()
    history.push('/login')
  }

  const handleBannerClick = () => {
    history.push('/')
  }

  const handleExplore = () => {
    let win = window.open('https://github.com/vancityraichandani','_blank')
    win.focus()
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}><AccountCircleIcon />&nbsp;&nbsp;Profile</MenuItem>
      <MenuItem onClick={handleLogout}><LogoutIcon />&nbsp;&nbsp;Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem onClick={handleProfile}><AccountCircleIcon />&nbsp;&nbsp;Profile</MenuItem>
      <MenuItem onClick={handleLogout}><LogoutIcon />&nbsp;&nbsp;Logout</MenuItem>
       
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{background:'#fff'}} position="fixed">
        <Toolbar>
          <div style={{marginLeft:'3.5%'}}>
              <img style={{width:'15%',cursor:'pointer'}} src={insta} onClick={handleBannerClick} />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' },color:'black',alignItems:'center',marginRight:'4rem' }}>
            <HomeIcon style={{cursor:'pointer'}} onClick={handleBannerClick} sx={{marginRight:'1.5rem'}}/>
            <ExploreIcon style={{cursor:'pointer'}} onClick={handleExplore} sx={{marginRight:'1rem'}}/>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{height:'2rem',width:'2rem'}} src={userData.profileUrl} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
