function(doc,req){
	var p = req.form['path'],
		path = p ? p.split(',') : [];

	doc = {
		"_id": req.uuid,
		"name": "untitled",
		"metadata": {
			"path" : path.concat(req.uuid),
			"template" : Object.keys(this.config.templates)[0],
			"author": req.userCtx.name,
			"created": Date(),
			"children":[]
		}
	}

	return [doc,req.uuid];
}