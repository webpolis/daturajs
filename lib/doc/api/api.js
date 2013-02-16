YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "auth",
        "core",
        "db",
        "validator"
    ],
    "modules": [
        "auth",
        "core",
        "db",
        "validator"
    ],
    "allModules": [
        {
            "displayName": "auth",
            "name": "auth",
            "description": "Basic authentication mechanism.\n\nThe Auth Component currently does basically a few things:\n\nWhen initialized, it will lookup at the settings - src/config/main.js - and will \nlisten to any request made to the selected login route - config.loginUrl -.\nAfterwards, will instantiate the selected model - config.model - and will use \nmodel's 'auth' method to execute custom authentication logic (db lookup, etc).\nInternally, a cookie is generated - named 'auth' - containing basic user information.\n\nThe configuration parameters are as follow:\n\nloginUrl     - URL receiving POST fields for user information (username, password)."
        },
        {
            "displayName": "core",
            "name": "core",
            "description": "Main core file for custom framework implementation.\n\nThis module exports an object which have access to different components and \nhelpers to be made available to either models or controllers.\nAlso, it stores a reference to existing models so they can be accessed from any controller \nvia this.models."
        },
        {
            "displayName": "db",
            "name": "db",
            "description": "Database adapter.\n\nThis adapter acts as a proxy within your application and the ORM module chosen.\nCurrently it only supports Sequelize - http://www.sequelizejs.com/ - but more \nwill be added in the future.\n\nSupported adapters' strings: sequelize"
        },
        {
            "displayName": "validator",
            "name": "validator",
            "description": "Validation module."
        }
    ]
} };
});