function(head, req) {
	var template = require('vendor/mustache.couch').compile(this,'admin_tree',{
		layout: 'admin_layout'
	});

	var ddoc = this;

	template.stream({
		title:'Admin',
		subtitle:'Tree view'
	},function(row){
		var templates = [];

		for(t in ddoc.config.templates){
			templates[templates.length]={
				name: ddoc.config.templates[t].name || t,
				template: t,
				selected: t == row.value.metadata.template
			}
		}

		return {
			level: row.value.metadata.path.length,
			content: row.value,
			templates: templates
		}
	});
}