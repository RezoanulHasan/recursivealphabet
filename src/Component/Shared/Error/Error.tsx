import React from "react";

import { Link } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";

const Error: React.FC = () => {
  useTitle("Error");

  return (
    <div>
      <section className="flex items-center h-screen p-16 bg-gray-100 text-gray-900">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h1 className="text-center text-4xl mb-5">
              Page not <span className="text-accent">Found </span>
            </h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=996&t=st=1714550013~exp=1714550613~hmac=87f5c30d1fd38b82f5d3d178168b45c56877032229980930aa3708db7b9bba66"
                alt="error image"
                width={1000}
                height={1000} // Set your desired height
              />
            </div>
            <Link to="/" className="btn mt-5 bg-teal-300">
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
