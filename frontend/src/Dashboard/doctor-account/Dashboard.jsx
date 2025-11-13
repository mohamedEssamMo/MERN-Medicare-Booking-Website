import { useState } from "react";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Tabs from "./Tabs";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import Profile from "./Profile";
import defaltDoctor from "../../assets/images/doctor-img01.png";
import Appointment from "./Appointments";

const Dashboard = () => {
  const { data: doctorData, loading, error } = useFetchData(`${BASE_URL}/doctors/profile/me`);
  const [tab, setTab] = useState("overview");

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-[1200px] px-5 mx-auto">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left side — Tabs */}
            <aside className="bg-white shadow-md rounded-2xl p-6 sticky top-20 h-fit">
              <Tabs tab={tab} setTab={setTab} />
            </aside>

            {/* Right side — Content */}
            <div className="lg:col-span-2">
              {/* Approval Alert */}
              {doctorData?.isApproved === "pending" && (
                <div className="flex items-start p-4 mb-6 text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 mt-1 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm0 9a1 1 0 100-2v-3a1 1 0 00-1-1H9a1 1 0 100 2v3a1 1 0 001 1h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 text-sm font-medium">
                    Your profile is under review. You’ll be notified once approved.
                  </span>
                </div>
              )}

              {/* Tab content */}
              <div className="mt-6">
                {tab === "overview" && (
                  <div className="bg-white shadow-md rounded-2xl p-6 md:p-8">
                    {/* Doctor Header */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                      <figure className="w-[160px] h-[160px] rounded-xl overflow-hidden shadow-sm">
                        <img
                          src={doctorData?.photo || defaltDoctor}
                          alt={doctorData?.name || "Doctor photo"}
                          className="w-full h-full object-cover"
                        />
                      </figure>

                      <div className="text-center sm:text-left">
                        <span className="inline-block bg-[#CCF0F3] text-irisBlueColor py-1 px-4 rounded-full text-sm font-semibold mb-2">
                          {doctorData?.specialization}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-800">
                          {doctorData?.name}
                        </h3>

                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                          <span className="flex items-center gap-1 text-gray-700 font-semibold">
                            <img src={starIcon} alt="rating star" className="w-5 h-5" />
                            {doctorData?.averageRating || 0}
                          </span>
                          <span className="text-gray-500 text-sm">
                            ({doctorData?.totalRating || 0})
                          </span>
                        </div>

                        <p className="text-gray-600 mt-3 leading-relaxed text-sm md:text-base max-w-md">
                          {doctorData?.bio || "Doctor bio not provided."}
                        </p>
                      </div>
                    </div>

                    {/* Doctor About */}
                    <DoctorAbout
                      name={doctorData?.name}
                      about={doctorData?.about}
                      qualifications={doctorData?.qualifications}
                      experiences={doctorData?.experiences}
                    />
                  </div>
                )}

                {tab === "appointments" && (
                  <div className="bg-white shadow-md rounded-2xl p-6">
                    <Appointment appointments={doctorData.appointments} />
                  </div>
                )}

                {tab === "settings" && (
                  <div className="bg-white shadow-md rounded-2xl p-6">
                    <Profile doctorData={doctorData} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
