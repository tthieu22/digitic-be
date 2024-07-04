const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const prodcategoryRouter = require("./routes/prodcategoryRoute")
const blogcategory = require("./routes/blogCatRoute")
const color = require("./routes/colorRoute")
const brand = require("./routes/brandRoute")
const coupon = require("./routes/couponRoute")

const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
dbConnect();
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", prodcategoryRouter);
app.use("/api/blog-category", blogcategory);
app.use("/api/brand", brand);
app.use("/api/coupon", coupon);
app.use("/api/color", color);


app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Sever is running at PORT ${PORT}`);
});

// app.use("/", (req, res) => {
//   res.send("hello from server side");
// });
