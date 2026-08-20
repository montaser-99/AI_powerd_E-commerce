import Joi from 'joi'

const updateProfileSchema = Joi.object({
    firstName:Joi.string().trim().min(2).max(20),
    lasttName:Joi.string().trim().min(2).max(20),
    phone:Joi.string().trim(),
});

const addressSchema = Joi.object({
    label:Joi.string().trim().required(),
    address:Joi.string().trim().required(),
    city:Joi.string().trim().required(),
    isDefault:Joi.boolean().default(false),
})

const paymentMethodSchema = Joi.object({
    type:Joi.string().valid("card","wallet").required(),
    last4:Joi.string().length(4),
    provider:Joi.string().trim()
})

export {updateProfileSchema,addressSchema,paymentMethodSchema}
