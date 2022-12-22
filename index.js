const fs = require('fs')
const datamaker = require('datamaker')
const { MongoClient } = require('mongodb')

// other parameters
const batchSize = process.env.BATCH_SIZE ? parseInt(process.env.BATCH_SIZE) : 5
const sleepTime = process.env.SLEEP ? parseInt(process.env.SLEEP) : 1000
const dbName = process.env.DATABASE_NAME || 'products'
const collName = process.env.COLLECTION_NAME || 'catalog'
const templateFile = process.env.TEMPLATE_FILE || './product.json'
const url = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'

// use CA?
const options = { }
if (process.env.MONGO_CA) {
  options.ssl = true
  options.sslValidate = true
  options.sslCA = Buffer.from(process.env.MONGO_CA, 'base64')
}

// create MongoDB client
const client = new MongoClient(url, options)

// load datamaker template
const template = fs.readFileSync(templateFile, { encoding: 'utf8' }).toString()

// sleep for ms milliseconds
const sleep = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

// generate random data
const generate = async (iterations) => {
  const retval = []
  return new Promise((resolve, reject) => {
    datamaker.generate(template, 'json', iterations)
    .on('data', (d) => {
      retval.push(JSON.parse(d))
    })
    .on('end', (d) => { 
      resolve(retval)
    })
  })
}

// main
const main = async () => {
  // connect to MongoDB
  console.log('Connecting to MongoDB', url)
  await client.connect()
  const db = client.db(dbName)
  const collection = db.collection(collName)

  // forever
  do {

    // generate random data
    console.log(`writing ${batchSize} products to ${dbName}/${collName}`)
    const products = await generate(batchSize)

    // write to database
    const insertResult = await collection.insertMany(products)
    console.log(insertResult)

    // wait
    await sleep(sleepTime)
  } while(1)
}

main()