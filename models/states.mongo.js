import mongoose, { Schema } from 'mongoose'
import  { databaseUrl } from '../helpers/constants.helper'

mongoose.connect(databaseUrl, { useNewUrlParser: true,useUnifiedTopology: true  })

// creating states schema
const schema = new Schema({
  name: { type: String },
  abbreviation: { type: String },
  createdAt: { type: Date },
  lastUpdate: { type: Date }
})

export default mongoose.model('states', schema)
