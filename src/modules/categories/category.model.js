const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name_en: { type: String, required: true, trim: true, maxlength: 150 },
    name_ar: { type: String, required: true, trim: true, maxlength: 150 },
    image: { type: String, default: null },
    image_public_id: { type: String, default: null },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

categorySchema.index({ name_en: 1 });
categorySchema.index({ name_ar: 1 });

module.exports = mongoose.model('Category', categorySchema);
