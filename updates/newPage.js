function(doc,req){
	doc = {},
	doc._id = req.uuid,
	doc.metadata = {
		path : req.form['path'].split(',').concat(req.uuid)
	},
	doc.metadata.template = Object.keys(this.config.templates)[0],
	doc.name = 'untitled';

	return [doc,'lol'];
}