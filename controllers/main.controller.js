import citiesModel from '../models/cities.mongo'
import statesModel from '../models/states.mongo'
import { msg,validateUf } from '../helpers/constants.helper'
import _ from 'lodash'
import { Types } from 'mongoose'

// Removing 3 hours from UTC timezone
let now = new Date()
now.setHours(now.getHours() - 3)

// Method GET
// This controller is used in both routes /cities and /states
// This function just return all records from called url
// if you call /states it will returns all records from states and same for /cities
async function get(req,res){
  const fromUrl = req.originalUrl
  const typeModel = wichModel(res,fromUrl)
  await getRecords(res,typeModel)
}

// this function is called from get()
// it takes two args
// first one is res function from express
// second is the model to query the records
async function getRecords(res,model){
  try {
    const records = await model.find({}).sort({ createdAt: -1})
    // verify empty arrays
    if(_.isEmpty(records)) return res.status(404).send({ message: msg.empty })
    // return status code 200 and records found
    return res.status(200).send({ message: msg.success, records })
  }
  catch (e) { return res.status(500).send({ message: msg.serverError }) }
}

// Method POST
// same idea of the get function
async function create(req,res){
  const fromUrl = req.originalUrl.replace('/create','')
  const type = wichType(res,fromUrl)
  // finally call model to create record
  await createRecord(res,type,req.body)
}

// this function is called from create()
// it creates a new city or state record on database
async function createRecord(res,type,params){
  // create new city record
  if(type == 'cities'){
    const { name,stateId } = params
    if(!name || !stateId) return res.status(404).send({ message: msg.missingParams })

    // validating stateId
    try {
      const validateStateId = await statesModel.findOne({ _id: new Types.ObjectId(stateId) })
      if(_.isEmpty(validateStateId)) return res.status(406).send({ message: msg.invalid })
    }
    catch (e) { return res.status(500).send({ message: msg.serverError }) }

    // inserting new city
    try {
      await citiesModel.create({ name, stateId, createdAt: now, lastUpdate: now })
      return res.status(200).send({ message: msg.success })
    }
    catch (e) { return res.status(500).send({ message: msg.serverError }) }
  }

  // create new state record
  if(type == 'states'){
    const { name,abbreviation } = params
    validateUf(res,abbreviation.toUpperCase())

    if(!name || !abbreviation) return res.status(404).send({ message: msg.missingParams })

    // inserting new state
    try {
      await statesModel.create({ name, abbreviation: abbreviation.toUpperCase(), createdAt: now, lastUpdate: now })
      return res.status(200).send({ message: msg.success })
    }
    catch (e) { return res.status(500).send({ message: msg.serverError }) }
  }

  return res.status(418).send({ message: msg.teapod })
}

// Method PUT
// update city or state by id
async function updateOne(req,res){
  const fromUrl = req.originalUrl.replace('/update','')
  const id = req.body.id
  let type

  if(!id) return res.status(404).send({ message: msg.missingParams })

  // get model name from url
  if(fromUrl == '/cities'){
    type = 'cities'
    await validateId(res,citiesModel,id)
  }
  else if(fromUrl == '/states'){
    type = 'states'
    await validateId(res,statesModel,id)
  }
  else { return res.status(404).send({ message: msg.notFound }) }
  // finally call model to update the record
  await updateRecord(res,type,req.body.id,req.body)
}

// called from updateOne()
// updates city or state
async function updateRecord(res,type,id,params){
  delete params.id
  params.lastUpdate = now

  // update city info
  if(type == 'cities' ){
    try { await citiesModel.updateOne({ _id: new Types.ObjectId(id) }, params, { upset: false }) }
    catch (e) { return res.status(500).send({ message: msg.serverError }) }
  }

  // update state info
  if(type == 'states'){
    try { await statesModel.updateOne({ _id: new Types.ObjectId(id) }, params, { upset: false }) }
    catch (e) { return res.status(500).send({ message: msg.serverError }) }
  }

  return res.status(200).send({ message: msg.success })
}

// Method DELETE
// delete city or state for given id
async function deleteOne(req,res){
  const id = req.params.id
  const fromUrl = req.originalUrl.replace(`/delete/${id}` ,'')

  if(!id) return res.status(404).send({ message: msg.missingParams })

  // to delete an state we need to delete all cities attached to this state id
  if(fromUrl == '/states'){
    try { await citiesModel.deleteMany({ stateId: id })}
    catch (e) { return res.status(500).send({ message: msg.serverError }) }

    try { await statesModel.deleteOne({ _id: new Types.ObjectId(id) })}
    catch (e) { return res.status(500).send({ message: msg.serverError }) }
  }

  // only delete city for given id
  if(fromUrl == '/cities'){
    try { await citiesModel.deleteOne({_id: new Types.ObjectId(id)})}
    catch (e) { return res.status(500).send({ message: msg.serverError }) }
  }

  return res.status(200).send({ message: msg.success })
}

// validate given id from given model
async function validateId(res,model,id){
  try {
    const validateId = await model.find({ _id: new Types.ObjectId(id) })
    if(_.isEmpty(validateId)) return res.status(406).send({ message: msg.invalid })
  }
  catch (e) { return res.status(500).send({ message: msg.serverError }) }

}

function wichModel(res,url){
  // get model name from url
  let model
  if(url == '/cities'){ model = citiesModel }
  else if(url == '/states'){ model = statesModel }
  else { return res.status(404).send({ message: msg.notFound }) }
  return model
}

//return type from url
function wichType(res,url){
  let type
  if(url == '/cities'){ type = 'cities' }
  else if(url == '/states'){ type = 'states' }
  else { return res.status(404).send({ message: msg.notFound }) }
  return type
}
export default { get,create,updateOne,deleteOne }
