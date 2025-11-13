import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    
    <section className="bg-gray-100 h-screen flex items-center justify-center"> 
      
      
      <div className="bg-white p-6 md:mx-auto">
        <div className="max-w-[600px] mx-auto bg-white shadow-lg rounded-lg p-5">
          
          
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12,0,0,0,12,0ZM6.927,8.2l-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            />
          </svg>
          
          <div className="text-center">
            
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center"> 
              Payment Done
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment
            </p>
            <p>Have a great day!</p>
          </div>
          <div className="py-10 text-center">
            <Link
              to="/home"
              className="px-12 bg-buttonBgColor text-white font-semibold py-3 rounded-lg" // ⬅️ إضافة rounded-lg لمظهر أفضل
            >
              Go Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section> 
  );
};

export default CheckoutSuccess;