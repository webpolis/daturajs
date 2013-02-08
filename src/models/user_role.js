/**
 * User Role model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
module.exports = function(seq, dataTypes) {
	return seq.define("user_role", {
		"id" : {
			type : dataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true
		},
		"user_role_name" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
	},{
		instanceMethods : {
		// place your custom model methods below.
		}
	});
}