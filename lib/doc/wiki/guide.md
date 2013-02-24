There are plenty of other frameworks out there that were built for **node**, but most of them lack of the functionality i require for my projects. While the MVC fits great with a wide variety of projects, i have found very difficult to have a somehow well structured application without loosing the opportunity to do it over *node*. With performance in mind, but also thinking of complex relationships schema, i cannot rely on NoSQL solutions only and also i want to ensure i will start coding ASAP.

So, with these ideas in mind i decided to create a custom MVC framework, built on top of *node* & *expressjs*, and (optionally for you) implementing the fabulous *AngularJS* javascript library to significantly improve user experience.

# Why daturajs?

Why learning another framework? Because this one is *node based* hence it has greater performance, and it also holds the concepts you already know, so your transition to the *node world* becomes less painful.

## Installation

When you're done extracting the package or cloning the repository, issue the following command in order to install required node modules

```
npm install -d
```

Since this is a very young project, it stills under construction, so it currently supports the following database engines (although we plan to add *mongodb* support very soon)

* MySQL
* PostgreSQL
* SQLite

## Conventions

The ORM engine being used with daturajs requires you to follow a few specific naming conventions for your database objects. Below is a list of requirements

* Name your tables using **plural** and lower case. Example: *users*, *projects*, *user_projects*, etc.
* Use just *id* as the primary key, instead of *user_id* for *users* table.

When using the **skeleton generator**, note that model names are converted to **camel case** and also *singular*. So, for example if you have *contact_projects* table, this is translated to *contactProject*.

## Defining Models

Below is a simple example of our *user* model, as defined in src/models/user.js

<pre>
exports.model = {
	fields : [
		{name : 'id', label : 'id', type : 'integer', required : true, primaryKey : true},
		{name : 'username', label : 'Username', type : 'string', required : false, max : 200},
		{name : 'email', label : 'Email', type : 'string', required : false, max : 350},
		{name : 'password', label : 'Password', type : 'string', required : false, max : 200}
	],
        methods : {
            getListableColumns : function(){
                return ['id','username','email']
            }
        },
        relations : {
            hasOne:[],
            hasMany:[],
            belongsTo:[
                {model:'company', alias:'company', foreignKey: 'company_id'},
            ]
        }
}
</pre>

Basically, it's a node module with a *model* property set.

From a controller's point of view, the model can be reached like this ``var user = this.models.user;``. The *user* var has now a version of the *user* class, and so its public static methods - like *getListableColumns* method above - can be reached like this ``user.getListableColumns()``. Note that methods are included in the *methods* property of our *user* object, such as the database fields are defined within the *fields* property. This is one choice originally made to keep our code clean and well sorted.

### Field types
Available field types are 

* string
* text
* date
* integer
* float

### Instance vs. Static

Due to the lack of *protected* or *static* keywords definition in Javascript, i need to explicitly distinguish between *instance* methods and *static* ones, in order to make my life easier when debugging. Your *instance* methods names must be prefixed with a ``$`` (dollar sign). So, if we add a new function to our *methods* array named ``$getCompanyAddress`` it will look like this

<pre>
        methods : {
            $getCompanyAddress : function(){
                return this.company.address + ', ' + this.company.address2;
            },
            getListableColumns : function(){
                return ['id','username','email']
            }
        }
</pre>

Note that *this* points to an already loaded instance of one *user* record, and that's why we can access now its fields' values from within an *instance* method like this: ``this.username`` will return ``johnny`` in our sample scenario.
If we look at the *user* instance returned by ``console.log(this.models.user.getInstance())``, we'll see the following dump

<pre>
{
  getInstance: [Function],
  getListableColumns: [Function],
  getFields': [Function],
  '$getCompanyAddress': [Function],
  '$beforeSave': [Function],
  '$afterSave': [Function],
  '$beforeFind': [Function],
  '$afterFind': [Function],
  '$update': [Function],
  '$delete': [Function],
  '$validate': [Function],
  '$watch': [Function],
  '$$isNewRecord': true,
  '$$name': 'user',
  id: [Getter/Setter],
  username: [Getter/Setter],
  password: [Getter/Setter],
  email: [Getter/Setter]
}
</pre>

A brief explanation of the above:

* *$$name* is a read-only attribute defined by the framework.

> All properties that you define in your model object will be prepended with ``$$`` to avoid overriding the fields coming from the database.

* *getInstance* will return a null-initialized instance of the model when called without arguments

### Watchers

You can *watch* or monitor any change made to your model's properties, all of them or just a few, and apply modifications to it if necessary!

<pre>
var user = this.models.user.getInstance()
user.$watch('username, password', function(prop, value){
   if(prop === 'password') return md5(value);
   if(prop === 'username') return username.trim();
});

user.username = ' test';
user.password = '123456';
</pre>

Now if you dump the *username* or *password* values, you'll see a trimmed version of the username and the MD5 hash of the password.
You can also use ``*`` to watch them all.

### Model Callbacks

These events are pretty self explanatory, and you can find further information in the API documentation - available soon-.

* $beforeFind
* $afterFind
* $beforeSave
* $afterSave

## Find method

The following code snippet shows one example covering most options available while retrieving information from our data source

<pre>
var _this = this;
user.find('all', {
   conditions : ["email LIKE '%@:domain'"],
   fields : ['id','username','email'],
   'with'   : ['company'],
   params : {
       domain : _this.data.domain
   },
   order : 'id DESC, username ASC'
}, function(_users){
   console.log(_users[0].$getCompanyAddress();
});
</pre>

The above snippet does the following: retrieves a list of users whose email belongs to the specified domain in ``data.domain``. *data* is a special variable available in a controller, holding the body parameters of a POST request. Finally, we display the company's address for the first record; note the *with* option which is enclosed by single quotes to prevent conflict with the reserved javascript keyword **with**. In this case, *with* will also include the related model *company* in the results.

In the above example, we set only one condition, but we are able to concatenate multiple conditions with the special AND and OR keywords.

<pre>
conditions : {
   and : ['password IS NOT NULL', 'email IS NOT NULL'],
   or  : ["email = 'developer@:domain'", "email = 'webmaster@:domain'"]
}
</pre>

The above conditions will produce a query that will retrieve *all users whose password and email address are not empty* and they are *either the developer or webmaster in a specific domain*.