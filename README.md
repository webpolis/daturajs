##  nodejs application framework (aka daturajs)

## Introduction

This framework is somehow inspired in the MVC pattern, followed by some PHP frameworks - CakePHP, Yii -.
The base concept is to provide an easy to mantain and extensible application framework 
purely based on the Javascript language - and its father ECMAScript (http://www.ecmascript.org/) -.
Due to the different natures of PHP and JS, some developers might find the js OOP patterns 
hard to follow, so some good knowledge of this subject is required in order to use daturajs.

By default, daturajs includes REST support so it's good for applications offering 
a REST API endpoint, providing you the opportunity to separate business logic from 
the presentation layer, and also serving your API to other clients such a mobile app 
or PHP application.

## Directory structure

Not being that far from its PHP counterparts, daturajs provides an understandable 
tree, containing most common folders for a web framework - althought this framework 
it is not only intended to be used in websites -.
The current state of the project reflects the following structure:

.
|-- doc                     <=== Recommended place for storing db dumps or own relevant information.
|   `-- db
|-- lib                     <=== Core libraries and modules for custom framework implementation.
                            No modifications may be needed to be done by the developer.
|   |-- adapters            <=== ORM adapters, etc. Many will be added in the future.
|   |-- components          <=== Core components widely used, including authentication.
|   |-- console             <=== Scripts that will generate models, controllers and views.
                            More features will be added in the future - generate full app skeleton -.
|   |-- controllers         <=== Basic setup of application's controllers
|   |   `-- rest
|   `-- models              <=== Basic setup of application's models.
|-- node_modules            <=== All nodejs libraries and dependencies are stored here.
|-- public                  <=== This folder is publicly accessed via GET /
|   |-- css
|   |-- img
|   `-- js
`-- src                     <=== Most of your custom development tasks occur here.
    |-- assets              <=== Assets that require some processing before being made public.
    |   `-- less            <=== Lesscss file that will be compiled into /public/css.
    |-- config              <=== main.js is the setup file for your application.
                            routes.js contains specification for URL paths and actions taken 
                            when receiving specific requests.
    |-- controllers         <=== Your controllers will reside here.
    |   `-- rest            <=== If you need a REST API, this is the place to go.
    |-- models              <=== ORM specific models. 
    `-- views               <=== This framework use the 'ejs' template system.
                            Support for added is planned for the future.
        |-- elements        <=== Atomic elements to be included in your views.
        |-- layouts         <=== The templates for your views.
        |-- static          <=== Static pages should reside here.

## Installation / Setup

```
npm install
```

The command above will install required dependencies.

## Application Skeleton generator

Currently, the ./console folder only contains one script to generate ORM models.
A new command will be added, unifying all scripts included in ./console to help you 
setup your application in minutes.

* modelGenerator.js:    script used to generate specific ORM's models.

Until the main console script is built, we need to manually execute the above scripts 
by hand:

```
node ./console/modelGenerator.js
```
Please see documentation included in the above script to understand what it does.

## Run / Execution

Since daturajs is a pure nodejs framework, there is no need to have an instance of a 
www server running - nginx, apache, etc -. The only method to make it work is by 
issuing the following command:

```
./start.sh 80 8080
```

Make sure this file is executable first, if it's not yet:

```
chmod +x ./start
```
The arguments, which are both optional, are as follow:

```
./start.sh [WWW_PORT] [REST_PORT]
```


