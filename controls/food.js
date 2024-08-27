const Food = require('../model/foodschema');
const multer = require('multer');
const path = require('path');

// Multer storage konfiguratsiyasi
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

// Get FastFood
const getFastFood = async (req, res) => {
    try {
        const allFood = await Food.find();
        return res.status(200).json({
            success: true,
            message: "FastFood topildi!",
            innerData: allFood
        });
    } catch (error) {
        console.error("Server xatosi:", error);
        return res.status(500).json({ success: false, message: "Serverda xato", error: error.message });
    }
};

// Create FastFood
const createFastFood = async (req, res) => {
    try {
        const { name, price, image } = req.body;
        const existingFood = await Food.findOne({ name, price });

        if (existingFood) {
            return res.status(400).json({
                success: false,
                message: "Bu ovqat allaqachon mavjud!"
            });
        } 

        const newFood = new Food({ name, price, image });
        await newFood.save();
        return res.status(201).json({
            success: true,
            message: "Ovqat muvaffaqiyatli qo'shildi!"
        });

    } catch (error) {
        console.error("Server xatosi:", error);
        return res.status(500).json({
            success: false,
            message: "Serverda xato",
            error: error.message
        });
    }
};

// Delete FastFood
const deleteFastFood = async (req, res) => {
    try {
        const { _id } = req.params;
        const deleted = await Food.findByIdAndDelete(_id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Food topilmadi!",
                innerData: deleted
            });
        }
        return res.status(200).json({
            success: true,
            message: "Food o'chirildi!",
            innerData: deleted
        });
    } catch (error) {
        console.error("Server xatosi:", error);
        return res.status(500).json({
            success: false,
            message: "Serverda xato",
            error: error.message
        });
    }
};

// Update FastFood
const updateFastFood = async (req, res) => {
    try {
        const { _id } = req.params;
        const { name, price } = req.body;
        const updatedFood = await Food.findByIdAndUpdate(_id, { name, price }, { new: true });

        if (!updatedFood) {
            return res.status(404).json({
                success: false,
                message: "Food yangilanmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Food yangilandi!",
            innerData: updatedFood
        });
    } catch (error) {
        console.error("Server xatosi:", error);
        return res.status(500).json({
            success: false,
            message: "Serverda xato",
            error: error.message
        });
    }
};

// Upload Image
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Tasvir yuborilmadi' });
        }

        const { name, price } = req.body;
        const imagePath = req.file.path;  // Tasvir manzili

        const newFood = new Food({ name, price, image: imagePath });
        await newFood.save();

        return res.status(201).json({
            success: true,
            message: "Ovqat va tasvir muvaffaqiyatli qo'shildi!",
            innerData: newFood
        });
    } catch (error) {
        console.error("Server xatosi:", error);
        return res.status(500).json({
            success: false,
            message: "Serverda xato",
            error: error.message
        });
    }
};

// Update Food Image
const updateFoodImage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Tasvir yuborilmadi' });
        }

        const imagePath = req.file.path;  // Tasvir manzili
        const updatedFood = await Food.findByIdAndUpdate(id, { image: imagePath }, { new: true });

        if (!updatedFood) {
            return res.status(404).json({
                success: false,
                message: "Ovqat topilmadi"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ovqat tasviri yangilandi!",
            innerData: updatedFood
        });
    } catch (error) {
        console.error("Server xatosi:", error);
        return res.status(500).json({
            success: false,
            message: "Serverda xato",
            error: error.message
        });
    }
};

module.exports = {
    getFastFood,
    createFastFood,
    deleteFastFood,
    updateFastFood,
    uploadImage,
    updateFoodImage
};
