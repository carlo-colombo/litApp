function(doc) {
	/*
	* emit parent node (root if empty) and data to build
	* page tree
	*/
	emit([doc.metadata.path.slice(-2,-1)[0] || "root",doc.metadata.created], {
		"id": doc._id,
		"rev": doc._rev,
		"title": doc.title,
		"name" : doc.name,
		"template": doc.metadata.template,
		"children": doc.metadata.children,
		"path": doc.metadata.path
	});	
}
