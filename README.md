# CS129.1-WineMag
Angelo,Dumaliang,Gamboa,Tan,Villanueva

How to load the dataset
1. copy dataset to mongosetup folder
2. in the terminal, run mongoimport --db wine --collection wine_lists --type csv --headerline --file /data/db/winemag.csv --host mongos1 --port 27017

How to setup the Replicate sets
1. copy docker compose yml file in replicate folder to project folder
2. run docker-compose up
3. run "docker-compose run mongosetup sh" and mongo --host mongo1:27017 wine
4. Run the following lines of code
    // 1. Setup the configuration for the replica set
  var cfg = {
	"_id": "wine",
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
		}
		
	]
}
rs.initiate( cfg );

How to execute and run the MapReduce functions
1. log in to db using "docker-compose run mongosetup sh" and "mongo --host mongo1:27017 wine"
2. run mapreduce.js file on terminal

How to shard the MapReduce collection
1. copy docker compose yml file in shard folder to project folder
2. run docker-compose up
3. run "docker-compose run mongosetup sh" and "mongo mongos1:27017/wine"
4. run the following codes as well
  db.adminCommand( { addshard : "node1:27017" } )
  db.adminCommand( { addshard : "node2:27017" } )
  db.adminCommand( { enablesharding : "wine" } )

  // To check if sharding is successful
  db.adminCommand( { listshards : 1 } );

  // For more details about the sharding
  db.printShardingStatus();


  db.wine_lists.createIndex(
  	{ 'country': 1 },
  	{ name: 'country' }
  )

  sh.shardCollection(
  	"wine.wine_lists",
  	{ "country": 1 }
  )

  db1 = (new Mongo('node1:27017')).getDB('wine')
  db2 = (new Mongo('node2:27017')).getDB('wine')
  db1.wine.count();
  db2.wine.count();
