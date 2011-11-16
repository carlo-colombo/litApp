function(head, req) {

	var ddoc = this,
		litApp = new require('vendor/litApp').litApp(ddoc),
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
				selected: t == row.value.metadata.template ? 'selected' :''
			}
		}

		return {
			level: row.value.metadata.path.length,
			content: row.value,
			link: litApp.link(row.value),
			templates: templates
		}
	});
}