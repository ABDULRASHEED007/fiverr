import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import gigRoute from "./routes/gig.route.js"
import messageRoute from "./routes/message.route.js"
import conversationRoute from "./routes/conversation.route.js"
import orderRoute from "./routes/order.route.js"
import reviewRoute from "./routes/review.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();

try {
    await mongoose.connect(process.env.MONGO)
    console.log("Connected to DB")

} catch (error) {
    console.log(error)

}


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"

    return res.status(errorStatus).send(errorMessage)


})

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/orders", orderRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)
app.use("/api/reviews", reviewRoute)


app.get("/", () => {
    console.log("hello world")
})
app.listen(8800, () => {
    console.log("Server running")
})



// mongodb+srv://mdabdulrasheed007:FfRvomNTT2JRZ8CM@cluster0.4plwk4a.mongodb.net/?retryWrites=true&w=majority