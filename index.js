const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const testRouter = require("./routers/test.router");
const userRouter = require("./routers/user.router");
const licenseKeyRouter = require("./routers/licenseKey.router");

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/test", testRouter);
app.use("/api/user", userRouter);
app.use("/api/key", licenseKeyRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
