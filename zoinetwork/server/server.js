const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/auth-route');
const contactRouter = require('./routes/contact-route');
const adminRouter = require("./routes/admin-routes");
const connectDB = require("./utils/db");
const dotenv = require('dotenv');
const errorMiddleware = require("./middlewares/error-middleware");
var cors = require('cors');

dotenv.config()

corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD"
}


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/form', contactRouter);
app.use('/api/admin', adminRouter);

app.use(errorMiddleware)

connectDB().then(() => {
    app.listen(PORT, () => console.log("Server running on port " + PORT));
})