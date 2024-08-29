
import { Field, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { object, string, number } from 'yup';

function Login(props) {

    const [type, setType] = useState('login');

    const getData = () => {

    }



    useEffect(() => {
        getData();
    }, [])

    let loginSchema = {}, initialValues = {};

    if (type === 'login') {
        initialValues = {
            email: '',
            password: ''
        }
        loginSchema = object({
            email: string().email("Please Enter Email").required(),
            password: number().required("Please Enter Password")
        });
    } else if (type === 'signup') {
        initialValues = {
            name: '',
            email: '',
            password: ''
        }
        loginSchema = object({
            name: string().required("Please Enter name"),
            email: string().email("Please Enter Email").required(),
            password: number().required("Please Enter Password")
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

            console.log(values);



        },
    });

    const { handleBlur, handleChange, handleSubmit, values, errors, touched, setValues, resetForm } = formik

    console.log(type, errors);


    return (

        <div className='container'>

            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Login</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Login</li>
                </ol>
            </div>
            {/* Single Page Header End */}

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
                            error={errors.name && touched.name}
                            helperText={errors.name && touched.name ? errors.name : ''}
                        />
                        <span 
                        style={{
                            color : 'red'
                        }}
                        >
                            {errors.name}</span>
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
                        error={errors.email && touched.email}
                        helperText={errors.email && touched.email ? errors.email : ''}
                    />
                    <span style={{
                            color : 'red'
                        }}>{errors.email}</span>
                </FormGroup>
                {
                    type === 'forgotpassword' ? null : <FormGroup>
                        <Label for="examplePassword">
                            Enter Your Password
                        </Label>
                        <Input
                            id="email"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.password && touched.password}
                            helperText={errors.password && touched.password ? errors.password : ''}
                        />
                        <span style={{
                            color : 'red'
                        }}>{errors.password}</span>
                    </FormGroup>

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
                    Submit
                </Button>

                <button type="button" className="login-with-google-btn " >
                    Sign in with Google
                </button>
            </Form>
        </div>
    );
}

export default Login;