/**
 * Country model.
 *
 * Auto-generated by modelGenerator.
 *
 * @author Nicolas Iglesias <nicolas@clevertech.biz>
 */
module.exports = function(seq, dataTypes) {
	return seq.define("country", {
		"id" : {
			type : dataTypes.INTEGER, allowNull : false, primaryKey : true, autoIncrement : true
		},
		"country_code" : {
			type : dataTypes.STRING, allowNull : true, max : 100
		},
		"country_name" : {
			type : dataTypes.STRING, allowNull : true, max : 150
		},
		"country_name_short" : {
			type : dataTypes.STRING, allowNull : true, max : 100
		},
		"display_order" : {
			type : dataTypes.INTEGER, allowNull : true
		},
		"is_visible" : {
			type : dataTypes.BOOLEAN, allowNull : true
		},
	});
}