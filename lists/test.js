function(head, req) {

	
  	var template = require('vendor/mustache.couch').compile(this, 'test');

  	template.stream({title: 'Notes'}, function(row) {
    	return row.doc;
  	})  	
}