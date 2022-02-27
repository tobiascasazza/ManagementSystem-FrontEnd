import { Grid, Typography, I, ListItem } from '@mui/material';
import { ThemeProvider, createTheme} from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { color, height, sizeHeight, textAlign, width } from '@mui/system';
import * as React from 'react';

const theme = createTheme() 

const useStyles = makeStyles((theme) => ({
    root:{},
    tipo1:{
        fontFamily: 'fantasy',
        color: 'grey',
        fontSize: '300%',
        textAlign: 'center'
    },
    tipo2:{
        fontFamily:'cursive'
    }
}))

export default function Inicio(){
    const classes = useStyles();
    return(
    <ThemeProvider theme={theme}> 
        <Grid container xl={12} xs={12} 
            className={classes.Grid} 
            boxShadow='0px 0px 30px -15px #757575'
            justifyContent="center"
            alignItems="center"
            >
            <Grid  item xs={12}>
                <Typography className={classes.tipo1} textAlign='end'>HOLA TOBIAS, BIENVENIDO A TU CUENTA</Typography>
            </Grid>

            <Grid conteiner
            container
            direction="row"
            justifyContent="center"
            alignItems="center">
                <Grid item className={classes.Grid2} margin='4px'>
                    <Typography >Utilice las opciones de las derecha para navegar</Typography>
                </Grid>
            </Grid>
        </Grid>
    </ThemeProvider>)
}