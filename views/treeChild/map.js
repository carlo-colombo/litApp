function(doc) {
	/*
	* emit parent node (root if empty) and data to build
	* page tree
	*/
	emit(doc._id, {
		"id": doc._id,
		"title": doc.title,
		"name" : doc.name,
		"template": doc.metadata.template,
		"children": doc.metadata.children
	});	
}