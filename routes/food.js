const { Router } = require('express');
const multer = require('multer');
const { uploadImage, updateFoodImage, getFastFood, createFastFood, deleteFastFood, updateFastFood } = require('../controls/food');

// Multer yuklash sozlamalari
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

const food = Router();

food.get('/getFastFood', getFastFood);
food.post('/createFastFood', createFastFood);
food.put('/updateFastFood/:_id', updateFastFood);
food.delete('/deleteFastFood/:_id', deleteFastFood);

// Tasvirni yuklash
food.post('/uploadImage', upload.single('image'), uploadImage);

// Tasvirni yangilash
food.put('/updateFoodImage/:id', upload.single('image'), updateFoodImage);

module.exports = food;
