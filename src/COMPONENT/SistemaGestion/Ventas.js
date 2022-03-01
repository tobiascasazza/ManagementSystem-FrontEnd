import {
    Button,
    Grid,
    TextField,
    Typography,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';
import { typography } from '@mui/system';
import { Card, CardContent } from '@mui/material';
import * as React from 'react';
import { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Producto } from './Models/Models.tsx';
import { useEffect } from 'react';
import { Modal, Box } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'descripcion', headerName: 'Descripcion', width: 130 },
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
const rows = [
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

export default class Ventas extends Component {
    constructor() {
        super();
        this.state = {
            agregarProducto: new Producto(),
            carrito: [],
            total: 0,
            modalVerProductos: false
        }
    }

    onChangeId = event => {
        let find = false;
        rows.forEach(element => {
            if (event.target.value == element.id) {
                this.setState({
                    agregarProducto: new Producto(
                        element.id,
                        element.descripcion,
                        element.costo,
                        element.precioVenta,
                        0)
                })
                find = true;
            }
        });
        if (!find) {
            this.setState({ agregarProducto: new Producto(0, "", 0, 0, 0) })
        }
    }

    cambiarProducto = (i) => {
        var yaPaso = false;
        this.setState(state => {
            const carrito = state.carrito.map((item, j) => {
                if (j === i && !yaPaso) {
                    yaPaso = true;
                    item.stock = (parseInt(item.stock) + parseInt(this.state.agregarProducto.stock));
                    return item;
                }
                else {
                    return item;
                }
            })
            return { carrito };
        }
        )
    }

    onClickAgregar = () => {
        var repetido = false;
        this.state.carrito.map((e, index) => {
            if (e.id == this.state.agregarProducto.id) {
                this.cambiarProducto(index)
                repetido = true;
            }

        });

        if (!repetido) {
            this.setState(state => {
                const carrito = [...state.carrito, this.state.agregarProducto]
                return {
                    carrito
                }
            })
        }

        this.setState({ agregarProducto: new Producto(0, "", 0, 0, 0) })

    }

    ActualizarTotal = () => {
        let total
        this.state.carrito.forEach(element => {
            total = total + (element.stock * element.precioVenta);
        });
        return (total)
    }

    onChangeStock = event => {
        this.setState(state => {
            let agregarProducto = { ...state.agregarProducto };
            agregarProducto.stock = event.target.value;
            return { agregarProducto }
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.carrito !== this.state.carrito) {
            let total1 = 0;
            this.state.carrito.map(e => {
                total1 = total1 + (e.stock * e.precioVenta)
            })
            this.setState({ total: total1 })
        }
    }

    onClickVerProductos = () => {
        this.setState({ modalVerProductos: true })
    }
    onClickSalirModal = () => {
        this.setState({ modalVerProductos: false })
    }

    render() {
        return (
            <>
                <h2>Ventas</h2>
                <Card >
                    <CardContent className="paperCard" >
                        <Typography textAlign={'left'} variant='h5'>Nueva Venta</Typography><br />
                        <Grid margin={1}>
                            <Card >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    marginBottom={2}>
                                    <Typography textAlign={'left'} variant='h6'>Agregar Producto</Typography>
                                    <Button variant='outlined' onClick={this.onClickVerProductos}>Ver Productos</Button>
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center">
                                    <Grid margin={1}>
                                        <TextField
                                            name="id"
                                            label="Id"
                                            onChange={this.onChangeId}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid margin={1}>
                                        <TextField
                                            name='descripcion'
                                            label='Descripcion'
                                            value={this.state.agregarProducto.descripcion}
                                            disabled
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid margin={1}>
                                        <TextField
                                            name='precioVenta'
                                            label='Precio de Venta'
                                            value={'$', this.state.agregarProducto.precioVenta}
                                            disabled
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid margin={1} >
                                        <TextField
                                            type='number'
                                            name='stock'
                                            label='Stock'
                                            style={{ backgroundColor: 'yellow' }}
                                            value={this.state.agregarProducto.stock}
                                            onChange={this.onChangeStock}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid margin={1}>
                                        <Button variant="contained" onClick={this.onClickAgregar}>Agregar</Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>

                        <Grid margin={1}>
                            <Card>
                                <Typography textAlign={'left'} variant='h6'>Carrito</Typography>
                                <TableContainer component={Paper} onChange={this.Total}>
                                    <Table sx={{ minWidth: 700 }} aria-label="spanning table" >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell>Descripcion</TableCell>
                                                <TableCell>Precio</TableCell>
                                                <TableCell>Stock</TableCell>
                                                <TableCell>Total/Producto</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.carrito.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.descripcion}</TableCell>
                                                    <TableCell >{row.precioVenta}</TableCell>
                                                    <TableCell >{row.stock}</TableCell>
                                                    <TableCell >{row.precioVenta * row.stock}</TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell colSpan={2}>Total</TableCell>
                                                <TableCell align="right">${this.state.total}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Card>
                        </Grid>
                        <Grid textAlign={'end'}>
                            <Button variant='contained'>Confirmar Venta</Button>
                        </Grid>
                    </CardContent>
                </Card>

                <Modal
                    open={this.state.modalVerProductos}
                    onClose={this.onClickSalirModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >

                    <Box sx={{...style, width: 520 }}>
                        <h2>Lista de Productos</h2>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            />
                        </div>
                    </Box>
                </Modal>
            </>
        );
    }

}