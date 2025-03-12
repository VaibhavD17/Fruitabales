import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, getProduct, updateProduct } from '../../../redux/Slice/product.slice';
import { getCategories } from '../../../redux/Slice/categories.slice';
import { getSubcategories } from '../../../redux/Slice/subcategories.slice';

function Products(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState('');

    const dispatch = useDispatch();

    const categorie = useSelector(state => state.categories)
    const subCategorie = useSelector(state => state.subcategories)
    const product = useSelector(state => state.products)
    
    useEffect(() => {
        getData();
        dispatch(getCategories());
        dispatch(getSubcategories());
    }, [])


    const getData = async () => {
        dispatch(getProduct());

    }

    const hendleAdd = async (data) => {
        dispatch(addProduct(data));

    }

    const hendleDelete = async (id) => {

        dispatch(deleteProduct(id));
        
    }

    const hendleEdit = async (data) => {
        setValues(data)
        setUpdate(data.id)
        handleClickOpen();
    }

    const hendleUpdate = async (data) => {
        dispatch(updateProduct(data));
        
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm()
        setUpdate(null)
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'category', headerName: 'Category name', width: 200, renderCell: (params) => {
                return categorie.categories.find((v) => v.id === params.row.category)?.name
            }
        },
        {
            field: 'subcategory', headerName: 'SubCategory name', width: 200, renderCell: (params) => {
                return subCategorie.subcategorie.find((v) => v.id === params.row.subcategory)?.name
            }
        },
        { field: 'product', headerName: 'Product ', width: 200 },
        { field: 'productDesc', headerName: 'Product Description ', width: 200 },
        { field: 'price', headerName: 'price ', width: 130 },
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

    let productSchema = object({
        category: string().required(),
        subcategory: string().required(),
        product: string().required("Please enter Product name"),
        productDesc: string().required("Please enter Product Description"),
        price: string().required("Please enter Product Price")
    });

    const formik = useFormik({
        initialValues: {
            category: '',
            subcategory: '',
            product: '',
            productDesc: '',
            price: ''
        },
        validationSchema: productSchema,
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

    const { handleChange, handleBlur, handleSubmit, resetForm, errors, values, touched, setValues } = formik

    return (
            <div>
                <h1>Products</h1>

                <React.Fragment>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add To Products
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>Category</DialogTitle>
                        <form onSubmit={handleSubmit}>

                            <DialogContent>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-simple-select-error-label">Select Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-error-label"
                                        id="category"
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Select Category"
                                        error={errors.category && touched.category}
                                        helperText={errors.category && touched.category ? errors.category : ''}
                                    >
                                        {categorie.categories.map((v) => (
                                            <MenuItem
                                                key={v.id}
                                                value={v.id}
                                            >
                                                {v.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-simple-select-error-label">Select SubCategory</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-error-label"
                                        id="subcategory"
                                        name="subcategory"
                                        value={values.subcategory}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label="Select SubCategory"
                                        error={errors.subcategory && touched.subcategory}
                                        helperText={errors.subcategory && touched.subcategory ? errors.subcategory : ''}
                                    >
                                        {subCategorie.subcategorie.filter((v) => v.category === values.category)?.map((c) => (
                                            <MenuItem
                                                key={c.id}
                                                value={c.id}
                                            >
                                                {c.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>


                                <TextField
                                    margin="dense"
                                    id="product"
                                    name="product"
                                    label="Product"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={values.product}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.product && touched.product}
                                    helperText={errors.product && touched.product ? errors.product : ''}
                                />
                                <TextField
                                    margin="dense"
                                    id="productDesc"
                                    name="productDesc"
                                    label="productDesc"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={values.productDesc}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.productDesc && touched.productDesc}
                                    helperText={errors.productDesc && touched.productDesc ? errors.productDesc : ''}
                                />
                                <TextField
                                    margin="dense"
                                    id="price"
                                    name="price"
                                    label="price"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.price && touched.price}
                                    helperText={errors.price && touched.price ? errors.price : ''}
                                />
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                                </DialogActions>
                            </DialogContent>
                        </form>

                    </Dialog>
                </React.Fragment>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={product.products}
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

export default Products;