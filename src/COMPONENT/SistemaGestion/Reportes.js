import { Card, CardContent, Grid, Typography, Box} from '@mui/material';
import { typography } from '@mui/system';
import { Component } from 'react';
import * as React from 'react';
import VerButtom from '../AditionalComponents/VerButtom.tsx';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
  } from "@mui/x-data-grid";
import { Producto, Venta } from './Models/Models.tsx';
import { ProductoVendido } from './Models/Models.tsx';
import useEffect

export default function Reportes() {

    const [abrirModal, setAbrirModal] = React.useState(false)
    const [rows, setRows] = React.useState([]) 

    const productos = [
        new Producto(1, 'Snow', 400, 3500, 10),
        new Producto(2, 'Lannister', 400, 4200, 10),
        new Producto(3, 'Lannister', 350, 4500, 10),
        new Producto(4, 'Stark', 200, 1600, 10),
        new Producto(5, 'Targaryen', 100, 1000, 10),
        new Producto(6, 'Melisandre', 250, 15000, 10),
        new Producto(7, 'Clifford', 150, 4400, 10),
        new Producto(8, 'Frances', 120, 3600, 10),
        new Producto(9, 'Roxie', 300, 6500, 10)
    ];

    const ventas = [
        new Venta(1, ""),
        new Venta(2, ""),
        new Venta(3, ""),
        new Venta(4, ""),
    ];

    const productosVendidos = [
        new ProductoVendido(1, 2, 2, 1),
        new ProductoVendido(2, 1, 2, 1),
        new ProductoVendido(3, 1, 2, 2),
        new ProductoVendido(4, 3, 2, 3),
        new ProductoVendido(5, 1, 2, 3),
        new ProductoVendido(6, 1, 2, 3),
        new ProductoVendido(7, 2, 2, 4),
        new ProductoVendido(8, 4, 2, 4),
    ];


    const columns = [
        { field: "id", headerName: "Id", width: 70 },
        { field: "cantProductos", headerName: "Cant. Productos", width: 200 },
        { field: "Total", headerName: "Total", width: 130 },
        {
            field: "Herramientas",
            headerName: "Herramientas",
            width: 130,
            renderCell: () => <VerButtom onClick={onClickVerButton} />,
        },
    ];

    useEffect(() => {
        productosVendidos.forEach(prod => {
            
        });
    },[])
    function onClickVerButton() {
        setAbrirModal(true)
    }


    return (
        <>
            <h2>Reportes</h2>
            <Grid margin={2}>
                <Card>
                    <CardContent>
                        <Typography textAlign={'left'} variant='h5'>Reporte de Ventas</Typography><br />
                        <Box py={4}>
                            <div style={{ height: 400, width: "100%" }}>
                                <DataGrid
                                    hideFooterSelectedRowCount
                                    showCellRightBorder
                                    columns={columns}
                                    components={{
                                        Toolbar: CustomToolbar,
                                    }}
                                    pageSize={5}
                                    rows={productos}
                                    rowsPerPageOptions={[5]}
                                />
                            </div>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

        </>
    );
}

const CustomToolbar = () => {
    return (
        <>
            <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </GridToolbarContainer>
        </>
    );
};