db.system.js.remove({_id: "getMatch"});
 wines = db.wine_lists.find(
  {
    description: {$in:[/Juicy/,/Rich/,/Ripe/,/Delicious/,/Balanced/,/Fresh/,
      /Impressive/,/Smooth/,/Silky/,/Opulent/,/Beautiful/,/Gorgeous/,
    /Wonderful/,/Exceptional/,/Polished/,/Top-notch/,/Sophisticated/,/Perfect/,
    /Decadent/,/Remarkable/,/Oaky/,/Fruity/,/Crisp/,/Soft/,/Noble/]}
  },
  {
    country:1,
    _id:0
  }
).toArray()
db.matches.deleteMany({})
db.matches.insert(wines)
getMatch = function(wines){
  result = [];
  result = wines.country;
  return result
}
db.system.js.save({
	_id: 'getMatch',
	value: getMatch
});
map = function(){
	var matches = getMatch(this);
	emit({
		matches:matches

	},
	{
		count: 1
	});

}

reduce = function(key,values){
	var total = 0;
	for (var i = 0; i< values.length; i++){
		total += values[i].count;
	}
	return { count: total};
}

results = db.runCommand({
	mapReduce: 'matches',
	map:map,
	reduce:reduce,
	out:'wine_lists.answer4'
});

db.wine_lists.answer4.find().pretty()
