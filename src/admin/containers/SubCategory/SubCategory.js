import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { useTheme } from '@mui/material/styles';
import { formik, useFormik } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


function SubCategory(props) {
    const [categoryData, setCategoryData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [subcategory, setsubCategory] = useState([]);
    const [selectCateData, setSelectcateData] = useState('');
    const [update, setupdate] = useState(null);

    const getCategory = async () => {
        const response = await fetch("http://localhost:8080/category");
        const data = await response.json();

        setCategoryData(data)

        if (categoryData) {
            getsubcategorydata()
        }
    }

    const getsubcategorydata = async () => {
        const response = await fetch("http://localhost:8080/subcategory");
        const data = await response.json();

        setsubCategory(data);

    }

    const selectCategory = (data) => {
        setSelectcateData(data.name)
    }

    const hendleAdd = async (data) => {
        const response = await fetch("http://localhost:8080/subcategory", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const Fdata = await response.json();

        setsubCategory((prev) => [...prev, Fdata])
    }

    useEffect(() => {
        getCategory()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const hendleDelete = async (id) => {
        const response = await fetch("http://localhost:8080/subcategory/" + id, {
            method: "DELETE"
        })

        const Fdata = await response.json();

        setsubCategory((prev) => prev.filter((v) => v.id != id))

    }

    const hendleEdit = (data) => {
        setValues(data)
        setupdate(data.id)
        

    }

    const hendleUpdate =async (data) => {
        const response = await fetch("http://localhost:8080/subcategory/" + data.id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const Fdata = await response.json();

        setsubCategory((prev) => prev.map((v) => v.id === update ? Fdata : v))
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'subcategoryName', headerName: 'SubCategory name', width: 180 },
        { field: 'subcategoryDesc', headerName: 'SubCategory Description', width: 200 },
        {
            field: 'action',
            headerName: 'Action',
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="edit" onClick={hendleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>

                        <IconButton aria-label="delete" onClick={hendleDelete(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )
            }
        }
    ];

    let SubCategorySchema = object({
        subcategoryName: string().required("Please enter subcategory name"),
        subcategoryDesc: string().required("Please enter subcategory Description"),
    });

    const formik = useFormik({
        initialValues: {
            subcategoryName: '',
            subcategoryDesc: ''
        },
        validationSchema: SubCategorySchema,
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


    const { handleSubmit, handleBlur, handleChange, errors, values, touched, resetForm, setValues } = formik


    return (
        <Layout>
            <div>
                <h1>SubCategory</h1>



                <React.Fragment>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add To SubCategorys
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>SubCategory</DialogTitle>
                        <form onSubmit={handleSubmit}>

                            <DialogContent>
                                <select onChange={(e) => selectCategory(e.target.value)}>
                                    <option value={'0'}>-- Select Category --</option>
                                    {
                                        categoryData.map((v) => (
                                            <option key={v.id} value={v.name}>{v.name}</option>
                                        ))
                                    }
                                </select>

                                <TextField
                                    required
                                    margin="dense"
                                    id="subcategoryName"
                                    name="subcategoryName"
                                    label="SubCategory"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={values.subcategoryName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.subcategoryName && touched.subcategoryName}
                                    helperText={errors.subcategoryName}
                                />
                                <TextField
                                    required
                                    margin="dense"
                                    id="subcategoryDesc"
                                    name="subcategoryDesc"
                                    label="SubCategory Description"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={values.subcategoryDesc}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.subcategoryDesc && touched.subcategoryDesc}
                                    helperText={errors.subcategoryDesc}

                                />
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">add</Button>
                                </DialogActions>
                            </DialogContent>
                        </form>

                    </Dialog>
                </React.Fragment>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={subcategory}
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
        </Layout>
    );
}

export default SubCategory;