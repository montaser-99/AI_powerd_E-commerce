import userModel from '../users/user.model.js'

export const updateProfile = async(useId, data)=>{
    const user =await userModel.findByIdAndUpdate(
        useId, 
        data,{
new:true,
runValidators:true
        })

        if(!user){
            throw new Error("User not found")
        }
        return user;
    };
export const addAddress = async(userId , addressData)=>{
    const user = await userModel.findByIdAndUpdate(
        userId,
     {$push:{addresses:addressData}},{
     new:true,
     runValidators:true
     })

      if(!user){
            throw new Error("User not found")
        }
        
        const addressExists = user.addresses.some((address)=> 
            address.address=== addressData.address && address.city === addressData.city);
        if(addressExists){
            throw new Error("Address already exists")
        }

        user.address.push(addressData);
        await user.save();
        return user
}

export const updateAddress = async (userId, addressId, addressData) => {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const address = user.addresses.id(addressId);

  if (!address) {
    throw new Error("Address not found");
  }

  Object.assign(address, addressData);

  await user.save();

  return user;
};

export const deleteAddress = async (userId, addressId) => {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const address = user.addresses.id(addressId);

  if (!address) {
    throw new Error("Address not found");
  }

  address.deleteOne();

  await user.save();

  return user;
};

export const addPaymentMethod = async (userId, paymentData) => {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.paymentMethods.push(paymentData);

  await user.save();

  return user;
};

export const updatePaymentMethod = async (
  userId,
  paymentId,
  paymentData
) => {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const paymentMethod = user.paymentMethods.id(paymentId);

  if (!paymentMethod) {
    throw new Error("Payment method not found");
  }

  Object.assign(paymentMethod, paymentData);

  await user.save();

  return user;
};


export const deletePaymentMethod = async (userId, paymentId) => {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const paymentMethod = user.paymentMethods.id(paymentId);

  if (!paymentMethod) {
    throw new Error("Payment method not found");
  }

  paymentMethod.deleteOne();

  await user.save();

  return user;
};

export const updatePrivacySettings = async (userId, privacyData) => {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  Object.assign(user.privacy_settings, privacyData);

  await user.save();

  return user;
};

export const updateProfilePicture = async (userId, profilePicture) => {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.profile_picture = profilePicture;

  await user.save();

  return user;
};

