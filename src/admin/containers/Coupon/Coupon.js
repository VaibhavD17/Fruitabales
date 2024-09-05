import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { number, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, deleteCoupon, getCoupon, updateCoupon } from '../../../redux/Slice/coupon.slice';


function Coupon(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState('')
    const dispatch = useDispatch();

   

    const coupon = useSelector(state => state.coupon);

    console.log(coupon);
    


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
        setUpdate(null);
    };

    const hendleAdd = (data) => {
        dispatch(addCoupon(data));
    }

    const hendleEdit = (data) => {
        setValues(data);

        setUpdate(data.id);

        handleClickOpen();
        
    }

    const hendleUpdate = (data) => {
        dispatch(updateCoupon(data));
    }

    const hendleDelete = (id) => {
        dispatch(deleteCoupon(id));
    }

    const getData = ()=> {
        dispatch(getCoupon());
    }

    useEffect (() => {
        getData();
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'code', headerName: 'Coupon Code', width: 130 },
        { field: 'discount', headerName: 'Discount', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="edit" onClick={() => hendleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>

                        <IconButton aria-label="delete" onClick={() => hendleDelete(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )
            }
        }
    ];

    let couponSchema = object({
        code: string().required('Please Enter Coupon Code'),
        discount: number().max(100).required('Please Enter Discount')
    });

    const formik = useFormik({
        initialValues: {
            code: '',
            discount: ''
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                hendleUpdate(values)
            } else {
                hendleAdd(values);
            }

            handleClose();
            resetForm();
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, values, touched, setValues, resetForm } = formik


    return (
        <div>
            <h1>Coupons</h1>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add to Coupons
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Coupon
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                required
                                margin='dense'
                                id='code'
                                name='code'
                                label='Coupon'
                                type='text'
                                fullWidth
                                variant='outlined'
                                value={values.code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.code && touched.code}
                                helperText={errors.code}
                            />
                            <TextField
                                required
                                margin='dense'
                                id='discount'
                                name='discount'
                                label='Discount'
                                type='text'
                                fullWidth
                                variant='outlined'
                                value={values.discount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.discount && touched.discount}
                                helperText={errors.discount}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type='submit'>{update?'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={coupon.coupon}
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

export default Coupon;