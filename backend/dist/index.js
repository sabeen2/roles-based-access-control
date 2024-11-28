"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const protectedRoute_middleware_1 = __importDefault(require("./middlewares/protectedRoute.middleware"));
const manage_roles_router_1 = __importDefault(require("./routes/manage-roles.router"));
const get_user_roles_controller_1 = require("./controllers/manage-roles/get-user-roles.controller");
const booking_router_1 = __importDefault(require("./routes/booking.router"));
const author_router_1 = __importDefault(require("./routes/author.router"));
const review_router_1 = __importDefault(require("./routes/review.router"));
// const { specs, swaggerUi } = require("./utils/swagger.utils");
dotenv_1.default.config({ path: ".env" });
const app = (0, express_1.default)();
const port = process.env.PORT;
const apiPrefix = "api/v1";
const allowedOrigin = process.env.FRONTEND_URL;
// const swaggerDocument = require("./swagger-output.json");
// const corsOptions: CorsOptions = {
//   origin: (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void
//   ) => {
//     if (!origin || origin === allowedOrigin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true);
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
app.use(express_1.default.json({ limit: "16kb" }));
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(`/${apiPrefix}/get-user-roles`, protectedRoute_middleware_1.default, get_user_roles_controller_1.getUserRoles);
app.use(`/${apiPrefix}/auth`, auth_router_1.default);
app.use(`/${apiPrefix}/manage`, manage_roles_router_1.default);
app.use(`/${apiPrefix}/booking`, booking_router_1.default);
app.use(`/${apiPrefix}/author`, author_router_1.default);
app.use(`/${apiPrefix}/review`, review_router_1.default);
app.get(`/${apiPrefix}`, (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
