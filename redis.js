const { createClient } = require('redis');


const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

async function testCache() {
await client.connect();


const article = {
    id: 'mumu',
    name: 'mimu',
    blog: 'client',
  };

await client.set('key', 'value');

await client.publish('mumi', JSON.stringify(article));
}

testCache()