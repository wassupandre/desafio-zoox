const databaseUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBKEY}@cluster0.gspwf.mongodb.net/passpo?retryWrites=true&w=majority`

const msg = {
  success: 'Success.',
  unauthorized: 'Not authorized.',
  notFound: 'Not found.',
  missingParams: 'Missing body params.',
  serverError: 'Internal server error.',
  teapod: 'I\'m a teapot.',
  empty: 'No records found.',
  invalid: 'Invalid id.',
  invalidUf: 'Invalid state abbreviation.'
}

function validateUf(res,uf){
  let isValid = false
  const statesArray = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','SC','SP','SE','TO']
  if(statesArray.indexOf(uf) == -1) return res.status(406).send({ message: msg.invalidUf})
}

export { databaseUrl,msg,validateUf }
