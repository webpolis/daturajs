/**
 * Client Rule Approver model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
module.exports = function(seq, dataTypes) {
	return seq.define("client_rule_approver", {
		"id" : {
			type : dataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true
		},
		"created_date" : {
			type : dataTypes.DATE, allowNull : true
		},
		"created_by_id" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"client_rule_id" : {
			type : dataTypes.INTEGER, allowNull : false
		},
		"user_id" : {
			type : dataTypes.INTEGER, allowNull : false
		},
	});
}