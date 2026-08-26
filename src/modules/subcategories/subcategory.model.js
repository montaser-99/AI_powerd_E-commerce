import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
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

subcategorySchema.index({ category_id: 1, name_en: 1 }, { unique: true });
subcategorySchema.index({ category_id: 1, name_ar: 1 }, { unique: true });

export default mongoose.model('Subcategory', subcategorySchema);
