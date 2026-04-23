import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const ProductDetails = ({ product }) => {
    const router = useRouter();

    if (router.isFallback || !product) {
        return <div className="text-center py-5">Loading Product Details...</div>;
    }

    return (
        <div className="container py-5">
            <button className="btn btn-outline-primary mb-4" onClick={() => router.back()}>
                ← Back to Products
            </button>
            
            <div className="row align-items-center">
                <div className="col-md-6 text-center bg-light rounded p-5">
                    <div className="position-relative" style={{ height: '400px' }}>
                        <Image 
                            src={product.thumbnail} 
                            alt={product.title} 
                            fill 
                            unoptimized
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
                
                <div className="col-md-6 ps-md-5 mt-4 mt-md-0">
                    <span className="badge bg-primary mb-2">{product.category}</span>
                    <h1 className="fw-bold mb-3">{product.title}</h1>
                    <p className="text-muted fs-5 mb-4">{product.description}</p>
                    <h2 className="text-success fw-bold mb-4">${product.price}</h2>
                    
                    <div className="d-flex gap-3">
                        <button className="btn btn-dark btn-lg px-5 rounded-pill">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

export async function getServerSideProps(context) {
    const { id } = context.params;
    
    try {
        const res = await fetch(`http://localhost:4000/products/${id}`);
        
        if (res.status === 404) {
            return {
                notFound: true, 
            };
        }

        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
            return { notFound: true };
        }

        return {
            props: { product: data }
        };
    } catch (error) {
        console.error("Fetch error:", error);
        return { notFound: true };
    }
}