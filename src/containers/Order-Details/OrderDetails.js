import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getBilling } from '../../redux/Slice/checkout.slice';
import { getProduct } from '../../redux/Slice/product.slice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function OrderDetails(props) {
    const { id } = useParams()
    const orderData = useSelector(state => state.checkOut)
    const product = useSelector(state => state.products);
    const dispatch = useDispatch()

    const orderDetail = orderData.checkOut.filter((v) => v.id === id)

    const fdata = product.products.filter((v) => {
        return orderDetail.some((v1) =>
            v1.cart.some((c) => c.pid === v.id)
        );
    })

    const getData = () => {
        dispatch(getBilling())
        dispatch(getProduct())
    }

    useEffect(() => {
        getData()
    }, [])



    return (


        <div>
            {/* Page Header */}
            <div className="container-fluid page-header py-5 bg-dark">
                <h1 className="text-center text-white display-6">Order Details</h1>
            </div>

            {/* Main Order Details Section */}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className='d-flex orderDetail-Data'>
                    <NavLink to={'/order'}>
                        <button className='myOrderbtn back-button'><ArrowBackIcon></ArrowBackIcon> Back</button>
                    </NavLink>
                    <div className='dataOrder'></div>
                    <div className='dataOrder'></div>
                    {
                        orderDetail.map((c) => (
                            <div className='dataOrder order-status'><strong>Status:</strong> {c.status}</div>
                        ))
                    }
                    </div>

                    {/* Product Name Section */}
                    <div className='d-flex flex-column orderData'>
                        {orderDetail.map((c) => (

                            <div className='orderSection'>
                                {fdata.map((v) => {
                                    const cartItem = c.cart.find(c1 => c1.pid === v.id);
                                    return (
                                        <div className='d-flex orderDetail-Data'>
                                            <div className='dataOrder productname'>{v.product}</div>
                                            <div className='dataOrder orderQuantity'>{cartItem ? cartItem.qty : 0}</div>
                                            <div className='dataOrder orderPrice'>{cartItem ? `$${cartItem.amount * cartItem.qty}` : '$0'}</div>
                                        </div>
                                    );
                                })}
                                <div className='d-flex orderDetail-total'>
                                    <div className='dataOrder'></div>
                                    <div className='dataOrder'><strong>Total Quantity:</strong> {c.cart.reduce((acc, c1) => acc + c1.qty, 0)}</div>
                                    <div className='dataOrder bill-amount-order'>
                                        <div>Discount: ${(c.total_amout * c.discount) / 100}</div>
                                        <div>Billing Amount: ${c.bill_amout}</div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Order Details Section */}
                    <div className="row">
                        {orderDetail.map((v) => {
                            const orderDate = new Date(v.createdAt);
                            const discountAmount = (v.total_amout * v.discount) / 100;

                            return (
                                <div className="col-md-12 mb-4" key={v.orderId}>
                                    <div className="card shadow-sm border-0">
                                        <div className="card-body">
                                            {/* Order Summary */}
                                            <h5 className="card-title text-dark">Order Summary</h5>
                                            <hr />

                                            {/* Shipping Information */}


                                            <p><strong>Billing Address:</strong> {v.biiling_details.address} </p>



                                            {/* Total Amount */}
                                            <p className="card-text">
                                                <strong>Total Amount:</strong> ₹{v.total_amout}
                                            </p>

                                            {/* Discount */}
                                            <p className="card-text">
                                                <strong>Discount:</strong> ₹{discountAmount} ({v.discount}%)
                                            </p>

                                            {/* Final Billing Amount */}
                                            <p className="card-text">
                                                <strong>Billing Amount:</strong> ₹{v.bill_amout}
                                            </p>

                                            {/* Payment Status */}
                                            <p className="card-text">
                                                <strong>Payment Method:</strong> {v.biiling_details.payment_method}
                                            </p>

                                            {/* Order Date */}
                                            <p className="card-text">
                                                <strong>Order Date:</strong> {orderDate.toLocaleDateString()} {orderDate.toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>




    );
}

export default OrderDetails;