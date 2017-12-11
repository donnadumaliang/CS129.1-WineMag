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
