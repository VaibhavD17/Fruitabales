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
            {/* Single Page Header End */}
            <section className="container-fluid tg-may-account-wrapp tg py-5">
                <div className="inner">
                    <div className="tg-account">
                        {/* Accont banner start */}
                        <div className="account-banner">
                            <div className="inner-banner">
                                <div className="container">

                                    {/* Row end */}
                                    {/* Navbar Start */}
                                    <div className='d-flex'>
                                    <NavLink to={'/order'}>
                                        <div className='d-flex accountDetails'>
                                                <a>My Order</a>
                                        </div>
                                        </NavLink>
                                        
                                        <NavLink>
                                        <div className='d-flex accountDetails'>
                                            <a>Account Details</a>
                                    </div>
                                    </NavLink>
                                </div>
                                {/* Navbar End */}
                            </div>
                        </div>
                    </div>
                    {/* Banner end   */}
                </div>
        </div>
            </section >
        </div >

    );
}

export default MyAccount;