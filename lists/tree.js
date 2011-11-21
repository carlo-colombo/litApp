function(head, req) {

	var ddoc = this,
		litApp = new require('vendor/litApp').litApp({
			design: ddoc,
			userCtx: req.userCtx	
		}),
		template = require('vendor/mustache.couch').compile(this,'admin_tree',{
			layout: 'admin_layout'
		});

	template.stream({
		title:'Admin',
		subtitle:'Tree view',
		footer: 'litApp admin &copy;2011',
		design: litApp.base
	},function(row){
		var templates = [];

		for(t in ddoc.config.templates){
			templates[templates.length]={
				name: ddoc.config.templates[t].name || t,
				template: t,
				selected: t == row.value.template ? 'selected' :''
			}
		}

		return {
			content: row.value,
			link: litApp.link(row.value),
			templates: templates,
			children: row.value.children.join(',')
		}
	});
}