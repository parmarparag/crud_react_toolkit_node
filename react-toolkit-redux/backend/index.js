import express from "express";
import route from "./routes/userRoute.js";
const port = 3000;
import cors from "cors";

const app = express();
// const corsOptions = {
//     origin : "http://localhost:3001",
//     credential : true
// }
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", route);

app.listen(port, () => {
  console.log(`Server Running at Port : ${port} `);
});
