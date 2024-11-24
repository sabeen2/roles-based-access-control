import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router";
import getUser from "./controllers/auth/get-user.controller";
import protectedRoute from "./middlewares/protectedRoute.middleware";
import manageRolesRouter from "./routes/manage-roles.router";
import { getUserRoles } from "./controllers/manage-roles/get-user-roles.controller";
import bookingRouter from "./routes/booking.router";
// import swaggerUi from "swagger-ui-express";
// const { specs, swaggerUi } = require("./utils/swagger.utils");

dotenv.config({ path: ".env" });

const app: Application = express();
const port = process.env.PORT || 8000;
const apiPrefix = "api/v1";

const allowedOrigin = process.env.FRONTEND_URL;
// const swaggerDocument = require("./swagger-output.json");

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// app.use(
//   `/${apiPrefix}/api-docs`,
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument)
// );
app.use(express.json({ limit: "16kb" }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(`/${apiPrefix}/get-user-roles`, protectedRoute, getUserRoles as any);
app.use(`/${apiPrefix}/auth`, authRouter);
app.use(`/${apiPrefix}/manage`, manageRolesRouter);
app.use(`/${apiPrefix}/booking`, bookingRouter);

app.get(`/${apiPrefix}`, (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
