import mongoose, { Schema } from "mongoose";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  creatorID: string;
}

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
      minlength: [3, "Title must be at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    image: {
      type: String,
      trim: true,
      default: null,
      validate: {
        validator: function (v: string) {
          // Simple URL validation - optional
          if (!v) return true; // Allow empty
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: "Please provide a valid image URL",
      },
    },
    creatorID: {
      type: String,
      required: [true, "Creator ID is required"],
      ref: "User", // Reference to User model if you're using population
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        const { _id, ...courseData } = ret;
        return {
          id: _id.toString(),
          ...courseData,
        };
      },
    },
  }
);

// Indexes for better query performance
courseSchema.index({ title: "text", description: "text" }); // Text search
courseSchema.index({ creatorID: 1 }); // For finding courses by creator
courseSchema.index({ createdAt: -1 }); // For sorting by latest

// Virtual for populating creator
courseSchema.virtual("creator", {
  ref: "User",
  localField: "creatorID",
  foreignField: "_id",
  justOne: true,
});

courseSchema.statics.findByCreator = function (creatorID: string) {
  return this.find({ creatorID }).sort({ createdAt: -1 });
};

courseSchema.statics.findByTitle = function (title: string) {
  return this.findOne({ title: new RegExp(title, "i") }); // Case-insensitive search
};

// Instance method to update course (optional)
courseSchema.methods.updateCourse = function (updates: Partial<ICourse>) {
  Object.assign(this, updates);
  return this.save();
};

const Course = mongoose.model("Course", courseSchema);
export default Course;
