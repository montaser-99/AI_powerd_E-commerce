import { updateProfile,addAddress,updateAddress,deleteAddress,addPaymentMethod,updatePaymentMethod,deletePaymentMethod,updatePrivacySettings,updateProfilePicture} from "./user.service.js";

export const updateProfileController = async(req,res)=>{
    try{const userId = req.user.userId
        const data = req.body
        const user = await updateProfile(userId , data)
        return res.status(201).json({message:"Profile updated successfully",user})

    }catch(error){
        return res.status(500).json({message:"error message"})
    }
}
export const addAddressController = async(req,res)=>{
    try{
        const userId = req.user.userId
        const addressData= req.body
        const user = await addAddress(userId,addressData)
        return res.status(201).json({message:"Address Added successfully",user})

    }catch (error){
        return res.status(500).json({message:"error message"})
    }
}

export const updateAddressController = async (req, res) => {
  try {
    const { addressId } = req.params;

    const userId = req.user.userId;

    const addressData = req.body;

    const user = await updateAddress(
      userId,
      addressId,
      addressData
    );

    return res.status(201).json({
      message: "Address updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteAddressController = async (req, res) => {
  try {
    const { addressId } = req.params;

    const userId = req.user.userId;

    const user = await deleteAddress(
      userId,
      addressId
    );

    return res.status(201).json({
      message: "Address deleted successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addPaymentMethodController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const paymentData = req.body;

    const user = await addPaymentMethod(userId, paymentData);

    return res.status(201).json({
      message: "Payment method added successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePaymentMethodController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { paymentId } = req.params;
    const paymentData = req.body;

    const user = await updatePaymentMethod(
      userId,
      paymentId,
      paymentData
    );

    return res.status(201).json({
      message: "Payment method updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePaymentMethodController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { paymentId } = req.params;

    const user = await deletePaymentMethod(
      userId,
      paymentId
    );

    return res.status(201).json({
      message: "Payment method deleted successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updatePrivacySettingsController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const privacyData = req.body;

    const user = await updatePrivacySettings(
      userId,
      privacyData
    );

    return res.status(200).json({
      message: "Privacy settings updated successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


export const updateProfilePictureController = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profilePicture = req.body.profile_picture;

    const user = await updateProfilePicture(
      userId,
      profilePicture
    );

    return res.status(200).json({
      message: "Profile picture updated successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};