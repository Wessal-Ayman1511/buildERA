import connectDB from "./db/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import { globalError } from "./utils/error/global_error.js";
import { notFound } from "./utils/error/not_found.js";

const bootStrap = async (app, express) => {
  app.use(express.json());
  await connectDB();

  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  app.use(notFound);
  app.use(globalError);
};

export default bootStrap;
