const router = require('express-promise-router')();

const CarsController = require('../controllers/cars');

const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
  .get(CarsController.index)
  .post(validateBody(schemas.carSchema), CarsController.create);

router.route('/:carId')
  .get(validateParam(schemas.idSchema, 'carId'), CarsController.show)
  .put([validateParam(schemas.idSchema, 'carId'),
        validateBody(schemas.userCarSchema)],
        CarsController.update)
  .patch([validateParam(schemas.idSchema, 'carId'),
          validateBody(schemas.carOptionalSchema)],
          CarsController.update)
  .delete(validateParam(schemas.idSchema, 'carId'), CarsController.destroy);

module.exports = router;