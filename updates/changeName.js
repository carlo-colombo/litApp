function(doc,req){
	doc.name =req.form.name;
	return [doc,doc.name];
}