import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBilling } from '../../redux/Slice/checkout.slice';
import { getProduct } from '../../redux/Slice/product.slice';

function Order(props) {
    const orderData = useSelector(state => state.checkOut)
    const product = useSelector(state => state.products);

    const dispatch = useDispatch()

    const fdata = product.products.filter((v) => {
        return orderData.checkOut.some((v1) =>
            v1.cart.some((c) => c.pid === v.id)
        );
    })

    const handleViewDetails = (id) => {
        console.log(id);
        
    };



    const getData = () => {
        dispatch(getBilling())
        dispatch(getProduct())
    }

    useEffect(() => {
        getData()
    }, [])

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
            <div className="container-fluid py-5">
                <div className='container'>
                    <div className='d-flex flex-column orderData'>
                        {orderData.checkOut.map((c) => (
                            <div key={c.id} className='orderSection'>
                                {fdata.map((v) => {
                                    const cartItem = c.cart.find(c1 => c1.pid === v.id);
                                    return (
                                        <div key={v.id} className='d-flex orderDetail-Data'>
                                            <div className='dataOrder productname'>{v.product}</div>
                                            <div className='dataOrder orderQuantity'>{cartItem ? cartItem.qty : 0}</div>
                                            <div className='dataOrder orderPrice'>{cartItem ? `$${cartItem.amount}` : '$0'}</div>
                                        </div>
                                    );
                                })}
                                <div className='bill-amount-order'>Billing Amount: ${c.bill_amout}</div>
                                <button onClick={() => handleViewDetails(c.id)}>View Order Details</button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div >
    );
}

export default Order;