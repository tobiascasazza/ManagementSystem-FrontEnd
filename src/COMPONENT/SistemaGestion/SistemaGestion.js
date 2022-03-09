import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItems from './listItems';
import Inicio from './Inicio';
import Productos from './Productos';
import Ventas from './Ventas';
import Reportes from './Reportes';
import DatosUsuario from './DatosUsuario';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router';
import logocoder from '../../Imagenes/logocoder.png';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { getUsuarioNombre } from '../redux/actions/UsuarioAction';
import { getNombre} from "../redux/actions/NombreAction"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const mdTheme = createTheme();




export default function SistemaGestion(props) {
  

  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuarioReducer?.usuario)
  const nombrePrograma = useSelector((state) => state.nombreReducer?.nombre)
 
  const [opcion, setOpcion] = React.useState(0)
  const [pagina, setPagina] = React.useState(<Inicio/>)
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  const location = useLocation();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  

  useEffect(() => {
    console.log(usuario)
    
}, [usuario]);

useEffect(() => {
      dispatch(getUsuarioNombre(location.pathname.substring(location.pathname.search("Home") + 5)))
      dispatch(getNombre())
  }, []);

  React.useEffect(()=>{
    switch(opcion){
      case 0:
        setPagina(<Inicio setOpcion={setOpcion} nombre={usuario.nombre} apellido={usuario.apellido} />)
        break;
      case 1:
        setPagina(<Productos idUsuario={usuario.id} />)
        break;
      case 2:
        setPagina(<Ventas/>)
        break;
      case 3:
        setPagina(<Reportes/>)
        break;
      case 4:
        setPagina(<DatosUsuario/>)
        break;
    }
  },[opcion])

  function OnClickLogOut(){
    history.push("../InicioSesion/InicioSesion")
  }
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {nombrePrograma}
            </Typography>
            <IconButton color="inherit" onClick={OnClickLogOut}>
              <LogoutIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Typography fontFamily={'fantasy'} align='left'>By</Typography >
            <img src={logocoder} alt='logoCoder' width="60%" height="60%" ></img>
 
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItems Opcion={opcion} SetOpcion={setOpcion}/>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >

          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {pagina}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}