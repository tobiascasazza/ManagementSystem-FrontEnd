import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function ListItems(props) {

  return (
    <>
    <React.Fragment>
      <ListItemButton onClick={() => {props.SetOpcion(0)}}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>
      <ListItemButton onClick={() => {props.SetOpcion(1)}}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Productos" />
      </ListItemButton>
      <ListItemButton onClick={() => {props.SetOpcion(2)}}>
        <ListItemIcon>
          <PointOfSaleIcon />
        </ListItemIcon>
        <ListItemText primary="Ventas" />
      </ListItemButton>
      <ListItemButton onClick={() => {props.SetOpcion(3)}}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reportes" />
      </ListItemButton>
      <ListItemButton onClick={() => {props.SetOpcion(4)}}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuario" />
      </ListItemButton>
    </React.Fragment>
    </>
  );
}

