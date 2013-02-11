/**
 * Invoice model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
var inflector = require('inflector');

exports.model = {
	// access your variables by adding the $$ prefix
	name : 'invoice',
	// map your database columns here
	fields : [
		{name : 'id', label : 'id'.humanize(), type : 'integer', required : true, primaryKey : true},
		{name : 'invoice_number', label : 'invoice_number'.humanize(), type : 'string', required : false, max : 50},
		{name : 'created_date', label : 'created_date'.humanize(), type : 'date', required : false},
		{name : 'invoice_date', label : 'invoice_date'.humanize(), type : 'date', required : false},
		{name : 'receipt_file', label : 'receipt_file'.humanize(), type : 'string', required : false, max : 512},
		{name : 'submitted_date', label : 'submitted_date'.humanize(), type : 'date', required : false},
		{name : 'submitted_by_id', label : 'submitted_by_id'.humanize(), type : 'integer', required : false},
		{name : 'requested_by_id', label : 'requested_by_id'.humanize(), type : 'integer', required : false},
		{name : 'required_date', label : 'required_date'.humanize(), type : 'date', required : false},
		{name : 'acc_approved_date', label : 'acc_approved_date'.humanize(), type : 'date', required : false},
		{name : 'acc_approved_by_id', label : 'acc_approved_by_id'.humanize(), type : 'integer', required : false},
		{name : 'approved_date', label : 'approved_date'.humanize(), type : 'date', required : false},
		{name : 'approved_by_id', label : 'approved_by_id'.humanize(), type : 'integer', required : false},
		{name : 'exported_date', label : 'exported_date'.humanize(), type : 'date', required : false},
		{name : 'exported_by_id', label : 'exported_by_id'.humanize(), type : 'integer', required : false},
		{name : 'rejected_date', label : 'rejected_date'.humanize(), type : 'date', required : false},
		{name : 'rejected_by_id', label : 'rejected_by_id'.humanize(), type : 'integer', required : false},
		{name : 'rejected_reason', label : 'rejected_reason'.humanize(), type : 'text', required : false},
		{name : 'rejected_invoice_id', label : 'rejected_invoice_id'.humanize(), type : 'integer', required : false},
		{name : 'project_name', label : 'project_name'.humanize(), type : 'string', required : false, max : 150},
		{name : 'address', label : 'address'.humanize(), type : 'string', required : false, max : 255},
		{name : 'address2', label : 'address2'.humanize(), type : 'string', required : false, max : 255},
		{name : 'city', label : 'city'.humanize(), type : 'string', required : false, max : 50},
		{name : 'state_id', label : 'state_id'.humanize(), type : 'string', required : false, max : 50},
		{name : 'zipcode', label : 'zipcode'.humanize(), type : 'string', required : false, max : 50},
		{name : 'country_id', label : 'country_id'.humanize(), type : 'string', required : false, max : 100},
		{name : 'bank_name', label : 'bank_name'.humanize(), type : 'string', required : false, max : 100},
		{name : 'bank_address', label : 'bank_address'.humanize(), type : 'string', required : false, max : 255},
		{name : 'bank_routing_number', label : 'bank_routing_number'.humanize(), type : 'string', required : false, max : 50},
		{name : 'bank_acct_number', label : 'bank_acct_number'.humanize(), type : 'string', required : false, max : 50},
		{name : 'is_wire_transfer', label : 'is_wire_transfer'.humanize(), type : 'boolean', required : false},
		{name : 'description', label : 'description'.humanize(), type : 'string', required : false, max : 2000},
		{name : 'total_amount', label : 'total_amount'.humanize(), type : 'float', required : false, max : 1179650},
		{name : 'is_deleted', label : 'is_deleted'.humanize(), type : 'boolean', required : false},
		{name : 'is_expense', label : 'is_expense'.humanize(), type : 'boolean', required : false},
		{name : 'is_saved', label : 'is_saved'.humanize(), type : 'boolean', required : false},
		{name : 'is_archived', label : 'is_archived'.humanize(), type : 'boolean', required : false},
		{name : 'is_billable', label : 'is_billable'.humanize(), type : 'boolean', required : false},
		{name : 'accounting_system_session_id', label : 'accounting_system_session_id'.humanize(), type : 'string', required : false, max : 50},
		{name : 'invoice_source', label : 'invoice_source'.humanize(), type : 'string', required : false, max : 50},
		{name : 'send_via', label : 'send_via'.humanize(), type : 'string', required : false, max : 50},
		{name : 'acc_approver', label : 'acc_approver'.humanize(), type : 'integer', required : false},
		{name : 'send_invoice', label : 'send_invoice'.humanize(), type : 'boolean', required : false},
		{name : 'forward_approver', label : 'forward_approver'.humanize(), type : 'integer', required : false},
		{name : 'created_by_id', label : 'created_by_id'.humanize(), type : 'integer', required : false},
		{name : 'modified_date', label : 'modified_date'.humanize(), type : 'date', required : false},
		{name : 'modified_by_id', label : 'modified_by_id'.humanize(), type : 'integer', required : false},
		{name : 'client_id', label : 'client_id'.humanize(), type : 'integer', required : true},
		{name : 'invoice_type_id', label : 'invoice_type_id'.humanize(), type : 'integer', required : true},
		{name : 'invoice_status_id', label : 'invoice_status_id'.humanize(), type : 'integer', required : true},
		{name : 'vendor_id', label : 'vendor_id'.humanize(), type : 'integer', required : true},
		{name : 'accounting_system_file_id', label : 'accounting_system_file_id'.humanize(), type : 'integer', required : true},
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