const foodmodel = require('../models/food.model');
const imagekit = require('../config/imagekit');
async function createfood(req, res) {
  const { name, description, category, price, isAvailable } = req.body;
  if (!req.file) {
    return res.status(400).json({
      message: "Image is required"
    })
  }
  const uploaded = await imagekit.upload({
    file: req.file.buffer, // buffer
    fileName: Date.now() + "-" + req.file.originalname,
    folder: "foods"
  });
  const food = await foodmodel.create({
    name,
    description,
    category,
    price,
    image: uploaded.url,
    isAvailable
  })
  res.status(201).json({
    message: "food created successfully",
    food
  })
}
async function getfood(req, res) {
  try {
    const foods = await foodmodel.find();

    res.status(200).json({
      message: "Foods retrieved successfully",
      foods,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch foods",
      error: error.message,
    });
  }
}
async function getfoodbyid(req, res) {
  try {
    const { id } = req.params;

    const food = await foodmodel.findById(id);

    if (!food) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.status(200).json({
      message: "Food item retrieved successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch food item",
      error: error.message,
    });
  }
}
async function updatefood(req, res) {
  try {
    const { id } = req.params;
    const { name, description, category, price, isAvailable } = req.body;

    let updatedData = {
      name,
      description,
      category,
      price,
      isAvailable
    };

    // ✅ If new image is uploaded
    if (req.file) {
      const uploaded = await imagekit.upload({
        file: req.file.buffer,
        fileName: Date.now() + "-" + req.file.originalname,
        folder: "foods"
      });

      updatedData.image = uploaded.url;
    }

    const food = await foodmodel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!food) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }
    res.status(200).json({
      message: "Food item updated successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update food item",
      error: error.message,
    });
  }
}
async function deletefood(req, res) {
  try {
    const { id } = req.params;

    const food = await foodmodel.findByIdAndDelete(id);

    if (!food) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.status(200).json({
      message: "Food item deleted successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete food item",
      error: error.message,
    });
  }
}

module.exports = {
  createfood,
  getfood,
  getfoodbyid,
  updatefood,
  deletefood

}