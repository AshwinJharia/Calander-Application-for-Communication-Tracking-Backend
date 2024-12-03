const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const CompanyRoutes = require('./routes/companyRoutes');
const CommRoutes = require('./routes/commuMethodRoutes');
const AuthRoutes = require('./routes/authRoutes');
const NotificationRoutes = require('./routes/notificationRoutes');
const CommunicationRoutes = require('./routes/commuRoutes');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

// Improved MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();
// Routes
app.use("/api/companies", CompanyRoutes);
app.use("/api/communications", CommRoutes);
app.use("/api/notifications", NotificationRoutes);
app.use("/api/communications-user", CommunicationRoutes);
app.use("/api", AuthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
