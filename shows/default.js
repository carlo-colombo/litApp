function(doc, req) {
	var def = this.config.templates[doc.metadata.template];
	var mc = require('vendor/mustache.couch')
	if(doc){
		var template = mc.compile(this, def.template || doc.metadata.template);
		doc.def = def;
		doc.design  = this;
		template.show(doc)
	}
}