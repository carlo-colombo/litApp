exports.litApp = function(opt){

	this.design = opt.design,
	this.userCtx = opt.userCtx,
	this.link = function (doc){
		return "/" + [this.userCtx.db,this.design._id,"_show/default",doc._id].join("/")
	},

	this.base = '/'+ this.userCtx.db + '/' + this.design._id;

	return this;
}