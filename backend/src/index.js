import app from "./app/app.js";
import connectDB from "./configs/db.config.js";

await connectDB()
app.listen(3000, () => console.log("Server is running on port 3000"))