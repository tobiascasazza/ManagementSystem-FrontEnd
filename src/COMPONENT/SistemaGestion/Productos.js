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
import { Button, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Modal, Box } from '@mui/material';
import { margin } from '@mui/system';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Descripcion', headerName: 'Descripcion', width: 130 },
    { field: 'Costo', headerName: 'Costo', width: 130, type: 'number', },
    {
        field: 'PrecioVenta',
        headerName: 'Precio Venta',
        type: 'number',
        width: 130,
    },
    {
        field: 'Stock',
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
    { id: 1, Descripcion: 'Snow', Costo: 400, PrecioVenta: 3500, Stock: 10 },
    { id: 2, Descripcion: 'Lannister', Costo: 400, PrecioVenta: 4200, Stock: 10 },
    { id: 3, Descripcion: 'Lannister', Costo: 350, PrecioVenta: 4500, Stock: 10 },
    { id: 4, Descripcion: 'Stark', Costo: 200, PrecioVenta: 1600, Stock: 10 },
    { id: 5, Descripcion: 'Targaryen', Costo: 100, PrecioVenta: 1000, Stock: 10 },
    { id: 6, Descripcion: 'Melisandre', Costo: 250, PrecioVenta: 15000, Stock: 10 },
    { id: 7, Descripcion: 'Clifford', Costo: 150, PrecioVenta: 4400, Stock: 10 },
    { id: 8, Descripcion: 'Frances', Costo: 120, PrecioVenta: 3600, Stock: 10 },
    { id: 9, Descripcion: 'Roxie', Costo: 300, PrecioVenta: 6500, Stock: 10 },
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


export default function Producto() {
    const [rowClicked, setRowClicked] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const onRowClick = (e) => {
        setRowClicked(e.id)
    }
    const modalCrearOpen = () => {
        setOpen(true);
    };
    const modalCrearClose = () => {
        setOpen(false);
    };


    return (
        <>
            <h2>Lista de Productos</h2>
            <div style={{ height: 400, width: '100%' }}>
                <Grid container direction="row" justifyContent="flex-end">
                    <Grid margin='10px'><Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={modalCrearOpen}>Crear</Button></Grid>
                    <Grid margin='10px'><Button variant="contained" startIcon={<CreateIcon />} disabled={rowClicked == 0}>Modificar</Button></Grid>
                    <Grid margin='10px'><Button variant="contained" startIcon={<DeleteForeverIcon />} disabled={rowClicked == 0}>Eliminar</Button></Grid>
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
                open={open}
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
        </>

    );
}