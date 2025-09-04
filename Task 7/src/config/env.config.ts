// import { z } from "zod";

// // DON'T load dotenv here again if already loaded in main file
// // import dotenv from 'dotenv';
// // dotenv.config();

// // Use process.env directly since dotenv is loaded in main file

// const envSchema = z.object({
//   PORT: z.coerce.number().default(3000),
//   NODE_ENV: z
//     .enum(["development", "production", "test"])
//     .default("development"),
//   JWT_SECRET: z
//     .string()
//     .min(32, "JWT secret must be at least 32 characters long"),
//   JWT_EXPIRES_IN: z.string().default("7d"),
// });

// console.log(process.env);
// // Validate environment variables
// const env = envSchema.safeParse(process.env);

// if (!env.success) {
//   console.error("❌ Invalid environment variables:", env.error.format());
//   process.exit(1); // Exit if env validation fails
// }

// export const { PORT, NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN } = env.data;

// export const isProduction = NODE_ENV === "production";
// export const isDevelopment = NODE_ENV === "development";

// import dotenv from "dotenv";
// dotenv.config();

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev";

// // // Add console.log to debug
// console.log("🔧 Environment loaded:", {
//   PORT,
//   NODE_ENV,
//   HAS_JWT_SECRET: !!process.env.JWT_SECRET,
// });
