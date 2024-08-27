const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // .env faylidan muhit o'zgaruvchilarini o'qish

const app = express();
app.use(express.json());
app.use(cors());

// Statik fayllarni xizmat qilish
app.use('/uploads', express.static('uploads'));

// MongoDB bilan ulanish
async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed", error);
    }
}

// Ma'lumotlar bazasiga ulanish
connectToDB();

// Routers
const food = require('./routes/food');
app.use('/food', food);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
