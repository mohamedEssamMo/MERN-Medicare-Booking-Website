import React from "react";
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const DoctorCard = ({ doctor }) => {
  const { name, avgRating, totalRating, photo, specialization, experiences } =
    doctor;

  return (
    <div className="p-3 lg:p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* Doctor Image */}
      <div className="w-full h-[300px] md:h-[320px] overflow-hidden rounded-lg flex justify-center items-center bg-gray-100">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Doctor Name */}
      <h2 className="text-[18px] leading-[30px] lg:text-[24px] lg:leading-8 text-headingColor font-[700] mt-3 lg:mt-5 truncate">
        {name}
      </h2>

      {/* Specialization & Rating */}
      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-3 lg:py-2 lg:px-5 text-[13px] lg:text-[15px] font-semibold rounded-md">
          {specialization}
        </span>

        <div className="flex items-center gap-[6px]">
          <span className="flex items-center gap-[4px] text-[14px] lg:text-[16px] font-semibold text-headingColor">
            <img src={starIcon} alt="star" className="w-4 h-4" /> {avgRating}
          </span>
          <span className="text-[13px] lg:text-[15px] text-textColor font-medium">
            ({totalRating})
          </span>
        </div>
      </div>

      {/* Experience and Link */}
      <div className="mt-4 lg:mt-5 flex items-center justify-between">
        <p className="text-[14px] lg:text-[15px] text-textColor">
          At {experiences && experiences[0]?.hospital}
        </p>

        <Link
          to={`/doctors/${doctor._id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-transparent transition-all duration-300"
        >
          <BsArrowRight className="w-5 h-5 text-[#181A1E] group-hover:text-white transition-colors duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
