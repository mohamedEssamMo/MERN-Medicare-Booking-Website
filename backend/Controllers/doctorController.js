import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({ success: true, message: 'Successfully updated', data: updatedDoctor });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update' });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id, { $set: req.body }, { new: true });
    res.status(200).json({ success: true, message: 'Successfully deleted', data: deletedDoctor });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to deleted' });
  }
};

export const getSingleDoctor= async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id,).select("-password");
    res.status(200).json({ success: true, message: 'Doctor found', data: doctor });
  } catch (error) {
    res.status(404).json({ success: false, message: 'No Doctor found' });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } }
        ]
      }).select("-password");
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select("-password");
    }

    res.status(200).json({
      success: true,
      message: "All approved doctors found",
      data: doctors
    });
  } catch (error) {
    console.error(error); // helpful for debugging
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

