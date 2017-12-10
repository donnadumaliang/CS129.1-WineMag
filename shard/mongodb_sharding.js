// I. SETUP DOCKER
// 1. Create your project folder.
mkdir sharding

// 2. Create a "docker-compose.yml" file in your project folder.

// 3. Copy the contents of the "docker-compose.yml template" to the newly created "docker-compose.yml"

// 4. Start your services
docker-compose up

// 5. Login to "mongosetup"
docker-compose run mongosetup sh

// 6. Login to "mongos"
mongo mongos1:27017/wine

// II. SETUP SHARDING CLUSTER
// To add nodes to the sharding set
db.adminCommand( { addshard : "node1:27017" } )

db.adminCommand( { addshard : "node2:27017" } )

// To enable sharding for a database
db.adminCommand( { enablesharding : "wine" } )

// To check if sharding is successful
db.adminCommand( { listshards : 1 } );

// For more details about the sharding
db.printShardingStatus();


db.winewine.createIndex(
	{ 'country': 1 },
	{ name: 'country' }
)

sh.shardCollection(
	"wine.winewine",
	{ "country": 1 }
)

db1 = (new Mongo('node1:27017')).getDB('wine')
db2 = (new Mongo('node2:27017')).getDB('wine')
db1.winewine.count();
db2.winewine.count();
