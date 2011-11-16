exports.litApp = function(design){

	this.design = design,
	this.link = function (doc){
		return "/litapp/" + this.design._id + "/_show/default/"+doc._id;
	},
	this.base = '/'+ design.db + '/' + design._id;

	return this;
}