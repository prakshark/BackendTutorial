import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import userRouter from './routes/user.routes.js';

const app = express();

app.use(cors({
    origin: ['*'],
    credentials: true
}));

app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(express.static("public"))

app.use(cookieParser());


// Routes import :-
import userRouter from './routes/user.routes.js';

// Routes Declaration :-
app.use("/api/v1/users", userRouter)

export default app;