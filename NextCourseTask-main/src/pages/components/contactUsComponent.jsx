import React from 'react';

const ContactUsComponent = () => {
    return (
        <div className="py-5">
            <h1 className="text-center">Contact Us</h1>
            <div className="card mx-auto shadow-sm" style={{maxWidth: '500px'}}>
                <div className="card-body">
                    <p><strong>Email:</strong> info@mystore.com</p>
                    <p><strong>Phone:</strong> +123 456 789</p>
                    <button className="btn btn-dark w-100">Send Message</button>
                </div>
            </div>
        </div>
    );
};

export default ContactUsComponent;