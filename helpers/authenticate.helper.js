import _ from 'lodash'
import authsModel from '../models/auths.mongo'
import { msg } from './constants.helper'

// authentication middleware
async function authenticate(req, res, next) {
  const { authorization } = req.headers

  if(!authorization) return res.status(401).send({ message: msg.unauthorized })

  try {
    const validateToken = await authsModel.findOne({ token: authorization, active:1 })
    if(_.isEmpty(validateToken)) return res.status(401).send({ message: msg.unauthorized })
    next()
  }
  catch (e) { return res.status(401).send({ message: msg.unauthorized }) }
}

export default authenticate
