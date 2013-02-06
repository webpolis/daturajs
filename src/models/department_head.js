/**
 * Department Head model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
module.exports = function(seq, dataTypes) {
	return seq.define("department_head", {
		"id" : {
			type : dataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true
		},
		"department_id" : {
			type : dataTypes.INTEGER, allowNull : false
		},
		"user_id" : {
			type : dataTypes.INTEGER, allowNull : false
		},
	},{
		instanceMethods : {
		// place your custom model methods below.
		}
	});
}