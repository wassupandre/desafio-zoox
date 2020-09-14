import mongoose, { Schema } from 'mongoose'
import { databaseUrl } from '../helpers/constants.helper'

mongoose.connect(databaseUrl, { useNewUrlParser: true,useUnifiedTopology: true  })

// creating auth schema
const schema = new Schema({
  token: { type: String },
  createdBy: { type: String },
  createdAt: { type: Date },
  active: { type: Number }
})

export default mongoose.model('auths', schema)
