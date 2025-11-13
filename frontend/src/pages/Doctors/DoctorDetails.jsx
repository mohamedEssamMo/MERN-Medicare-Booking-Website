import { useState } from "react";
import { useParams } from "react-router-dom";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../config";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();

  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo,
  } = doctor;

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            {/* Doctor Information Section */}
            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <figure className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-md border border-gray-200 flex-shrink-0">
                  <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </figure>

                <div className="text-center sm:text-left">
                  <span className="inline-block bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] lg:text-[16px] font-semibold rounded">
                    {specialization}
                  </span>

                  <h3 className="text-headingColor text-[22px] lg:text-[26px] font-bold mt-3">
                    {name}
                  </h3>

                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[14px] lg:text-[16px] font-semibold text-headingColor">
                      <img src={starIcon} alt="rating" className="w-4 h-4" />
                      {averageRating}
                    </span>
                    <span className="text-[14px] lg:text-[16px] font-[400] text-textColor">
                      ({totalRating})
                    </span>
                  </div>

                  <p className="text__para text-[14px] md:text-[15px] text-textColor leading-6 mt-2 max-w-[390px]">
                    {bio}
                  </p>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="mt-[60px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`py-2 px-5 mr-5 text-[16px] font-semibold transition-colors ${
                    tab === "about"
                      ? "text-primaryColor border-b-2 border-primaryColor"
                      : "text-headingColor hover:text-primaryColor"
                  }`}
                >
                  About
                </button>

                <button
                  onClick={() => setTab("feedback")}
                  className={`py-2 px-5 mr-5 text-[16px] font-semibold transition-colors ${
                    tab === "feedback"
                      ? "text-primaryColor border-b-2 border-primaryColor"
                      : "text-headingColor hover:text-primaryColor"
                  }`}
                >
                  Feedback
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-[50px]">
                {tab === "about" && (
                  <DoctorAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                    experiences={experiences}
                  />
                )}
                {tab === "feedback" && (
                  <Feedback reviews={reviews} totalRating={totalRating} />
                )}
              </div>
            </div>

            {/* Side Panel */}
            <div>
              <SidePanel
                doctorId={doctor._id}
                ticketPrice={ticketPrice}
                timeSlots={timeSlots}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;
