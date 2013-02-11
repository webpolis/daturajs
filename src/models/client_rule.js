/**
 * Client Rule model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var inflector = require('inflector');

exports.model = {
	// access your variables by adding the $$ prefix
	name : 'client_rule',
	// map your database columns here
	fields : [
		{name : 'id', label : 'id'.humanize(), type : 'integer', required : true, primaryKey : true},
		{name : 'default_auth_limit', label : 'default_auth_limit'.humanize(), type : 'float', required : false, max : 1179650},
		{name : 'is_active', label : 'is_active'.humanize(), type : 'boolean', required : false},
		{name : 'priority', label : 'priority'.humanize(), type : 'integer', required : false},
		{name : 'default_approvers', label : 'default_approvers'.humanize(), type : 'string', required : false, max : 500},
		{name : 'client_approvers', label : 'client_approvers'.humanize(), type : 'string', required : false, max : 500},
		{name : 'created_date', label : 'created_date'.humanize(), type : 'date', required : false},
		{name : 'created_by_id', label : 'created_by_id'.humanize(), type : 'integer', required : false},
		{name : 'modified_date', label : 'modified_date'.humanize(), type : 'date', required : false},
		{name : 'modified_by_id', label : 'modified_by_id'.humanize(), type : 'integer', required : false},
		{name : 'client_id', label : 'client_id'.humanize(), type : 'integer', required : true},
		{name : 'default_rule_id', label : 'default_rule_id'.humanize(), type : 'integer', required : true},
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