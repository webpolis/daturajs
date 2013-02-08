/**
 * State model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
module.exports = function(seq, dataTypes) {
	return seq.define("state", {
		"id" : {
			type : dataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true
		},
		"state_name" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"state_code" : {
			type : dataTypes.STRING, allowNull : true, max : 50
		},
		"display_order" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"country_id" : {
			type : dataTypes.INTEGER, allowNull : false
		},
	},{
		instanceMethods : {
		// place your custom model methods below.
		}
	});
}