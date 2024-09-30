import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cartSlice, { addtoCart, decrement, deleteqty, increment } from '../../redux/Slice/cart.slice';
import { getProduct } from '../../redux/Slice/product.slice';
import { getCoupon } from '../../redux/Slice/coupon.slice';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { NavLink } from 'react-router-dom';

function Cart(props) {

    const cart = useSelector(state => state.cart);
    const product = useSelector(state => state.products);
    const coupon = useSelector(state => state.coupon);
    const [discount, setDiscount] = useState('');
    const theme = useContext(ThemeContext)


    useEffect(() => {
        dispatch(getCoupon());
    }, [])


    const fData = cart.cart.map((v) => {
        const pData = product.products.find((v1) => v1.id === v.pid);

        console.log(pData);
        
        return { ...pData, qty: v.qty }

    })

    const subtotal = fData.reduce((acc, v) => acc + (v.price * v.qty), 0);

    const totalDiscount = discount ? (subtotal * discount) / 100 : 0;

    const total = subtotal - totalDiscount;


    const dispatch = useDispatch();

    const hendleincrement = (id) => {
        dispatch(increment(id));

    }

    const hendledecrement = (id) => {
        dispatch(decrement(id));
    }

    const hendledelete = (id) => {
        dispatch(deleteqty(id))
    }

    let codeSchema = object({
        code: string()
            .required("Please Enter Coupon Code")
            .test("code", "Invalide Coupon Code", function (item) {
                let flag = false;

                coupon.coupon.map((v) => {
                    if (v.code === item) {
                        flag = true;
                        setDiscount(v.discount);
                    }
                })

                if (flag) {

                    return true;
                } else {
                    return false;
                }
            }),
    });

    const formik = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: codeSchema,
        onSubmit: (values, actions, { resetForm }) => {

            actions.setSubmitting(false);
            resetForm();
        },
    });


    const { handleBlur, handleChange, handleSubmit, values, errors, touched, setValues, resetForm, setFieldValue, isSubmitting } = formik



    console.log(isSubmitting, discount);




    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    fData.map((v) => (
                                        <tr className={`${theme.theme}-cart-data`}>
                                            <th scope="row">
                                                <div className="d-flex align-items-center">
                                                    <img src="img/vegetable-item-3.png" className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                                </div>
                                            </th>
                                            <td>
                                                <p className="mb-0 mt-4">{v.product}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{v.price}</p>
                                            </td>
                                            <td>
                                                <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                    <div className="input-group-btn">
                                                        <button onClick={() => hendledecrement(v.id)} className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <input type="text" className={`${theme.theme}-cart-input form-control form-control-sm text-center border-0`} value={v.qty} />
                                                    <div className="input-group-btn">
                                                        <button onClick={() => hendleincrement(v.id)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{v.price * v.qty}</p>
                                            </td>
                                            <td>
                                                <button onClick={() => hendledelete(v.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                                                    <i className="fa fa-times text-danger" />
                                                </button>
                                            </td>
                                        </tr>

                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5">
                        <Form className='py-5' onSubmit={handleSubmit}>
                            <Input
                                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                                id="code"
                                name="code"
                                placeholder="Coupon Code"
                                type="text"
                                value={values.code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <span
                                style={{
                                    color: 'red',
                                    display: 'block'
                                }}
                            >
                                {errors.code && touched.code ? errors.code : ''}
                            </span>
                            <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="submit">Apply Coupon</button>
                        </Form>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">

                            <div className={`${theme.theme}-cart-coupon rounded`}>
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">{subtotal}</p>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Discount:</h5>
                                        <p className="mb-0">{isSubmitting && discount ? discount + "%" : 0}</p>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">TotalDiscount:</h5>
                                        <p className="mb-0">{totalDiscount}</p>
                                    </div>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>

                                    <p className="mb-0 pe-4">{total}</p>
                                </div>
                                <NavLink
                                    to={{pathname :"/checkout"}}
                                    state={{discount: discount}}

                                >
                                    <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div>

    );
}

export default Cart;
