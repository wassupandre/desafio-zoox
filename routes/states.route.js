import express from 'express'
import mainController from '../controllers/main.controller'

const router = express.Router()

// return all states
router.get('/',mainController.get)
// create new state
router.post('/create', mainController.create)
// update state by id
router.put('/update',mainController.updateOne)
// delete state by id
router.delete('/delete/:id',mainController.deleteOne)


export default router
