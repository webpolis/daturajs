/**
 * Invoice Approver model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nico@webpolis.com.ar>
 */
var inflector = require('inflector');

exports.model = {
	// access your variables by adding the $$ prefix
	name : 'invoice_approver',
	// map your database columns here
	fields : [
		{name : 'id', label : 'id'.humanize(), type : 'integer', required : true, primaryKey : true},
		{name : 'approval_date', label : 'approval_date'.humanize(), type : 'date', required : false},
		{name : 'rejection_date', label : 'rejection_date'.humanize(), type : 'date', required : false},
		{name : 'rejection_reason', label : 'rejection_reason'.humanize(), type : 'string', required : false, max : 500},
		{name : '_approval_date', label : '_approval_date'.humanize(), type : 'date', required : false},
		{name : 'reject_date', label : 'reject_date'.humanize(), type : 'date', required : false},
		{name : 'invoice_id', label : 'invoice_id'.humanize(), type : 'integer', required : true},
		{name : 'invoice_line_id', label : 'invoice_line_id'.humanize(), type : 'integer', required : true},
		{name : 'client_rule_id', label : 'client_rule_id'.humanize(), type : 'integer', required : true},
		{name : 'user_id', label : 'user_id'.humanize(), type : 'integer', required : true},
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