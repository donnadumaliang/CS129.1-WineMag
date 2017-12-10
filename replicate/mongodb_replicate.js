// I. SETUP DOCKER
// 1. Create your project folder.
mkdir mongo_replicates

// 2. Create a "docker-compose.yml" file in your project folder.

// 3. Copy the contents of the "docker-compose.yml template" to the newly created "docker-compose.yml"

// 4. Start your services
docker-compose up

// 5. Login to "mongosetup"
docker-compose run mongosetup sh

// 6. Login to "mongo1"
mongo --host mongo1:27017 stock



// II. SETUP REPLICA SET
// 1. Setup the configuration for the replica set
var cfg = {
	"_id": "stock",
	"version": 1,
	"members": [
		{
			"_id": 0,
			"host": "mongo1:27017",
			"priority": 1
		},
		{
			"_id": 1,
			"host": "mongo2:27017",
			"priority": 0
		},
		{
			"_id": 2,
			"host": "mongo3:27017",
			"priority": 0
		},
		{
			"_id": 3,
			"host": "mongo4:27017",
			"priority": 0
		},
		{
			"_id": 4,
			"host": "mongo5:27017",
			"priority": 0
		}
	]
}
rs.initiate( cfg );
// 2. Initiate the replica set using the configuration
rs.initiate( cfg );

// 3. After iniiating, set and find the reading preference to the nearest node
e
// III. Test Replica Set
// 1. Create "names" collection and insert a document.
db.names.insert(
	{ name: 'NOEL VICTORINO' }
)

// 2. Check if the document is recorded.
db.names.find()

// 3. Exit from the current node
exit

// 4. Login to the secondary node i.e. 'mongo2'
mongo --host mongo2:27017 wine

// 5. Everytime you switch a node, execute this command.
db.setSlaveOk()

// 6. Check collections in this node
show collections;

// 7. Check if the document recorded from 'mongo1' has been replicated to 'mongo2'
db.names.find()


docker cp winemag.csv proj2_mongosetup_1:/data/winemag.csv

mongoimport --db wine --collection wine_lists --type csv --headerline --file /data/db/winemag.csv --host mongos1 --port 27017

copy to mongosetup
cd /data/db
ls
