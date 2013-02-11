YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "core",
        "db"
    ],
    "modules": [
        "core",
        "db"
    ],
    "allModules": [
        {
            "displayName": "core",
            "name": "core",
            "description": "Main core file for custom framework implementation.\n\nThis module exports an object which have access to different components and \nhelpers to be made available to either models or controllers.\nAlso, it stores a reference to existing models so they can be accessed from any controller \nvia this.$$.models."
        },
        {
            "displayName": "db",
            "name": "db",
            "description": "Database adapter.\n\nThis adapter acts as a proxy within your application and the ORM module chosen.\nCurrently it only supports Sequelize - http://www.sequelizejs.com/ - but more \nwill be added in the future.\n\nSupported addapters' strings: sequelize"
        }
    ]
} };
});