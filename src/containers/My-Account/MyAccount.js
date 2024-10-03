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
            <section className="container-fluid account-wrapper py-5">
                <div className="inner">
                    <div className="account-banner">
                        <div className="inner-banner">
                            <div className="container">
                                {/* Navbar Start */}
                                <div className="navbar d-flex justify-content-center">
                                    <NavLink to={'/order'}>
                                        <div className="account-link">
                                            My Order
                                        </div>
                                    </NavLink>
                                    <NavLink to={'/account-details'}>
                                        <div className="account-link">
                                            Account Details
                                        </div>
                                    </NavLink>
                                </div>
                                {/* Navbar End */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div >

    );
}

export default MyAccount;