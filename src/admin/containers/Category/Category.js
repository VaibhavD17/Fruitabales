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
import { useDispatch, useSelector } from 'react-redux';
import { addCategories, deleteCategories, getCategories, updateCategories } from '../../../redux/Slice/categories.slice';




function Category(props) {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState('')

    const dispatch = useDispatch();

    const categorie = useSelector(state => state.categories)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {

        dispatch(getCategories());
    }

   

    const hendleAdd = async (data) => {

        dispatch(addCategories(data))

    }

    const hendleDelete = (id) => {

        dispatch(deleteCategories(id))

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(null);
        resetForm()
    };

   

    const hendleUpdate = async (data) => {

        dispatch(updateCategories(data));

    }

   

    const hendleEdit = (data) => {

        setValues(data)

        setUpdate(data.id)

        handleClickOpen()

    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Category name', width: 200 },
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


    let categorySchema = object({
        name: string().required('Please Enter Category Name')
    });

    


    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: categorySchema,
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
            <h1>Category</h1>

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
                            <TextField
                                required
                                margin="dense"
                                id="name"
                                name="name"
                                label="Category"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.name && touched.name}
                                helperText={errors.name}
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
                    rows={categorie.categories}
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

export default Category;