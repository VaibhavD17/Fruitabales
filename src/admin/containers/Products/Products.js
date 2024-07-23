import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
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

function Products(props) {
    const [open, setOpen] = React.useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [subcategoryData, setSubcategoryData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [update, setUpdate] = useState('');


    const getData = async () => {
        const categoryresponse = await fetch("http://localhost:8080/category");
        const Cdata = await categoryresponse.json();

        setCategoryData(Cdata);

        const subcategoryresponse = await fetch("http://localhost:8080/subcategory");
        const Sdata = await subcategoryresponse.json();

        setSubcategoryData(Sdata);

        const productresponse = await fetch("http://localhost:8080/product");
        const Pdata = await productresponse.json();

        setProductData(Pdata);

    }

    const hendleAdd = async (data) => {
        const response = await fetch("http://localhost:8080/product", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const Pdata = await response.json();


        setProductData((prev) => [...prev, Pdata])

    }

    const hendleDelete = async (id) => {
        const response = await fetch("http://localhost:8080/product/" + id, {
            method: "DELETE"
        })

        if (response.ok) {
            setProductData((prev) => prev.filter((v) => v.id != id))
        }
    }

    const hendleEdit = async (data) => {
        setValues(data)
        setUpdate(data.id)
        handleClickOpen();
    }

    const hendleUpdate = async (data) => {
        const response = await fetch("http://localhost:8080/product/" + data.id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...data, id: data.id })
        });
        const Pdata = await response.json();

        if (response.ok) {
            setProductData((prev) => prev.map((v) => v.id === data.id ? Pdata : v))
        }
    }


    useEffect(() => {
        getData();
    }, [])


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
                return categoryData.find((v) => v.id === params.row.category).name
            }
        },
        {
            field: 'subcategory', headerName: 'SubCategory name', width: 200, renderCell: (params) => {
                return subcategoryData.find((v) => v.id === params.row.subcategory).name
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
                        Add To Categorys
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
                                        {categoryData.map((v) => (
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
                                        {subcategoryData.filter((v) => v.category === values.category).map((v) => (
                                            <MenuItem
                                                key={v.id}
                                                value={v.id}
                                            >
                                                {v.name}
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
                        rows={productData}
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