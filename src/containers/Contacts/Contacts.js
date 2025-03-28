import React from 'react';

function Contacts(props) {
    return (
        <div>
            <div>
                
                {/* Single Page Header start */}
                <div className="container-fluid page-header py-5">
                    <h1 className="text-center text-white display-6">Contact</h1>
                    <ol className="breadcrumb justify-content-center mb-0">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Pages</a></li>
                        <li className="breadcrumb-item active text-white">Contact</li>
                    </ol>
                </div>
                {/* Single Page Header End */}
            </div>

            {/* Contact Start */}
            <div className="container-fluid contact py-5">
                <div className="container py-5">
                    <div className="p-5 rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                                    <h1 className="text-primary">Get in touch</h1>
                                    <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="h-100 rounded">
                                    <iframe className="rounded w-100" style={{ height: 400 }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.9514157777294!2d72.90287247503746!3d21.233775080467293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be045af3a2ac197%3A0xe74f8c0ca1817b6f!2sBitKhanan%20IT%20Education!5e0!3m2!1sen!2sbd!4v1721970637990!5m2!1sen!2sbd"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"/>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <form action className>
                                    <input type="text" className="w-100 form-control  py-3 mb-4" placeholder="Your Name" />
                                    <input type="email" className="w-100 form-control  py-3 mb-4" placeholder="Enter Your Email" />
                                    <textarea className="w-100 form-control  mb-4" rows={5} cols={10} placeholder="Your Message" defaultValue={""} />
                                    <button className="w-100 btn form-control border-secondary py-3  text-primary " type="submit">Submit</button>
                                </form>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex p-4 rounded mb-4 ">
                                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Address</h4>
                                        <p className="mb-2"> BitKhanan IT Education
                                        510, Kyros Business Centre, Surat 395006</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded mb-4 ">
                                    <i className="fas fa-envelope fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Mail Us</h4>
                                        <p className="mb-2">info@example.com</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded ">
                                    <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                                    <div>
                                        <h4>Telephone</h4>
                                        <p className="mb-2">(+012) 3456 7890</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}</div>

    );
}

export default Contacts;