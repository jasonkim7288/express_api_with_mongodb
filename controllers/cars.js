const Car = require('../models/car');
const User = require('../models/user');

module.exports = {
  index: async (req, res, next) => {
    const cars = await Car.find({}).populate('seller');
    res.status(200).json(cars)
  },

  create: async (req, res, next) => {
    // const seller = await User.findById(req.body.seller);
    const seller = await User.findById(req.value.body.seller);

    // const newCar = req.body;
    const newCar = req.value.body;
    delete newCar.seller;

    const car = new Car(newCar);
    car.seller = seller
    await car.save();

    seller.cars.push(car)
    await seller.save();

    res.status(200).json(car)
  },

  show: async (req, res, next) => {
    const car = await Car.findById(req.value.params.carId);
    res.status(200).json(car);
  },

  update: async (req, res, next) => {
    const { carId } = req.value.params;

    const updatedCar = req.value.body;

    const result = await Car.findByIdAndUpdate(carId, updatedCar, { new: true });
    res.status(200).json(result);
  },

  destroy: async (req, res, next) => {
    const { carId } = req.value.params;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ error: 'Car doesn\'t exist'})
    }

    const sellerId = car.seller;
    const seller = await User.findById(sellerId);

    await car.remove();

    seller.cars.pull(car);
    await seller.save();

    res.status(200).json({ success: true})
  }
}