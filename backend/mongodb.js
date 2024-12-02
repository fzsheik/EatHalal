const {MongoClient} = require('mongodb');


async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb://fzsheik:shark@195.26.255.44:27017/halalApp?authSource=halalApp";
 

    const client = new MongoClient(uri);
 
    try {
        
        await client.connect();
 
        const db = client.db("halalApp"); 
        const collections = await db.listCollections().toArray();
        console.log(collections); 
        
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.listCollections}`));
};

main().catch(console.error);

