import Link from 'next/link';

const HomePage = () => {
    return (
        <div className="text-center py-5">
            <div className="bg-light p-5 rounded-3 shadow-sm">
                <h1 className="display-4 fw-bold text-dark">Welcome to My Store</h1>
                <p className="lead mt-3">This is the Home Page. We are currently testing the navigation links.</p>
                <hr className="my-4" />
                <div className="d-flex justify-content-center gap-3">
                    <Link href="/products" className="btn btn-primary btn-lg px-4">
                        View All Products
                    </Link>
                    <Link href="/contactus" className="btn btn-outline-dark btn-lg px-4">
                        Contact Us
                    </Link>
                </div>
            </div>
            <div className="mt-5">
                <p className="text-muted">Click the buttons above to test the Routes.</p>
            </div>
        </div>
    );
};

export default HomePage;