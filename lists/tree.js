function(head, req) {
	var template = require('vendor/mustache.couch').compile(this,'admin_tree');

	template.stream({title:'admin view'},function(row){
		return row.value;
	});
}