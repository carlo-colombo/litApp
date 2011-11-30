function(doc,req){
	var i = doc.metadata.children.indexOf(req.form.child);
	if(i!=-1){
		doc.metadata.children.splice(i,1)
	}
	return [doc,doc.metadata.children.join(',')];
}