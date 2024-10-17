
import { Field, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { object, string, number } from 'yup';
import { addRegistration, loginUser } from '../../redux/Slice/Auth.slice';
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const [type, setType] = useState('login');
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            email: '',
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
            } else if (type === 'login') {
                dispatch(loginUser(values))
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

            <Form className='py-5' onSubmit={handleSubmit}>
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
                    type === 'forgotpassword' ? null :
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
                    {type === 'login' ? 'Login' : type === 'signup' ? 'Sign up' : 'Submit'}
                </Button>

                <button type="button" className="login-with-google-btn " >
                    Sign in with Google
                </button>
            </Form>
        </div>
    );
}

export default Login;