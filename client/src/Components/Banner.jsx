import React from "react";

const Banner = () => {
  return (
    <div className="bg-gray-50 pt-5">
      <div className="md:max-w-4xl lg:max-w-6xl mx-auto">
        <img
          className="w-full mx-auto rounded-2xl"
          src="pharmacy-banner.jpg"
          alt=""
        ></img>
      </div>
    </div>
  );
};

export default Banner;
