function(doc,req){
	doc.metadata.template =req.form.template;
	return [doc,''];
}