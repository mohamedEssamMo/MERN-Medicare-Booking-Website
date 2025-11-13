import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js"
import Doctor from "../models/DoctorSchema.js"

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({ success: true, message: 'Successfully updated', data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update' });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id, { $set: req.body }, { new: true });
    res.status(200).json({ success: true, message: 'Successfully deleted', data: deletedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to deleted' });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id,).select("-password");
    res.status(200).json({ success: true, message: 'User found', data: user });
  } catch (error) {
    res.status(404).json({ success: false, message: 'No user found' });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({}).select("-password")
    res.status(200).json({ success: true, message: 'All users found', data: allUser });
  } catch (error) {
    res.status(404).json({ success: false, message: 'not found' });
  }
};

export const getUserProfile = async(req,res)=>{
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({Success:false, message:'User not found'})
    }
    
    const {password, ...rest} = user._doc;
    res.status(200).json({success:true, message:'profile info is getting', data:{...rest}})

  } catch (err) {  
    return res.status(500).json({Success:false, message:`something went wrong : ${err}`})
    
  }
}

export const getMyAppointments = async (req, res) => {
  try {
    const userId = req.userId;
    const bookings = await Booking.find({ user: userId });

    const doctorIds = bookings.map(el => el.doctor);
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select("-password");

    res.status(200).json({
      success: true,
      message: "Appointments retrieved successfully",
      data: doctors,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: `Something went wrong: ${err}` });
  }
};
