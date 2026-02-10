import React from "react";

const page = () => {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center -mt-30">
      <div className="max-w-3xl text-center">
        <h1 className="text-6xl font-bold mb-6">About Us</h1>
        <p className="text-4xl mb-4">Welcome to TaskHub! </p>
        <p className="text-2xl mb-4">
          Our mission is to provide a simple yet powerful platform that empowers
          individuals and teams to organize their work, track progress, and
          achieve their goals faster.
        </p>
        <p className="text-2xl">
          At TaskHub, we believe productivity should be effortless and
          enjoyable. Join us on this journey and take control of your tasks
          today!
        </p>
      </div>
    </div>
  );
};

export default page;
