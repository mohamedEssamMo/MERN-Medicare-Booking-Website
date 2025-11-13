import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const Profile = ({ doctorData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  const [previewURL, setPreviewURL] = useState("");

  useEffect(() => {
    setFormData({
      name: doctorData?.name || "",
      email: doctorData?.email || "",
      phone: doctorData?.phone || "",
      bio: doctorData?.bio || "",
      gender: doctorData?.gender || "",
      specialization: doctorData?.specialization || "",
      ticketPrice: doctorData?.ticketPrice || 0,
      qualifications: doctorData?.qualifications || [],
      experiences: doctorData?.experiences || [],
      timeSlots: doctorData?.timeSlots || [],
      about: doctorData?.about || "",
      photo: doctorData?.photo || null,
    });
    setPreviewURL(doctorData?.photo || "");
  }, [doctorData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addItem = (key, item) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], item] }));
  };

  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const updatedItems = [...prev[key]];
      updatedItems[index][name] = value;
      return { ...prev, [key]: updatedItems };
    });
  };

  const deleteItem = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const addTimeSlot = (e) => {
    e.preventDefault();
    addItem("timeSlots", { day: "", startingTime: "", endingTime: "" });
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form onSubmit={updateProfileHandler}>
        {/* ---------------- Name ---------------- */}
        <div className="mb-5">
          <p className="form_label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form_input"
          />
        </div>

        {/* ---------------- Email ---------------- */}
        <div className="mb-5">
          <p className="form_label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form_input"
            readOnly
            aria-readonly
            disabled
          />
        </div>

        {/* ---------------- Phone ---------------- */}
        <div className="mb-5">
          <p className="form_label">Phone</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number"
            className="form_input"
          />
        </div>

        {/* ---------------- Bio ---------------- */}
        <div className="mb-5">
          <p className="form_label">Bio</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Short bio"
            className="form_input"
            maxLength={100}
          />
        </div>

        {/* ---------------- Grid Section ---------------- */}
        <div className="grid grid-cols-3 gap-5 mb-[30px]">
          <div>
            <p className="form_label">Gender</p>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="form_input py-3.5"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <p className="form_label">Specialization</p>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="form_input py-3.5"
            >
              <option value="">Select</option>
              <option value="surgeon">Surgeon</option>
              <option value="neurologist">Neurologist</option>
              <option value="dermatologist">Dermatologist</option>
            </select>
          </div>

          <div>
            <p className="form_label">Ticket Price</p>
            <input
              type="number"
              placeholder="100"
              name="ticketPrice"
              value={formData.ticketPrice}
              className="form_input"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* ---------------- Qualifications ---------------- */}
        <div className="mb-8">
          <p className="form_label">Qualifications</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index} className="mb-5 border-b pb-4">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form_label">Starting Date</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    onChange={(e) =>
                      handleReusableInputChangeFunc("qualifications", index, e)
                    }
                    className="form_input"
                  />
                </div>
                <div>
                  <p className="form_label">Ending Date</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    onChange={(e) =>
                      handleReusableInputChangeFunc("qualifications", index, e)
                    }
                    className="form_input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form_label">Degree</p>
                  <input
                    type="text"
                    name="degree"
                    value={item.degree}
                    onChange={(e) =>
                      handleReusableInputChangeFunc("qualifications", index, e)
                    }
                    className="form_input"
                  />
                </div>
                <div>
                  <p className="form_label">University</p>
                  <input
                    type="text"
                    name="university"
                    value={item.university}
                    onChange={(e) =>
                      handleReusableInputChangeFunc("qualifications", index, e)
                    }
                    className="form_input"
                  />
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteItem("qualifications", index);
                }}
                className="bg-red-600 text-white text-[18px] p-2 rounded-full mt-3 cursor-pointer"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={addQualification}
            className="bg-black py-2 px-5 text-white rounded cursor-pointer"
          >
            Add Qualification
          </button>
        </div>

        {/* ---------------- Experiences ---------------- */}
        <div className="mb-8">
          <p className="form_label">Experiences</p>
          {formData.experiences?.map((item, index) => (
            <div key={index} className="mb-5 border-b pb-4">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="form_label">Starting Date</p>
                  <input
                    type="date"
                    name="startingDate"
                    value={item.startingDate}
                    onChange={(e) =>
                      handleReusableInputChangeFunc("experiences", index, e)
                    }
                    className="form_input"
                  />
                </div>
                <div>
                  <p className="form_label">Ending Date</p>
                  <input
                    type="date"
                    name="endingDate"
                    value={item.endingDate}
                    onChange={(e) =>
                      handleReusableInputChangeFunc("experiences", index, e)
                    }
                    className="form_input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                  <p className="form_label">Position</p>
                  <input
                    type="text"
                    name="position"
                    value={item.position}
                    onChange={(e) =>
                      handleReusableInputChangeFunc("experiences", index, e)
                    }
                    className="form_input"
                  />
                </div>
                <div>
                  <p className="form_label">Hospital</p>
                  <input
                    type="text"
                    name="hospital"
                    value={item.hospital}
                    onChange={(e) =>
                      handleReusableInputChangeFunc("experiences", index, e)
                    }
                    className="form_input"
                  />
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteItem("experiences", index);
                }}
                className="bg-red-600 text-white text-[18px] p-2 rounded-full mt-3 cursor-pointer"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="bg-black py-2 px-5 text-white rounded cursor-pointer"
          >
            Add Experience
          </button>
        </div>

        {/* ---------------- Time Slots ---------------- */}
        <div className="mb-8">
          <p className="form_label">Available Time Slots</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index} className="mb-5 border-b pb-4">
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <p className="form_label">Day</p>
                  <input
                    type="text"
                    name="day"
                    value={item.day}
                    placeholder="e.g. Monday"
                    onChange={(e) =>
                      handleReusableInputChangeFunc("timeSlots", index, e)
                    }
                    className="form_input"
                  />
                </div>
                <div>
                  <p className="form_label">Start Time</p>
                  <input
                    type="time"
                    name="startingTime"
                    value={item.startingTime}
                    onChange={(e) =>
                      handleReusableInputChangeFunc("timeSlots", index, e)
                    }
                    className="form_input"
                  />
                </div>
                <div>
                  <p className="form_label">End Time</p>
                  <input
                    type="time"
                    name="endingTime"
                    value={item.endingTime}
                    onChange={(e) =>
                      handleReusableInputChangeFunc("timeSlots", index, e)
                    }
                    className="form_input"
                  />
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteItem("timeSlots", index);
                }}
                className="bg-red-600 text-white text-[18px] p-2 rounded-full mt-3 cursor-pointer"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={addTimeSlot}
            className="bg-black py-2 px-5 text-white rounded cursor-pointer"
          >
            Add Time Slot
          </button>
        </div>

        {/* ---------------- About ---------------- */}
        <div className="mb-8">
          <p className="form_label">About</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about yourself"
            onChange={handleInputChange}
            className="form_input"
          />
        </div>

        {/* ---------------- Photo Upload ---------------- */}
        <div className="mb-8 flex items-center gap-4">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor overflow-hidden">
              <img
                src={previewURL}
                alt="Doctor"
                className="w-full h-full object-cover"
              />
            </figure>
          )}

          <div className="relative w-[140px] h-[50px]">
            <input
              type="file"
              id="customFile"
              name="photo"
              onChange={handleFileInputChange}
              accept=".jpg,.png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute inset-0 flex items-center justify-center bg-[#0066ff46] text-headingColor font-semibold rounded-lg cursor-pointer text-[15px]"
            >
              Upload Photo
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
