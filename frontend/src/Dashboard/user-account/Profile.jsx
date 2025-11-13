import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        photo: user.photo || "",
        gender: user.gender || "",
        bloodType: user.bloodType || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    try {
      const data = await uploadImageToCloudinary(file);
      setSelectedFile(data.url);
      setFormData((prev) => ({ ...prev, photo: data.url }));
    } catch (err) {
      console.error("Upload failed:", err.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) throw new Error(message);

      toast.success(message);
      navigate("/users/profile/me");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md"
    >
      {/* Name */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Enter Your Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-[16px] leading-7 text-headingColor placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryColor"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-[16px] leading-7 text-headingColor placeholder:text-gray-400 bg-gray-100 cursor-not-allowed"
          readOnly
          aria-readonly
        />
      </div>

      {/* Password */}
      <div className="mb-5">
        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-[16px] leading-7 text-headingColor placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryColor"
        />
      </div>

      {/* Blood Type */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Blood Type"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-[16px] leading-7 text-headingColor placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryColor"
          required
        />
      </div>

      {/* Gender */}
      <div className="mb-5">
        <label className="block text-headingColor font-semibold text-[16px] mb-2">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-[15px] text-textColor font-semibold focus:outline-none focus:ring-2 focus:ring-primaryColor"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Avatar Upload */}
      <div className="mb-5 flex items-center gap-4">
        {formData.photo && (
          <figure className="w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-primaryColor flex-shrink-0 shadow-sm">
            <img
              src={formData.photo}
              alt="profilePic"
              className="w-full h-full object-cover"
            />
          </figure>
        )}

        <div className="relative w-[180px] h-[50px]">
          <input
            type="file"
            name="photo"
            id="customFile"
            onChange={handleFileInputChange}
            accept=".jpg,.png"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
          <label
            htmlFor="customFile"
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#0066ff15] text-primaryColor font-semibold rounded-lg cursor-pointer border border-primaryColor hover:bg-primaryColor hover:text-white transition-colors duration-200"
          >
            {selectedFile ? selectedFile.name : "Upload Photo"}
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-7">
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-primaryColor text-white text-[18px] leading-[30px] font-semibold rounded-lg px-4 py-3 hover:bg-blue-700 transition-colors duration-200 disabled:opacity-70"
        >
          {loading ? (
            <HashLoader size={25} color="#ffffff" />
          ) : (
            "Update Profile"
          )}
        </button>
      </div>
    </form>
  );
};

export default Profile;
