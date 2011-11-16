function(doc,req){

	doc = {
		"_id": req.uuid,
		"name": "untitled",
		"metadata": {
			"path" : req.form['path'] 
				? req.form['path'].split(',').concat(req.uuid)
				: [req.uuid],
			"template" : Object.keys(this.config.templates)[0],
			"author": req.userCtx.name,
			"created": Date()
		}
	}

	return [doc,'lol'];
}