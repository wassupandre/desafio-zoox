import express from 'express'
import mainController from '../controllers/main.controller'

const router = express.Router()

// return all cities
router.get('/',mainController.get)
// create a new city
router.post('/create',mainController.create)
// update city by id
router.put('/update',mainController.updateOne)
// delete city by id
router.delete('/delete/:id',mainController.deleteOne)

export default router
