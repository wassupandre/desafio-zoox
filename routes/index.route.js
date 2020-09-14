import express from 'express'
import citiesRoute from './cities.route'
import statesRoute from './states.route'
import authenticate from '../helpers/authenticate.helper'

const router = express.Router()

// App routes
router.use('/cities', authenticate,citiesRoute)
router.use('/states', authenticate,statesRoute)

export default router
