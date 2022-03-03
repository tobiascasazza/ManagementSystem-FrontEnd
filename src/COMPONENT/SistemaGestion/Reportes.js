import { Card, CardContent, Grid, Typography, Box, TextField, Button} from '@mui/material';
import { typography } from '@mui/system';
import { Component } from 'react';
import * as React from 'react';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerButtom from '../AditionalComponents/VerButtom.tsx';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
  } from "@mui/x-data-grid";
import { Producto, Venta } from './Models/Models.tsx';
import { ProductoVendido } from './Models/Models.tsx';
import { useEffect } from 'react';

export default function Reportes() {

    const [abrirModal, setAbrirModal] = React.useState(false)
    const [rowsInicial, setRowsInicial] = React.useState([{id: 0, cantProductos: 0, TotalFacturado: 0}]) 
    const [rowsModal, setRowsModal] = React.useState([]) 
    const [rowClicked, setRowClicked] = React.useState([]);

    const onRowClick = (e) => {
        setRowClicked([e.row.id, e.row.cantProductos, e.row.TotalFacturado])
    }

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
        { field: "id", headerName: "Id Venta", width: 130 },
        { field: "cantProductos", headerName: "Cant. Productos Vendidos", width: 200 },
        { field: "TotalFacturado", headerName: "Total Facturado", width: 130 },
    ];

    useEffect(() => {
        let rowsActualizados = [];
        ventas.forEach(venta => {
            let row = {id: venta.id, cantProductos: 0, TotalFacturado: 0};
            let productos = [];
            let cuentaFacturado = 0;
            let cuentaProductos = 0;

            row.id = venta.id
            productos = GetProductosPorVenta(venta.id);
            row.cantProductos = productos.length;

            productos.forEach(producto => {
                cuentaProductos = cuentaProductos + producto[1]; 
            })
            row.cantProductos = cuentaProductos;

            productos.forEach(producto => {
                cuentaFacturado = cuentaFacturado + (producto[0].precioVenta * producto[1]); 
            })
            row.TotalFacturado = cuentaFacturado;

           rowsActualizados.push(row)

        });
        console.log(rowsActualizados)
        setRowsInicial(rowsActualizados)
        
    },[])


    function GetProductosPorVenta(num){
        let productosPorVenta = [];
        
        productosVendidos.forEach(prod => {
            if(prod.idVenta == num){
                let stockVendido = prod.stock;
                productos.forEach(prodReal => {
                    if(prodReal.id == prod.idProducto){
                        productosPorVenta.push([prodReal, stockVendido])
                    }
                });
            }
        });

        return productosPorVenta;
    }

    function OnClickVerDetalle(){
        
    }
    return (
        <>
            <h2>Reportes</h2>
            <Grid margin={2}>
                <Card>
                    <CardContent>
                        <Typography textAlign={'left'} variant='h5'>Reporte de Ventas</Typography><br />
                        <Grid textAlign={'start'}><Button variant="contained" startIcon={<VisibilityIcon />} onClick={OnClickVerDetalle} disabled={rowClicked[0] == undefined}>Ver Detalle</Button></Grid>
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
                                    rows={rowsInicial}
                                    rowsPerPageOptions={[5]}
                                    onRowClick={onRowClick}
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