import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const {
    data: appontments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/My-Appointment`)
  return (
    <div>
      {loading && !error && <Loading />}
      {!loading && error && <Error error={error} />}

      {!loading && !error &&  ( <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {
          appontments.map(doctor=> <DoctorCard 
            key={doctor._id} doctor={doctor} />)
        }

      </div>)}
        {!loading && !error && appontments.length === 0 && 
        <h2 className="mt-5 text-center  leading-7 text-[20px] font-semibold text-primaryColor">You did not book any doctor yet!</h2>}
    </div>
  )
}

export default MyBookings