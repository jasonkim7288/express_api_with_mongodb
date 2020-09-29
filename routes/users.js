// const router = express.Router();
const router = require('express-promise-router')();

const UsersController = require('../controllers/users');

const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(UsersController.index)
  .post(validateBody(schemas.userSchema), UsersController.newUser);

router.route('/:userId')
  .get(validateParam(schemas.idSchema, 'userId'), UsersController.show)
  .put([validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.userSchema)],
        UsersController.update)
  .patch([validateParam(schemas.idSchema, 'userId'),
          validateBody(schemas.userOptionalSchema)],
          UsersController.update);

router.route('/:userId/cars')
  .get(validateParam(schemas.idSchema, 'userId'), UsersController.showUserCars)
  .post([validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.userCarSchema)],
        UsersController.createUserCar);



module.exports = router;