import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBilling } from '../../redux/Slice/checkout.slice';

function Order(props) {
    const orderData = useSelector(state => state.checkOut)
    const product = useSelector(state => state.products);

    const dispatch = useDispatch()

    const getData = () => {
        dispatch(getBilling())
    }

    useEffect(() => {
        getData()
    }, [])

    const fData = orderData.checkOut.map((v) => {
        v.cart.map((v1) => {
            
           const pData =  product.products.filter((p) => p.id === v1.pid)
           
           return pData
            
        })
        
    })

    


    

    

    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">My Order</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">My Account</a></li>
                    <li className="breadcrumb-item active text-white">My Order</li>
                </ol>
            </div>
            <div className='container py-5'>
                <div className='d-flex row orderData'>
                    <div className='d-flex orderDetail'>
                        <div className='dataOrder productname'></div>
                        <div className='dataOrder orderQuantity'></div>
                        <div className='dataOrder totalPrice'></div>
                        <div className='dataOrder orderDate'></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Order;