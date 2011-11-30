function(doc, req) {
	var def = this.config.templates[doc.metadata.template],
		mc = require('vendor/mustache.couch'),
		litApp = new require('vendor/litApp').litApp({
			design: this,
			userCtx: req.userCtx
		})
	if(doc){
		var template = mc.compile(this, def.template || doc.metadata.template)
		//check user role
		template.partials['litAppHeader'] = true && req.query.preview!='true'
			? litApp.litAppHeader
			: '';
		
		template.show({
			content: doc,
			def: def,
			design: this,
			req: req,
			base: litApp.base
		})
	}
}