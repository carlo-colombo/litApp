exports.litApp = function(opt){

	this.design = opt.design,
	this.userCtx = opt.userCtx,
	this.link = function (doc){
		return "/" + [this.userCtx.db,this.design._id,"_show/default",doc.id].join("/")
	},

	this.base = '/'+ this.userCtx.db + '/' + this.design._id;

	this.litAppHeader = '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>\
							<script src="http://twitter.github.com/bootstrap/1.4.0/bootstrap-tabs.js"></script>\
							<script src="http://twitter.github.com/bootstrap/1.4.0/bootstrap-modals.js"></script>\
							<script src="' + this.design + '/litApp/Control.js"></script>\
							<script src="' + this.design + '/litApp/Dialog.js"></script>\
							<script src="' + this.design + '/litApp/Bar.js"></script>\
							<link rel="stylesheet" href="http://twitter.github.com/bootstrap/1.4.0/bootstrap.min.css">'

	return this;
}