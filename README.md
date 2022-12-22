# mongodatamaker

A MongoDB test data generator

## Usage

Clone repo

```sh
npm install
```

## Configuration

Environment variables:

- `MONGO_URL` e.g. `mongodb://username:password@0.0.0.0:27017`
- `MONGO_CA` - the base64 encoded CA certificate for IBM Databases for MongoDB
- `BATCH_SIZE` - the number of documents to write per batch. Default `5`.
- `SLEEP` - time taken to pause between batches - default `1000` (ms)
- `DATABASE_NAME` - the name of the database - default `products`
- `COLLECTION_NAME` - the name of the collection - default `catalog`
- `TEMPLATE_FILE` - the path to the template file - default `./product.json`

## Usage

```sh
# default settings
node index.js

# advanced usage
BATCH_SIZE=10 SLEEP=100 node index.js
```