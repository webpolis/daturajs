var seq = require('sequelize')
        , path = require('path')
        , lib = require(path.resolve(__dirname + '/../'))
        , config = require(path.resolve(lib.core.paths.src + '/config/main')).main.db
        , db = require(path.resolve(lib.core.paths.adapters + '/db'));

/**
 * @class   baseModel
 */
module.exports = function(ormModel) {
    var _ormModel = typeof ormModel.__options !== 'undefined' ? ormModel : ormModel;
    var _buildQuery = function(ccAnd, ccOr) {
        var cc = '';

        if (ccAnd.length > 0)
            cc += '(' + ccAnd.join(' AND ') + ')';
        if (ccOr.length > 0)
            cc += '(' + ccOr.join(' OR ') + ')';

        return cc;
    }

    var model = {
        /**
         * @method  find
         * @param   {String}    Can be 'all', 'one', 'min', 'max' or 'count'
         * @param   {Object}    Additional options. Includes 'with' (array of related models 
         *                      to be included in returning results), 'conditions', 'limit' and 'offset'.
         * @param   {Function}  Callback to be executed when done
         */
        find: function(type, opts, cbk) {
            var findAll, cc, findCustom, conds, params, limit, offset, order, fields, _with = null;
            var _this = this;

            // map conditions with params
            var _mapConditions = function(c) {
                if (/\:[\w]+/g.test(c) && (typeof params === 'undefined' || params.length === 0))
                    throw new Error('params were not set').stack;

                for (var p in params) {
                    c = c.replace(':' + p, typeof params[p] !== 'string' ?
                            params[p] : params[p].replace(/\'/g, '\''));
                }

                return c;
            }

            // execute beforeFind here. pass type & opts and enclose following in cbk
            this.$beforeFind(type.toLowerCase(), opts, function() {
                // initialize options
                if (typeof opts !== 'undefined' && opts !== null) {
                    conds = opts.conditions ? opts.conditions : conds;
                    params = opts.params ? opts.params : params;
                    limit = opts.limit ? opts.limit : limit;
                    offset = opts.offset ? opts.offset : offset;
                    order = opts.order ? opts.order : order;
                    fields = opts.fields ? opts.fields : fields;
                    _with = opts['with'] ? opts['with'] : null;

                    // construct query
                    if (typeof conds !== 'undefined') {
                        var ccAnd = (conds.and || conds instanceof Array ? conds.map(_mapConditions) :
                                (conds.and ? conds.and.map(_mapConditions) : []));
                        var ccOr = conds.or ? conds.or.map(_mapConditions) : [];
                        cc = _buildQuery(ccAnd, ccOr);
                    }
                }
                if (type === 'one')
                    limit = 1

                switch (config.adapter) {
                    case 'sequelize':
                        var o = {
                            where: cc ? cc : '1=1',
                            order: order ? order : null,
                            attributes: fields ? fields : null
                        };

                        findAll = function(t) {
                            if (t === 'one')
                                o.limit = limit
                            if (_with !== null)
                                o.include = _with

                            // refreshes relations
                            _this._ormModel = db().setupRelationships(_this._ormModel);

                            return _this._ormModel.findAll(o).success(function(models) {
                                var mm = [];
                                models.forEach(function(m) {
                                    if (typeof m.name === 'undefined')
                                        m.name = _this._ormModel.name

                                    var model = db().getLocalModelFromORM(m, _this, _with, fields)
                                    mm.push(model);
                                });

                                var ret = t === 'one' && mm.length > 0 ? mm[0] : mm;

                                // execute afterFind here. pass mm and enclose following in cbk
                                _this.$afterFind(ret, cbk)
                            });
                        }

                        findCustom = function(t) {
                            // refreshes relations
                            _this._ormModel = db().setupRelationships(_this._ormModel);

                            return _this._ormModel[t](o).success(function(v) {
                                // execute afterFind here. pass v and enclose following in cbk
                                _this.$afterFind(v, cbk);
                            });
                        }
                        break;
                }

                switch (type) {
                    case 'one':
                    case 'all':
                        return findAll(type);
                        break;
                    case 'min':
                    case 'max':
                    case 'count':
                        return findCustom(type);
                        break;
                }
            });
        },
        create: function(attrs, cbk, errCbk) {
            if (!this.$$isNewRecord)
                throw new Error('A model instantiated via load() cannot execute create.').stack

            var _this = this;
            switch (config.adapter) {
                case 'sequelize':
                    // execute beforeSave here. 
                    this.$beforeSave(attrs, function(_attrs) {
                        _this._ormModel.create(_attrs).success(function(_model) {
                            // execute afterSave here.
                            _this.$afterSave(function() {
                                cbk(db().getLocalModelFromORM(_model));
                            });
                        }).error(typeof errCbk !== 'undefined' ? errCbk : function(err) {
                            throw new Error(err).stack;
                        });
                    });
                    break;
            }
        },
        $update: function(attrs, opts, cbk, errCbk) {
            var _this = this;
            switch (config.adapter) {
                case 'sequelize':
                    this._ormModel.isNewRecord = false;
                    delete attrs.id

                    // execute beforeSave here. 
                    this.$beforeSave(attrs, function(_attrs) {
                        _this._ormModel.updateAttributes(_attrs).success(function(_model) {
                            // execute afterSave here.
                            _this.$afterSave(function() {
                                cbk(db().getLocalModelFromORM(_model));
                            });
                        }).error(typeof errCbk !== 'undefined' ? errCbk : function(err) {
                            throw new Error(err).stack;
                        });
                    });
                    break;
            }
        },
        $delete: function(cbk) {
            switch (config.adapter) {
                case 'sequelize':
                    _ormModel.destroy().success(cbk).error(function(err) {
                        throw new Error(err).stack;
                    });
                    break;
            }
        },
        $validate: function() {

        },
        /**
         * Run before saving a model.
         * You can pre-process the attributes here.
         *
         * @method  $beforeSave
         * @param   {Object}    Attributes and its values.
         * @param   {Function}  Execute this callback when you're done processing the attributes.
         *                      Pass the modified attributes as the 1st argument.
         */
        $beforeSave: function(attrs, cbk) {
            cbk(attrs);
        },
        /**
         * Run after a model has been saved.
         *
         * @method  $afterSave
         * @param   {Function}  Execute this callback when you're done doing additional processing.
         */
        $afterSave: function(cbk) {
            cbk();
        },
        /**
         * Run before a finder query is executed.
         * You can pre-process the conditions and options here.
         *
         * @method  $beforeFind
         * @param   {String}    Find method. Can be 'all','one','min','max' or 'count'.
         * @param   {Object}    Options to be applied to the final query.
         * @param   {Function}  Execute this callback when you're done processing the options.
         */
        $beforeFind: function(findType, options, cbk) {
            cbk();
        },
        /**
         * Run after a finder query is executed.
         * You can pre-process the resulting data here.
         *
         * @method  $afterFind
         * @param   {Mixed}     Can be array or one object containing results, depending on the find method chosen.
         * @param   {Function}  Execute this callback when you're done processing the results.
         *                      Pass the processed results as unique argument.
         */
        $afterFind: function(results, cbk) {
            cbk(results);
        },
        $getValidationErrors: function() {
            return this._validationErrors;
        }
    };

    // define with more detail

    // make orm available (for internal purposes only)
    Object.defineProperty(model, '_ormModel', {
        value: ormModel,
        writable: true,
        configurable: false,
        enumerable: false
    });

    /**
     * Gets a new instance of the current model.
     * Optionally define its default attributes.
     *
     * @param   {Object}    Optional. Default attributes for new instance.
     * @param   {Array}     Unimplemented. Optional associated models to be retrieved.
     * @method  load
     * @return  {Object}    The model's instance.
     */
    Object.defineProperty(model, 'load', {
        value: function(_model, _with) {
            var _this = Object.clone(this);

            if (typeof _model !== 'undefined') {
                var _ormModel = db().loadORMModel(_this.$$name).build(_model);
                _this = db().getLocalModelFromORM(_ormModel, _this);
            } else {
                // manually remove non-instance methods
                Object.keys(_this).forEach(function(k) {
                    if (/^(?:find|create)$/g.test(k)) {
                        delete _this[k]
                    }
                });
            }
            return _this;
        },
        writable: false,
        configurable: false,
        enumerable: true
    });

    Object.defineProperty(model, 'getFields', {
        value: function(onlyFields) {
            var _this = this;

            switch (config.adapter) {
                case 'sequelize':
                    if (typeof onlyFields !== 'undefined' && onlyFields instanceof Array) {
                        var t = []
                        _this._ormModel._dbFields.forEach(function(f) {
                            if (onlyFields.indexOf(f.name) !== -1)
                                t.push(f)
                        })
                        return t;
                    } else
                        return _this._ormModel._dbFields;
                    break;
            }
        },
        writable: false,
        configurable: false,
        enumerable: true
    });


    // watchers list
    Object.defineProperty(model, '_watchers', {
        value: {},
        writable: true,
        configurable: false,
        enumerable: false
    });
    Object.defineProperty(model, '_validationWatchers', {
        value: {},
        writable: true,
        configurable: false,
        enumerable: false
    });
    Object.defineProperty(model, '_validationErrors', {
        value: {},
        writable: true,
        configurable: false,
        enumerable: false
    });

    Object.defineProperty(model, '$watch', {
        value: function(field, cbk, isValidation) {
            var _this = this;
            isValidation = typeof isValidation !== 'undefined' && isValidation;

            if (field === '*') {
                this.getFields().forEach(function(f) {
                    if (typeof _this[(isValidation ? '_validationWatchers' : '_watchers')][f.name] === 'undefined')
                        _this[(isValidation ? '_validationWatchers' : '_watchers')][f.name] = []

                    _this[(isValidation ? '_validationWatchers' : '_watchers')][f.name].push(cbk);
                });
            } else {
                var ff = field.split(',').map(function(v) {
                    return v.trim()
                });
                ff.forEach(function(f) {
                    if (typeof _this[(isValidation ? '_validationWatchers' : '_watchers')][f] === 'undefined')
                        _this[(isValidation ? '_validationWatchers' : '_watchers')][f] = []

                    _this[(isValidation ? '_validationWatchers' : '_watchers')][f].push(cbk);
                })
            }
        },
        writable: false,
        configurable: false,
        enumerable: true
    });

    // setup validation
    var check = require('validator').check;
    model.getFields().forEach(function(f) {
        if (f.required) {
            model.$watch(f.name, function(p, v) {
                var _this = this;

                try {
                    check(v, 'This field cannot be empty')['notNull']()
                } catch (e) {
                    if (typeof _this._validationErrors[f.name] === 'undefined')
                        _this._validationErrors[f.name] = []

                    _this._validationErrors[f.name].push(e.message)
                }
            }, true);
        }
        if (f.max) {
            model.$watch(f.name, function(p, v) {
                var _this = this;

                try {
                    check(v, 'Maximum length exceeded')['max'](parseInt(f.max))
                } catch (e) {
                    if (typeof _this._validationErrors[f.name] === 'undefined')
                        _this._validationErrors[f.name] = []

                    _this._validationErrors[f.name].push(e.message)
                }
            }, true);
        }
        if (f.validates) {
            var vv = (f.validates instanceof Array ? f.validates : [f.validates]).map(function(v) {
                return v.trim ? v.trim() : v
            });
            model.$watch(f.name, function(p, v) {
                var _this = this;

                vv.forEach(function(_validator) {
                    try {
                        if (_validator instanceof RegExp) {
                            check(v, 'Value not allowed')['regex'](_validator)
                        } else {
                            check(v)[_validator]()
                        }
                    } catch (e) {
                        if (typeof _this._validationErrors[f.name] === 'undefined')
                            _this._validationErrors[f.name] = []

                        if (_this._validationErrors[f.name].indexOf(e.message) === -1)
                            _this._validationErrors[f.name].push(e.message)
                    }

                })
            }, true)
        }
    })

    return model;
}
