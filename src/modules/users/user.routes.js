import express from "express";

import {updateProfileController,addAddressController,
    updateAddressController,deleteAddressController,
    addPaymentMethodController,updatePaymentMethodController,
    deletePaymentMethodController,updatePrivacySettingsController,updateProfilePictureController} from "./user.controller.js";

import auth from "../../middlewares/authenticate.js";

const router = express.Router();

// Profile
router.patch("/profile", auth,updateProfileController);

// Addresses
router.post("/address",auth,addAddressController);

router.patch("/address/:addressId",auth,updateAddressController);

router.delete("/address/:addressId",auth,deleteAddressController);

// Payment Methods
router.post("/payment",auth,addPaymentMethodController);

router.patch("/payment/:paymentId",auth,updatePaymentMethodController);

router.delete("/payment/:paymentId",auth,deletePaymentMethodController);

// Privacy
router.patch("/privacy",auth,updatePrivacySettingsController);

// Profile Picture
router.patch("/profile-picture",auth,updateProfilePictureController);

export default router;
