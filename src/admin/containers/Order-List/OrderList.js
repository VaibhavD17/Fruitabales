import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../redux/Slice/product.slice';
import { getBilling, updateBilling } from '../../../redux/Slice/checkout.slice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { Button, DialogActions } from '@mui/material';


function OrderList(props) {

    const products = useSelector(state => state.products.products);
    const orderList = useSelector(state => state.checkOut.checkOut);
    const [open, setOpen] = React.useState(false);
    const [orderData, setOrderData] = useState([])
    const orderDate = new Date(orderData.createdAt)
    const cartData = orderData.cart
    const [disabled, setDisabled] = useState(false)
    const [status, setStatus] = React.useState('pending');

    const handleChange = (e) => {
        setStatus(e);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...orderData, status };
        dispatch(updateBilling(data));
        setOpen(false);
    };

    const fdata = products.filter((v) => {
        return (
            orderData?.cart?.some((c) => c.pid === v.id)
        )

    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct());
        dispatch(getBilling());
    }, []);


    const hendleOrederData = (data) => {
        setOrderData(data)

    }

    const handleClickOpen = (data) => {
        setOpen(true);
        hendleOrederData(data)

    };

    const handleClose = () => {
        setOpen(false);
        setDisabled(false)
    };

    const renderProductName = (params) => {
        const cartItems = params.row.cart;

        const productNames = cartItems.map(item => {
            const product = products.find(p => p.id === item.pid);
            return product ? product.product : '';
        });
        return productNames.join(', ');
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'user_id', headerName: 'User ID', width: 150 },
        {
            field: 'product',
            headerName: 'Product Name',
            width: 300,
            renderCell: renderProductName
        },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'total_amout', headerName: 'Amount', width: 120 },
        {
            field: 'action', headerName: 'View Detail', width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton onClick={() => handleClickOpen(params.row)}>
                            <VisibilityIcon />
                        </IconButton>

                    </>
                )
            }
        },
        {
            field: 'edit', headerName: 'Status Edit', width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="edit" onClick={() => (
                            handleClickOpen(params.row),
                            setDisabled(true)
                        )} >
                            <EditIcon />
                        </IconButton >
                    </>
                )
            }
        }
    ];


    return (
        <div>
            <React.Fragment>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleSubmit,
                    }}
                >
                        <DialogContent>
                            <div>
                                <div className="container-fluid py-5">
                                    <div className="container">
                                        <div className='d-flex orderDetail-Data'>

                                            <button className='myOrderbtn back-button' onClick={handleClose}><ArrowBackIcon></ArrowBackIcon> Close</button>

                                            <div className='dataOrder'></div>
                                            <div className='dataOrder' >
                                                <Box sx={{ minWidth: 500 }} style={{ display: disabled ? 'block' : 'none' }}>
                                                    <FormControl style={{ width: 300 }}>
                                                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={status}
                                                            label="Status"
                                                            onChange={(e) => handleChange(e.target.value)}
                                                        >
                                                            <MenuItem value={'pending'}>Pending</MenuItem>
                                                            <MenuItem value={'accepte'}>Accepte</MenuItem>
                                                            <MenuItem value={'delivered'}>Delivered</MenuItem>
                                                            <MenuItem value={'reject'}>Reject</MenuItem>
                                                            <MenuItem value={'transist'}>Transist</MenuItem>
                                                            <MenuItem value={'cancel'}>Cancel</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </div>
                                            {
                                                <div className='dataOrder order-status'><strong>Status:</strong> {orderData.status}</div>
                                            }
                                        </div>

                                        <div className='d-flex flex-column orderData'>
                                            <div className='orderSection'>
                                                {
                                                    fdata.map((v) => {
                                                        const cartItem = cartData.find(c1 => c1.pid === v.id);

                                                        return (
                                                            <div className='d-flex orderDetail-Data'>
                                                                <div className='dataOrder productname'>{v.product}</div>
                                                                <div className='dataOrder orderQuantity'>{cartItem ? cartItem.qty : 0}</div>
                                                                <div className='dataOrder orderPrice'>{cartItem ? `$${cartItem.amount * cartItem.qty}` : '$0'}</div>
                                                            </div>
                                                        );
                                                    })
                                                }

                                                <div className='d-flex orderDetail-total'>
                                                    <div className='dataOrder'></div>
                                                    <div className='dataOrder'><strong>Total Quantity:</strong> {orderData?.cart?.reduce((acc, c1) => acc + c1.qty, 0)}</div>
                                                    <div className='dataOrder bill-amount-order'>
                                                        <div>Discount: ${(orderData.total_amout * orderData.discount) / 100}</div>
                                                        <div>Billing Amount: ${orderData.bill_amout}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 mb-4" >
                                                <div className="card shadow-sm border-0">
                                                    <div className="card-body">

                                                        <h5 className="card-title text-dark">Order Summary</h5>
                                                        <hr />

                                                        <p><strong>Billing Address:</strong> {orderData?.biiling_details?.address} </p>

                                                        <p className="card-text">
                                                            <strong>Total Amount:</strong> ₹{orderData.total_amout}
                                                        </p>

                                                        <p className="card-text">
                                                            <strong>Discount:</strong> ₹{(orderData.total_amout * orderData.discount) / 100} ({orderData.discount}%)
                                                        </p>

                                                        <p className="card-text">
                                                            <strong>Billing Amount:</strong> ₹{orderData.bill_amout}
                                                        </p>

                                                        <p className="card-text">
                                                            <strong>Payment Method:</strong> {orderData?.biiling_details?.payment_method}
                                                        </p>

                                                        <p className="card-text">
                                                            <strong>Order Date:</strong> {orderDate.toLocaleDateString()} {orderDate.toLocaleTimeString()}
                                                        </p>
                                                    </div>

                                                    <DialogActions>
                                                        <Button type="submit" variant="contained" color="primary">
                                                            Submit
                                                        </Button>
                                                    </DialogActions>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                </Dialog>
            </React.Fragment>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={orderList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}

export default OrderList;
