function(doc, req) {
	var template = require('vendor/mustache.couch').compile(this, doc.metadata.template);
	template.show(doc)
}