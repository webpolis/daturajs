/**
 * Client Bank model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var inflector = require('inflector');

exports.model = {
	// access your variables by adding the $$ prefix
	name : 'client_bank',
	// map your database columns here
	fields : [
		{name : 'id', label : 'id'.humanize(), type : 'integer', required : true, primaryKey : true},
		{name : 'bank_name', label : 'bank_name'.humanize(), type : 'string', required : false, max : 250},
		{name : 'default_bank_id', label : 'default_bank_id'.humanize(), type : 'integer', required : false},
		{name : 'description', label : 'description'.humanize(), type : 'string', required : false, max : 1000},
		{name : 'connection_type', label : 'connection_type'.humanize(), type : 'string', required : false, max : 100},
		{name : 'web_address', label : 'web_address'.humanize(), type : 'string', required : false, max : 250},
		{name : 'username', label : 'username'.humanize(), type : 'string', required : false, max : 50},
		{name : 'password', label : 'password'.humanize(), type : 'string', required : false, max : 50},
		{name : 'security_word', label : 'security_word'.humanize(), type : 'string', required : false, max : 50},
		{name : 'apikey', label : 'apikey'.humanize(), type : 'string', required : false, max : 50},
		{name : 'created_date', label : 'created_date'.humanize(), type : 'date', required : false},
		{name : 'created_by_id', label : 'created_by_id'.humanize(), type : 'integer', required : false},
		{name : 'modified_date', label : 'modified_date'.humanize(), type : 'date', required : false},
		{name : 'modified_by_id', label : 'modified_by_id'.humanize(), type : 'integer', required : false},
		{name : 'is_visible', label : 'is_visible'.humanize(), type : 'boolean', required : false},
		{name : 'client_id', label : 'client_id'.humanize(), type : 'integer', required : true},
	],
	// place your custom model methods below.
	methods : {
		$instanceMethod : function(){ console.log('Prefix your instance methods\' name with a dollar sign ($). Example: model.$instanceMethod()');},
		classMethod : function(){ console.log('This class method is accesed statically. Example: this.models.modelName.classMethod()');}
	},
	relations : {
		hasOne:[],
		hasMany:[],
		belongsTo:[],
	}
}