import mongoose, { Schema } from 'mongoose'
import { databaseUrl } from '../helpers/constants.helper'

mongoose.connect(databaseUrl, { useNewUrlParser: true,useUnifiedTopology: true  })

// creating cities schema
const schema = new Schema({
  name: { type: String },
  stateId: { type: String },
  createdAt: { type: Date },
  lastUpdate: { type: Date }
})

export default mongoose.model('cities', schema)
