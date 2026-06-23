import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

import Database from "./config/db.js";
new Database();

import userRoutes from "./Routes/userRoutes.js";
import empRoutes from "./Routes/empRoutes.js";

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api', empRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});