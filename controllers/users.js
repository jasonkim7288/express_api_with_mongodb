const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
  // Callback
  // index: (req, res, next) => {
  //   User.find({}, (err, users) => {
  //     if (err) {
  //       next(err);
  //     }

  //     res.status(200).json(users);
  //   })
  //   // res.status(200).json({
  //   //   message: "You requested user page"
  //   // });
  // },

  // Promise
  // index: (req, res, next) => {
  //   User.find({})
  //     .then(users => {
  //       res.status(200).json(users);
  //     })
  //     .catch(err => {
  //       next(err);
  //     })
  // },

  // Async await
  // index: async(req, res, next) => {
  //   try {
  //     const users = await User.find({});
  //     res.status(200).json(users)
  //   } catch(err) {
  //     next(err);
  //   }
  // },

  // Use express-promise-router
  index: async(req, res, next) => {
      const users = await User.find({});
      res.status(200).json(users)
  },

  // Callback
  // newUser: (req, res, next) => {
  //   console.log('req.body:', req.body)
  //   const newUser = new User(req.body);
  //   console.log('newUser:', newUser)
  //   newUser.save((err, user) => {
  //     if (err) {
  //       next(err);
  //     }
  //     res.status(200).json(user);
  //   })
  // }

  // Promise
  // newUser: (req, res, next) => {
  //   const newUser = new User(req.body);
  //   newUser.save()
  //     .then(user => {
  //       res.status(200).json(user);
  //     })
  //     .catch(err => {
  //       next(err);
  //     })
  // }

  // Async await
  // newUser: async(req, res, next) => {
  //   try {
  //     const newUser = new User(req.body);
  //     const user = await newUser.save();
  //     res.status(200).json(user);
  //   } catch(err) {
  //     next(err);
  //   }
  // }

  // Use express-promise-router
  newUser: async(req, res, next) => {
      // const newUser = new User(req.body);
      const newUser = new User(req.value.body);
      const user = await newUser.save();
      res.status(200).json(user);
  },

  show: async(req, res, next) => {
    // const { userId } = req.params;
    const { userId } = req.value.params;

    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  update: async(req, res, next) => {
    // const { userId } = req.params;
    // const updatedUser = req.body;
    const { userId } = req.value.params;
    const updatedUser = req.value.body;

    const result = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
    res.status(200).json(result);
  },

  showUserCars: async(req, res, next) => {
    // const { userId } = req.params;
    const { userId } = req.value.params;

    // normal populate
    const user = await User.findById(userId).populate('cars');
    res.status(200).json(user.cars)

    // nested populate
    //
    // const user = await User.findById(userId).populate({
    //   path: 'cars',
    //   populate: {
    //     path: 'seller',
    //     model: 'user'
    //   }
    // });
    // res.status(200).json(user.cars)

    // use where
    //
    // const user = await User.findById(userId);
    // res.status(200).json(await Car.where('_id').in(user.cars).exec());



  },

  createUserCar: async(req, res, next) => {
    // const { userId } = req.params;
    const { userId } = req.value.params;

    // const newCar = new Car(req.body);
    const newCar = new Car(req.value.body);

    const user = await User.findById(userId);

    newCar.seller = user;

    await newCar.save();

    user.cars.push(newCar);

    await user.save();
    res.status(200).json(newCar);
  }
}

// Interact with mongoose
// 1) Callbacks
// 2) Promises
// 3) Async/Await (Promises)