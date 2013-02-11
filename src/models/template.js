/**
 * Template model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var inflector = require('inflector');

exports.model = {
	// access your variables by adding the $$ prefix
	name : 'template',
	// map your database columns here
	fields : [
		{name : 'id', label : 'id'.humanize(), type : 'integer', required : true, primaryKey : true},
		{name : 'format', label : 'format'.humanize(), type : 'string', required : false, max : 300},
		{name : 'template_name', label : 'template_name'.humanize(), type : 'string', required : false, max : 300},
		{name : 'is_default', label : 'is_default'.humanize(), type : 'boolean', required : true},
		{name : 'start', label : 'start'.humanize(), type : 'integer', required : true},
		{name : 'end', label : 'end'.humanize(), type : 'integer', required : true},
		{name : 'user_id', label : 'user_id'.humanize(), type : 'integer', required : true},
		{name : 'invoice_type_id', label : 'invoice_type_id'.humanize(), type : 'integer', required : true},
	],
	// place your custom model methods below.
	methods : {
		$instanceMethod : function(){ console.log('Prefix your instance methods\' name with a dollar sign ($). Example: model.$instanceMethod()');},
		classMethod : function(){ console.log('This class method is accesed statically. Example: this.$$.models.modelName.classMethod()');}
	},
	relations : {
		hasOne:[],
		hasMany:[],
		belongsTo:[],
	}
}