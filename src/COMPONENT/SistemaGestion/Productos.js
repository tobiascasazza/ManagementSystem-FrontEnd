import * as React from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateIcon from '@mui/icons-material/Create';
import { Button, TextField, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Modal, Box } from '@mui/material';
import { useState, useEffect } from 'react'
import { Producto } from './Models/Models.tsx';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'descripcion', headerName: 'Descripcion', width: 130 },
    { field: 'costo', headerName: 'Costo', width: 130, type: 'number', },
    {
        field: 'precioVenta',
        headerName: 'Precio Venta',
        type: 'number',
        width: 130,
    },
    {
        field: 'stock',
        headerName: 'Stock',
        type: 'number',
        width: 130
    }
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px #000',
    boxShadow: 13,
    borderRadius: 5,
    pt: 2,
    px: 3,
    pb: 10,

};

const rows = [
    { id: 1, descripcion: 'Snow', costo: 400, precioVenta: 3500, stock: 10 },
    { id: 2, descripcion: 'Lannister', costo: 400, precioVenta: 4200, stock: 10 },
    { id: 3, descripcion: 'Lannister', costo: 350, precioVenta: 4500, stock: 10 },
    { id: 4, descripcion: 'Stark', costo: 200, precioVenta: 1600, stock: 10 },
    { id: 5, descripcion: 'Targaryen', costo: 100, precioVenta: 1000, stock: 10 },
    { id: 6, descripcion: 'Melisandre', costo: 250, precioVenta: 15000, stock: 10 },
    { id: 7, descripcion: 'Clifford', costo: 150, precioVenta: 4400, stock: 10 },
    { id: 8, descripcion: 'Frances', costo: 120, precioVenta: 3600, stock: 10 },
    { id: 9, descripcion: 'Roxie', costo: 300, precioVenta: 6500, stock: 10 },
];
function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}


export default function Productos() {
    const [rowClicked, setRowClicked] = useState(new Producto());
    const [openCrear, setOpenCrear] = useState(false);
    const [openModificar, setOpenModificar] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);

    const onRowClick = (e) => {
        setRowClicked(new Producto(e.row.id, e.row.descripcion, e.row.costo, e.row.precioVenta, e.row.stock))
    }
    const modalCrearOpen = () => {
        setOpenCrear(true);
    };
    const modalCrearClose = () => {
        setOpenCrear(false);
    };

    const modalModificarOpen = () => {
        setOpenModificar(true);
    };
    const modalModificarClose = () => {
        setOpenModificar(false);
    };
    const modalEliminarOpen = () => {
        setOpenEliminar(true);
    };
    const modalEliminarClose = () => {
        setOpenEliminar(false);
    };

    const onChangeProducto = (e) => {
        const { name, value } = e.target;
        setRowClicked({...Producto, [name]: value})
    };

    return (
        <>
            <h2>Lista de Productos</h2>
            <div style={{ height: 400, width: '100%' }}>
                <Grid container direction="row" justifyContent="flex-end">
                    <Grid margin='10px'><Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={modalCrearOpen}>Crear</Button></Grid>
                    <Grid margin='10px'><Button variant="contained" startIcon={<CreateIcon />} disabled={rowClicked.id == undefined} onClick={modalModificarOpen} >Modificar</Button></Grid>
                    <Grid margin='10px'><Button variant="contained" startIcon={<DeleteForeverIcon />} disabled={rowClicked.id == undefined} onClick={modalEliminarOpen}>Eliminar</Button></Grid>
                </Grid>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                    onRowClick={onRowClick}
                >
                </DataGrid>
            </div>

            
            <Modal
                open={openCrear}
                onClose={modalCrearClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 520 }}>
                    <h2 id="parent-modal-title">Crear Producto</h2>
                    <h4>Nombre del producto</h4>
                    <Grid container direction="row" justifyContent="space-between" >

                        <Grid item marginBottom={2}>
                            <TextField
                                id="outlined-basic"
                                label="Descripcion"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>

                    <h4>Precios</h4>
                    <Grid container direction="row" justifyContent="space-between" >
                        <Grid item marginBottom={2}>
                            <TextField type="number"
                                id="outlined-basic"
                                label="Costo"
                                variant="outlined"
                                defaultValue={0}
                                InputLabelProps={{ shrink: true }}

                            />
                        </Grid>

                        <Grid item marginBottom={2}>
                            <TextField
                                type="number"
                                id="outlined-basic"
                                label="Precio de Venta"
                                variant="outlined"
                                defaultValue={0}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                    <h4>Stock</h4>
                    <Grid item marginBottom={2}>
                        <TextField type="number"
                            id="outlined-basic"
                            label="Stock"
                            variant="outlined"
                            defaultValue={0}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Button variant="contained">Crear</Button>
                </Box>
            </Modal>

            <Modal
                open={openModificar}
                onClose={modalModificarClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 520 }}>
                    <h2 id="parent-modal-title">Modificar Producto</h2>
                    <h4>Nombre del producto</h4>
                    <Grid container direction="row" justifyContent="space-between" >

                        <Grid item marginBottom={2}>
                            <TextField
                                id="outlined-basic"
                                name="descripcion"
                                label="Descripcion"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={rowClicked.descripcion}
                                onChange={onChangeProducto}
                            />
                        </Grid>
                    </Grid>

                    <h4>Precios</h4>
                    <Grid container direction="row" justifyContent="space-between" >
                        <Grid item marginBottom={2}>
                            <TextField type="number"
                                id="outlined-basic"
                                label="Costo"
                                name="costo"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={rowClicked.costo}
                                onChange={onChangeProducto}
                            />
                        </Grid>

                        <Grid item marginBottom={2}>
                            <TextField
                                type="number"
                                id="outlined-basic"
                                label="Precio de Venta"
                                name="precioVenta"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                defaultValue={rowClicked.precioVenta}
                                onChange={onChangeProducto}
                            />
                        </Grid>
                    </Grid>
                    <h4>Stock</h4>
                    <Grid item marginBottom={2}>
                        <TextField type="number"
                            id="outlined-basic"
                            label="Stock"
                            name="stock"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            value={rowClicked.stock}
                            onChange={onChangeProducto}
                        />
                    </Grid>
                    <Button variant="contained">Modificar</Button>
                </Box>
            </Modal>
            <Modal
                open={openEliminar}
                onClose={modalEliminarClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 520 }}>
                    <h4>¿Seguro que quiere eliminar el siguiente producto?</h4>
                        <Grid xl={12} 
                         boxShadow='0px 0px 30px 0px #757575'
                            justifyContent="center"
                            alignItems="center"
                            borderColor="grey">
                        <Typography align='center'><b>Id:</b> {rowClicked.id}</Typography>
                        <Typography align='center'><b>Descripcion:</b> {rowClicked.descripcion} </Typography>
                        <Typography align='center'><b>Costo:</b> {rowClicked.costo} </Typography>
                        <Typography align='center'><b>Precio de Venta:</b> {rowClicked.precioVenta} </Typography>
                        <Typography align='center'><b>Stock:</b> {rowClicked.stock} </Typography>
                        </Grid>
                    <Grid textAlign={'center'} marginTop='5%'><Button variant="contained" >Eliminar</Button></Grid>
                    
                </Box>
            </Modal>
        </>

    );
}