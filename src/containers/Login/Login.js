import { Field, useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { object, string, number } from 'yup';
import { addRegistration, loginUser } from '../../redux/Slice/Auth.slice';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function Login(props) {

    const [type, setType] = useState('login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [disabled, seDisabled] = useState(true)
    const form = useRef();
    const [sendotp, setsendOtp] = useState('')
    const [userOtp, setUserOtp] = useState('');

    console.log(sendotp, userOtp);
    

    const sendEmail = (values) => {
        const generatedOtp = Math.floor(Math.random() * 1000000);
        setsendOtp(generatedOtp)
        setType('otp')
        emailjs
            .send('service_zppnhcs', 'template_12aebtt', {
                email: values.email,
                otp_code: generatedOtp,
            }, {
                publicKey: 'vq0PugDSMVxTMBX8R',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };


    const handleOTP = () => {
        if (userOtp === sendotp.toString()) { 
            console.log("OTP matched!");

            setType('verified')
           
        } else {
            console.log("Incorrect OTP. Please try again.");
        }
    };


    let loginSchema = {}, initialValues = {};

    if (type === 'login') {
        initialValues = {
            email: '',
            password: '',
        }
        loginSchema = object({
            email: string().email("Please Enter Email").required(),
            password: string()
                .required("Please Enter Password")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be minimum 8 latters - alphabet(upar and Lower Case), number and special Symbol."),

        });
    } else if (type === 'signup') {
        initialValues = {
            name: '',
            email: '',
            password: '',
            confPassword: '',
        }
        loginSchema = object({
            name: string().required("Please Enter name"),
            email: string().email("Please Enter Email").required(),
            password: string()
                .required("Please Enter Password")
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be minimum 8 latters - alphabet(upar and Lower Case), number and special Symbol."),
            confPassword: string()
                .required("Please Enter Conform Password.")
                .test('confPassword', "Conform Password Not match", function (value) {
                    if (value === this.parent.password) {
                        return true
                    } else {
                        return false
                    }
                })
        });
    } else if (type === 'forgotpassword') {
        initialValues = {
            email: ''
        }
        loginSchema = object({
            email: string().email("Please Enter Email").required(),
        });
    }

    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: loginSchema,

        enableReinitialize: true,

        onSubmit: (values, { }) => {

            if (type === 'signup') {

                dispatch(addRegistration(values))
                resetForm()
            } else if (type === 'login') {
                dispatch(loginUser({ values, navigate }))
                resetForm()
            } else if (type === 'forgotpassword') {
                seDisabled(false)
                sendEmail(values)
            } else if (type === 'otp') {
                handleOTP();
            }


        },
    });

    const { handleBlur, handleChange, handleSubmit, values, errors, touched, setValues, resetForm } = formik



    return (

        <div className='container'>

            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Login</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Login</li>
                </ol>
            </div>

            {
                type === 'otp' ?
                    <FormGroup className='py-5'>
                        <Label >
                            Enter OTP
                        </Label>
                        <Input
                            name="otp"
                            placeholder="otp"
                            type="text"
                            value={userOtp}
                            onChange={(e) => setUserOtp(e.target.value)}
                        />

                        <Button type='button' className='loginsubmit' onClick={handleOTP}>
                            Submit
                        </Button>
                    </FormGroup>
                    :

                    <form ref={form} className='py-5' onSubmit={handleSubmit}>
                        {
                            type === 'signup' ? <FormGroup>
                                <Label for="exampleName">
                                    Enter Your Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <span className='validationError'>{errors.name}</span> : null}
                            </FormGroup>
                                :
                                null
                        }

                        <FormGroup>
                            <Label for="exampleEmail">
                                Enter Your Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Email"
                                type="email"
                                fullwidth
                                variant="outlined"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? <span className='validationError'>{errors.email}</span> : null}
                        </FormGroup>
                        {
                            type === 'forgotpassword' ?
                                null
                                :
                                <FormGroup>
                                    <Label >
                                        Enter Your Password
                                    </Label>
                                    <Input
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password && touched.password ? <span className='validationError'>{errors.password}</span> : null}
                                </FormGroup>
                        }
                        {
                            type === 'signup' ? <FormGroup>
                                <Label>
                                    confirm Your Password
                                </Label>
                                <Input
                                    name="confPassword"
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={values.confPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.confPassword && touched.confPassword ? <span className='validationError'>{errors.confPassword}</span> : null}
                            </FormGroup>
                                :
                                null
                        }

                        {
                            type === 'login' ? <a
                                id="UncontrolledTooltipExample"
                                style={{
                                    color: '#81C408',
                                    textDecoration: 'none',
                                }}
                                onClick={() => setType('forgotpassword')}
                            >
                                Forgot Password
                            </a>
                                :
                                null
                        }

                        {
                            type != 'signup' ? <p>
                                Create New Account ? {' '}

                                <a
                                    id="UncontrolledTooltipExample"
                                    style={{
                                        color: '#81C408',
                                        textDecoration: 'none'

                                    }}
                                    onClick={() => setType('signup')}
                                >
                                    Sing UP
                                </a>
                                .
                            </p>
                                :
                                <p>
                                    You have an Account ? {' '}

                                    <a
                                        id="UncontrolledTooltipExample"
                                        style={{
                                            color: '#81C408',
                                            textDecoration: 'none'
                                        }}
                                        onClick={() => setType('login')}
                                    >
                                        Login
                                    </a>
                                    .
                                </p>


                        }



                        <Button type='submit' className='loginsubmit'>
                            {type === 'login' ? 'Login' : type === 'signup' ? 'Sign up' :type === 'forgotpassword' ? 'Send OTP' : 'Create New Password'}
                        </Button>

                        <button type="button" className="login-with-google-btn " >
                            Sign in with Google
                        </button>
                    </form>
            }

        </div>
    );
}

export default Login;