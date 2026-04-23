import { useRouter } from "next/router";
import React from "react";

const ErrorComponent = () => {
  const router = useRouter();
  
  const Back = () => {
    router.replace("/");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light">
      <div className="p-5 shadow-lg rounded-4 bg-white border border-danger-subtle" style={{ maxWidth: '500px' }}>
        <h1 className="display-1 fw-bold text-danger mb-0">404</h1>
        
        <div className="alert alert-danger border-0 bg-transparent fs-4 fw-semibold mt-0">
          Oops! Something Went Wrong
        </div>
        
        <p className="text-muted mb-4">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>

        <button 
          className="btn btn-dark btn-lg px-5 shadow-sm rounded-pill" 
          onClick={() => Back()}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;