import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';

function MyAccount(props) {


    return (
        <div>{/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">My Account</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">My Account</li>
                </ol>
            </div>

            <div className="container-fluid py-5">
                <div className='container'>
                    <div className='d-flex row myAccountOrder'>
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <NavLink to={'/order'}>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <a><img src="https://res.cloudinary.com/templategalaxy/image/upload/v1631257421/codepen-my-account/images/orders_n2aopq.png" /></a>
                                        </div>
                                        <h2>My Orders</h2>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <NavLink to={'/account-details'}>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <a><img src="https://res.cloudinary.com/templategalaxy/image/upload/v1631257421/codepen-my-account/images/login_aq9v9z.png" /></a> </div>
                                        <h2>Account Details</h2>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>

    );
}

export default MyAccount;