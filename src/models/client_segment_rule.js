/**
 * Client Segment Rule model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
module.exports = function(seq, dataTypes) {
	return seq.define("client_segment_rule", {
		"id" : {
			type : dataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true
		},
		"account_code_list" : {
			type : dataTypes.STRING, allowNull : true, max : 500
		},
		"approvers_list" : {
			type : dataTypes.STRING, allowNull : true, max : 500
		},
		"operator" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"line_amount" : {
			type : dataTypes.FLOAT, allowNull : true, max : 1245188
		},
		"is_active" : {
			type : dataTypes.BOOLEAN, allowNull : true
		},
		"created_date" : {
			type : dataTypes.DATE, allowNull : true
		},
		"created_by_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"client_id" : {
			type : dataTypes.INTEGER, allowNull : false
		},
		"accounting_segment_id" : {
			type : dataTypes.INTEGER, allowNull : false
		},
	},{
		instanceMethods : {
		// place your custom model methods below.
		}
	});
}