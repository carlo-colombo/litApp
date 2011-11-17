function(doc,req){
	doc.metadata.children[doc.metadata.children.length] = req.form.child;
	return [doc,"" + doc.metadata.children.length];
}