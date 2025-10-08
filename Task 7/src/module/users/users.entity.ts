import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: userRoles;
  createdAt: Date;
  updatedAt: Date;
}

export type userRoles = "ADMIN" | "COACH" | "STUDENT";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["ADMIN", "COACH", "STUDENT"],
      required: true,
      default: "STUDENT",
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: false,
      transform: function (doc, ret) {
        ret.id = ret._id.toString();
        //@ts-ignore
        delete ret._id;
        //@ts-ignore
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Ensure virtual fields are serialized
userSchema.set("toJSON", {
  virtuals: true,
  transform: function (_doc, ret) {
    // Explicitly construct the return object
    return {
      id: ret._id.toString(),
      name: ret.name,
      email: ret.email,
      role: ret.role,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
      // Only include the fields you want to expose
    };
  },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
