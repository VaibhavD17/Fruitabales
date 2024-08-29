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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { addSubcategories, deleteSubcategory, getSubcategories, updateSubcategory } from '../../../redux/Slice/subcategories.slice';
import { getCategories } from '../../../redux/Slice/categories.slice';



function SubCategory(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setupdate] = useState(null);

    const dispatch = useDispatch();

    const categorie = useSelector(state => state.categories)


    const subCategories = useSelector(state => state.subcategories)


    useEffect(() => {
        getData()
        dispatch(getCategories())
    }, [])


    const getData = async () => {
        dispatch(getSubcategories());
    }


    const hendleAdd = async (data) => {
        dispatch (addSubcategories(data));
        
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
        setupdate(null);
    };

    const hendleDelete = async (id) => {
        dispatch(deleteSubcategory(id))

    }

    const hendleEdit = (data) => {
        setValues(data)
        setupdate(data.id)
        handleClickOpen();

    }

    const hendleUpdate = async (data) => {
       dispatch(updateSubcategory(data));
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'category', headerName: 'Category', width: 180,
            renderCell: (params) => {
                return categorie.categories.find((v) => v.id === params.row.category)?.name //option chain operator
            }
        },
        { field: 'name', headerName: 'SubCategory name', width: 180 },
        { field: 'description', headerName: 'SubCategory Description', width: 200 },
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

    let SubCategorySchema = object({
        name: string().required("Please enter subcategory name"),
        description: string().required("Please enter subcategory Description"),
        category: string().required("Please select Category")
    });

    const formik = useFormik({
        initialValues: {
            category: '',
            name: '',
            description: ''
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

                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="SubCategory"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name ? errors.name : ''} />
                            <TextField
                                required
                                margin="dense"
                                id="description"
                                name="description"
                                label="SubCategory Description"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.description && touched.description}
                                helperText={errors.description && touched.description ? errors.description : ''}

                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{update ? 'update' : 'add'}</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>

                </Dialog>
            </React.Fragment>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={subCategories.subcategorie}
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

export default SubCategory;