import React from 'react';

function OrderSuccess(props) {
    return (
        <>
            <div>
                {/* Single Page Header start */}
                <div className="container-fluid page-header py-5">
                    <h1 className="text-center text-white display-6">Order Success</h1>
                    <ol className="breadcrumb justify-content-center mb-0">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item active text-white">Order Success</li>
                    </ol>
                </div>
                {/* Single Page Header End */}
                <div className='d-flex align-items-center py-5' >
                    <div className="Ordercard ">
                        <div style={{ borderRadius: 200, height: 200, width: 200, background: 'white', margin: '0 auto' }}>
                            <i className="checkmark ">✓</i>
                        </div>
                        <h1>THANK YOU</h1>
                        <p>YOUR ORDER IS CONFIRMED</p>
                    </div>

                </div>
                </div>
            </>
            );
}

            export default OrderSuccess;