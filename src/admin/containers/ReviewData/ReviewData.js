import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { getReview, updateReview } from '../../../redux/Slice/review.slice';


function ReviewData(props) {

    const dispatch = useDispatch();

    const reviews = useSelector(state => state.review)

    

    const getData =  () => {

        dispatch(getReview())
        

    }

    const handleChange = async (data) => {
        dispatch(updateReview(data))

       
    };



    useEffect(() => {
        getData();
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Category name', width: 200 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'review', headerName: 'review', width: 170 },
        { field: 'rate', headerName: 'rate', width: 70 },
        { field: 'pid', headerName: 'pid', width: 90 },
        { field: 'status', headerName: 'status', width: 120 },
        { field: 'uid', headerName: 'uid', width: 130 },
        {
            field: 'action', headerName: 'action', width: 130,
            renderCell: (params) => {
                return (
                    <>
                        <Switch
                            checked={params.row.status === 'Active' ? true : false}
                            onChange={() => handleChange(params.row)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </>
                )
            }
        },

    ];

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={reviews.review}
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

export default ReviewData;