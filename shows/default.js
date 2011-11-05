function(doc, req) {
	var def = this.config.templates[doc.metadata.template];
	var mc = require('vendor/mustache.couch')
	if(doc){
		var template = mc.compile(this, def.template || doc.metadata.template);
		template.show({
			content: doc,
			def: def,
			design: this
		})
	}
}