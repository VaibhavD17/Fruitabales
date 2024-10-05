import React, { useEffect } from 'react';
import { object, string, number, date, InferType, array, boolean } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addBilling, getBilling } from '../../redux/Slice/checkout.slice';
import { NavLink, useLocation, useNavigate } from "react-router-dom"

function Checkout(props) {

    const cart = useSelector(state => state.cart);
    const product = useSelector(state => state.products);


    const dispatch = useDispatch();
    const location = useLocation();


    const fData = cart.cart.map((v) => {
        const pData = product.products.find((v1) => v1.id === v.pid);

        return { ...pData, qty: v.qty }

    })


    const getData = () => {
        dispatch(getBilling())
    }

    useEffect(() => {
        getData()
    }, [])


    const subtotal = fData.reduce((acc, v) => acc + (v.price * v.qty), 0);
    const discount = (subtotal * location.state.discount) / 100
    const total_amout = subtotal - discount


    let checkoutSchema = object({
        fname: string()
            .required("Please enter First Name")
            .matches(/^[A-Za-z]*$/, 'Please enter valid name')
            .min(2, "First name must be min 2 latter required.")
            .max(50, "First name must be within 50 latters."),
        Lname: string()
            .required("Please enter Last Name")
            .matches(/^[A-Za-z]*$/, 'Please enter valid name')
            .min(2, "Last name must be min 2 latter required.")
            .max(50, "Last name must be within 50 latters."),
        address: string()
            .required("Please enter Address.")
            .test("address", "Address must be max 10 words.", (value) => {
                let arr = value.split(" ")
                if (arr.length > 10) {
                    return false
                } else {
                    return true
                }
            }),
        city: string()
            .required("Please enter City Name")
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
            .min(2, "City name must be min 2 latter required.")
            .max(50, "City name must be within 50 latters."),
        country: string()
            .required("Please enter country Name")
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
            .min(2, "Country name must be min 2 latter required.")
            .max(50, "Country name must be within 50 latters."),
        zipCode: string()
            .required("Please Enter Postcode or Zip")
            .matches(/^[0-9]+$/, "Please enter valid code")
            .min(6, 'Code Must be exactly 6 digits')
            .max(6, 'Code Must be exactly 6 digits'),
        mobile: string()
            .required("Please Enter Mobile Number.")
            .matches(/[0-9]{10}/, 'Please enter valid mobile number.')
            .min(10, 'Mobile number Must be 10 digits')
            .max(10, 'Mobile number Must be 10 digits'),
        email: string()
            .email("Please Enter Valid Email.")
            .required("Please Enter Email."),
        cod: boolean().oneOf([true], 'Please select payment method')
    });

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            fname: '',
            Lname: '',
            address: '',
            city: '',
            zipCode: '',
            country: '',
            mobile: '',
            email: '',
            payment_method: false
        },
        validationSchema: checkoutSchema,
        onSubmit: values => {
            dispatch(addBilling({
                user_id: 'vaibhav',
                cart: cart.cart,
                biiling_details: { ...values, payment_method: "Cash On Delivery" },
                total_amout: subtotal,
                discount: parseInt(location.state.discount),
                bill_amout: total_amout,
                createdAt: new Date(),
                updatedAt: new Date(),
                status:"Pending"
            }))

            navigate("/orderSuccess")

            resetForm()
        },
    });

    const { handleBlur, handleChange, handleSubmit, values, errors, touched, resetForm } = formik

    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Checkout</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Checkout</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Checkout Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <h1 className="mb-4">Billing details</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-6 col-xl-7">
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">First Name<sup>*</sup></label>
                                            <input
                                                name='fname'
                                                type="text"
                                                className="form-control"
                                                value={values.fname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.fname && touched.fname ? <span className='validationError'>{errors.fname}</span> : null}
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">Last Name<sup>*</sup></label>
                                            <input
                                                name='Lname'
                                                type="text"
                                                className="form-control"
                                                value={values.Lname}
                                                onChange={handleChange}
                                                onBlur={handleBlur} />
                                            {errors.Lname && touched.Lname ? <span className='validationError'>{errors.Lname}</span> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Address <sup>*</sup></label>
                                    <textarea
                                        name='address'
                                        className="form-control"
                                        placeholder="House Number Street Name"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></textarea>
                                    {errors.address && touched.address ? <span className='validationError'>{errors.address}</span> : null}
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Town/City<sup>*</sup></label>
                                    <input
                                        name='city'
                                        type="text"
                                        className="form-control"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.city && touched.city ? <span className='validationError'>{errors.city}</span> : null}
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Postcode/Zip<sup>*</sup></label>
                                    <input
                                        name='zipCode'
                                        type="text"
                                        className="form-control"
                                        value={values.zipCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.zipCode && touched.zipCode ? <span className='validationError'>{errors.zipCode}</span> : null}
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Country<sup>*</sup></label>
                                    <input
                                        name='country'
                                        type="text"
                                        className="form-control"
                                        value={values.country}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.country && touched.country ? <span className='validationError'>{errors.country}</span> : null}
                                </div>

                                <div className="form-item">
                                    <label className="form-label my-3">Mobile<sup>*</sup></label>
                                    <input
                                        name='mobile'
                                        type="text"
                                        className="form-control"
                                        value={values.mobile}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.mobile && touched.mobile ? <span className='validationError'>{errors.mobile}</span> : null}
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Email Address<sup>*</sup></label>
                                    <input
                                        name='email'
                                        type="email"
                                        className="form-control"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email ? <span className='validationError'>{errors.email}</span> : null}
                                </div>

                            </div>
                            <div className="col-md-12 col-lg-6 col-xl-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Products</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                fData.map((v) => (
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="d-flex align-items-center mt-2">
                                                                <img src="img/vegetable-item-2.jpg" className="img-fluid rounded-circle" style={{ width: 90, height: 90 }} alt />
                                                            </div>
                                                        </th>
                                                        <td className="py-5">{v.product}</td>
                                                        <td className="py-5">{v.price}</td>
                                                        <td className="py-5">{v.qty}</td>
                                                        <td className="py-5">{v.price * v.qty}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>
                                                <th scope="row">
                                                </th>
                                                <td className="py-5" />
                                                <td className="py-5" />
                                                <td className="py-5">
                                                    <p className="mb-0 text-dark py-3">Subtotal</p>
                                                </td>
                                                <td className="py-5">
                                                    <div className="py-3 border-bottom border-top">
                                                        <p className="mb-0 text-dark">{subtotal}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                </th>
                                                <td className="py-5" />
                                                <td className="py-5" />
                                                <td className="py-5">
                                                    <p className="mb-0 text-dark py-3">Discount</p>
                                                </td>
                                                <td className="py-5">
                                                    <div className="py-3 border-bottom border-top">
                                                        <p className="mb-0 text-dark">{location.state.discount + "%"}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">
                                                </th>
                                                <td className="py-5">
                                                    <p className="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                                                </td>
                                                <td className="py-5" />
                                                <td className="py-5" />
                                                <td className="py-5">
                                                    <div className="py-3 border-bottom border-top">
                                                        <p className="mb-0 text-dark">{total_amout}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                    <div className="col-12">
                                        <div className="form-check text-start my-3">
                                            <input type="checkbox" className="form-check-input bg-primary border-0" id="Transfer-1" name="Transfer" defaultValue="Transfer" disabled />
                                            <label className="form-check-label" htmlFor="Transfer-1">Direct Bank Transfer</label>
                                        </div>
                                        <p className="text-start text-dark">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                                    </div>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                    <div className="col-12">
                                        <div className="form-check text-start my-3">
                                            <input type="checkbox" className="form-check-input bg-primary border-0" id="Payments-1" name="Payments" defaultValue="Payments" disabled />
                                            <label className="form-check-label" htmlFor="Payments-1">Check Payments</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                    <div className="col-12">
                                        <div className="form-check text-start my-3">
                                            <input
                                                type="checkbox"
                                                className="form-check-input bg-primary border-0"
                                                id="payment_method"
                                                name="payment_method"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />

                                            <label className="form-check-label" htmlFor="Delivery-1">Cash On Delivery</label>
                                            {errors.payment_method && touched.payment_method ? <span className='validationError'>{errors.payment_method}</span> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                    <div className="col-12">
                                        <div className="form-check text-start my-3">
                                            <input type="checkbox" className="form-check-input bg-primary border-0" id="Paypal-1" name="Paypal" defaultValue="Paypal" disabled />
                                            <label className="form-check-label" htmlFor="Paypal-1">Paypal</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center pt-4">

                                    <button type="submit" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Checkout Page End */}
        </div>

    );
}

export default Checkout;