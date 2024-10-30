import express from "express";
import connect from "./fileUpload.js";
import router from "./dotenni.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/v3/app', router);
connect().then(() => {
    app.listen(3210, () => {
        console.log("Server is listening at 3210");
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
});
app.use((req, res, next) => {
    console.log(`Unhandled route: ${req.method} ${req.url}`);
    res.status(404).send("Route not found");
});
