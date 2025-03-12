import { Field, useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { object, string, number } from 'yup';
import { addRegistration, loginUser, updatePassword } from '../../redux/Slice/Auth.slice';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function Login(props) {

    const [type, setType] = useState('login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true)
    const form = useRef();
    const [sendotp, setsendOtp] = useState('')
    const [userOtp, setUserOtp] = useState('');
    const [forgotEmail, setforgotEmail] = useState('')

    const sendEmail = (values) => {
        const generatedOtp = Math.floor(Math.random() * 1000000);
        setsendOtp(generatedOtp)
        setforgotEmail(values.email)
        setType('otp')
        emailjs
            .send('service_zppnhcs', 'template_12aebtt', {
                email: values.email,
                otp_code: generatedOtp
            }, {
                publicKey: 'vq0PugDSMVxTMBX8R',
            })
            .then(
                () => {
                    alert('OTP Sent successfully.');
                },
                (error) => {
                    alert('FAILED...', error.text);
                },
            );
    };


    const handleOTP = () => {
        if (userOtp === sendotp.toString()) {
            alert("OTP matched!");

            setType('verified')

        } else {
            alert("Incorrect OTP. Please try again.");
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
    } else if (type === 'verified') {
        initialValues = {
            password: '',
            confPassword: '',
        }
        loginSchema = object({
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
    }

    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: loginSchema,

        enableReinitialize: true,

        onSubmit: (values, { }) => {

            if (type === 'signup') {
                dispatch(addRegistration(values))
            } else if (type === 'login') {
                dispatch(loginUser({ values, navigate }))
            } else if (type === 'forgotpassword') {
                setDisabled(false)
                sendEmail(values)
            } else if (type === 'otp') {
                handleOTP();
            } else if (type === 'verified') {
                dispatch(updatePassword({ ...values, forgotEmail }))
                setType('login')
            }

            resetForm()

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
                    <>
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
                        </FormGroup>
                        <Button type='button' className='loginsubmit' onClick={handleOTP}>
                            Submit
                        </Button>
                    </>
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
                        {
                            type === 'verified' ? null :
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
                        }
                        {
                            type === 'forgotpassword' || type === 'verified' ?
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
                            type === 'verified' ? <FormGroup>
                                <Label >
                                    Enter New Password
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

                                <Label>
                                    confirm New Password
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
                                : null
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
                            type === 'signup' ? <p>
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
                                :
                                null
                        }
                        {
                            type === 'login' || type === 'forgotpassword' ?
                                <p>
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
                                null

                        }



                        <Button type='submit' className='loginsubmit'>
                            {type === 'login' ? 'Login' : type === 'signup' ? 'Sign up' : type === 'forgotpassword' ? 'Send OTP' : 'Create New Password'}
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