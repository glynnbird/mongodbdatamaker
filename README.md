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
- `MONGO_CA_FILE` - the filename containing the CA certificate for IBM Databases for MongoDB
- `BATCH_SIZE` - the number of documents to write per batch. Default `5`.
- `SLEEP` - time taken to pause between batches - default `1000` (ms)
- `DATABASE_NAME` - the name of the database - default `products`
- `COLLECTION_NAME` - the name of the collection - default `catalog`
- `TEMPLATE_FILE` - the path to the template file - default `./product.json`

## Usage

```sh
# default settings
npm run start

# advanced usage
export MONGO_URL=mongodb://username:password@mymongohost.com:27017
BATCH_SIZE=10 SLEEP=100 npm run start
```