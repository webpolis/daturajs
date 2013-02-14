var seq = require('sequelize')
,path = require('path')
,config = require(path.resolve(__dirname+'/../../src/config/main')).main.db
,db = require(path.resolve(__dirname+'/../adapters/db'))
,lib = require(path.resolve(__dirname+'/../'));

module.exports = function(ormModel){
    var _ormModel = typeof ormModel.__options !== 'undefined' ? ormModel:ormModel;
    var _buildQuery = function(ccAnd, ccOr){
        var cc = '';
            
        if(ccAnd.length>0)
            cc += '('+ccAnd.join(' AND ')+')';
        if(ccOr.length>0)
            cc += '('+ccOr.join(' OR ')+')';
                
        return cc;
    }
    
    var model =  {
        /**
         * Gets a new instance of the current model.
         * Optionally define its default attributes.
         *
         * @param   {Object}    Optional. Default attributes for new instance.
         * @param   {Array}     Unimplemented. Optional associated models to be retrieved.
         * @method  getInstance
         * @return  {Object}    The model's instance.
         */
        getInstance:function(model, _with){
            var _this = this;
            
            if(typeof model !== 'undefined'){
                var _ormModel = db().loadORMModel(_this.$$name).build(model);
                _this = db().getLocalModelFromORM(_ormModel, _this);
            }
            
            return _this;
        },
        /**
         * @param   {String}    Can be 'all', 'one', 'min', 'max' or 'count'
         * @param   {Object}    Additional options. Includes 'with' (array of related models 
         *                      to be included in returning results), 'conditions', 'limit' and 'offset'.
         * @param   {Function}  Callback to be executed when done
         */
        $find:function(type, opts, cbk){
            var findAll, cc, findCustom,conds,params,limit,offset,order,fields, _with = null;
            var _this = this;

            // map conditions with params
            var _mapConditions = function(c){
                if(/\:[\w]+/g.test(c) && (typeof params === 'undefined' || params.length === 0))
                    console.trace('params were not set');
                            
                for(var p in params){
                    c = c.replace(':'+p,params[p]);
                }
                            
                return c;
            }
            
            // initialize options
            if(typeof opts !== 'undefined' && opts!==null){
                conds = opts.conditions ? opts.conditions : conds;
                params = opts.params ? opts.params : params;
                limit = opts.limit ? opts.limit : limit;
                offset = opts.offset ? opts.offset : offset;
                order = opts.order ? opts.order : order;
                fields = opts.fields ? opts.fields : fields;
                _with = opts['with'] ? opts['with'] : null;
                
                // construct query
                if(typeof conds !== 'undefined'){
                    var ccAnd = (conds.and || conds instanceof Array ? conds.map(_mapConditions):
                        (conds.and?conds.and.map(_mapConditions):[]));
                    var ccOr = conds.or ? conds.or.map(_mapConditions) : [];
                    cc = _buildQuery(ccAnd, ccOr);
                }
            }
            if(type === 'one') limit = 1
            
            switch(config.adapter){
                case 'sequelize':
                    var o = {
                        where:cc?cc:'1=1',
                        order:order?order:null,
                        attributes:fields?fields:null
                    };
                        
                    findAll = function(t){
                        if(t==='one') o.limit = limit
                        if(_with!==null) o.include = _with
                        
                        // refreshes relations
                        _this._ormModel = db().setupRelationships(_this._ormModel);
                        
                        return _this._ormModel.findAll(o).success(function(models){
                            var mm = [];
                            models.forEach(function(m){
                                if(typeof m.name === 'undefined')
                                    m.name = _this._ormModel.name
                                
                                var model = db().getLocalModelFromORM(m, _this, _with, fields)
                                mm.push(model);
                            });
                            cbk(t==='one' && mm.length>0?mm[0]:mm)
                        });
                    }
                    
                    findCustom = function(t){
                        // refreshes relations
                        _this._ormModel = db().setupRelationships(_this._ormModel);
                        
                        return _this._ormModel[t](o).success(function(v){
                            cbk(v);
                        });
                    }
                    break;
            }
            
            switch(type){
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
        },
        $update:function(attrs, opts, cbk, errCbk){
            switch(config.adapter){
                case 'sequelize':
                    this._ormModel.isNewRecord = false;
                    delete attrs.id
                    this._ormModel.updateAttributes(attrs).success(function(model){
                        cbk(db().getLocalModelFromORM(model));
                    }).error(typeof errCbk !== 'undefined'?errCbk:function(err){
                        throw err;
                    });
                    break;
            }
        },
        $create:function(attrs, cbk, errCbk){
            switch(config.adapter){
                case 'sequelize':
                    _ormModel.create(attrs).success(function(model){
                        cbk(db().getLocalModelFromORM(model));
                    }).error(typeof errCbk !== 'undefined'?errCbk:function(err){
                        throw err;
                    });
                    break;
            }
        },
        $delete:function(cbk){
            switch(config.adapter){
                case 'sequelize':
                    _ormModel.destroy().success(cbk).error(function(err){
                        throw err;
                    });
                    break;
            }   
        },
        $validate:function(){

        },
        $getFields : function(onlyFields){
            switch(config.adapter){
                case 'sequelize':
                    if(typeof onlyFields !== 'undefined' && onlyFields instanceof Array){
                        var t = []
                        _ormModel._dbFields.forEach(function(f){
                            if(onlyFields.indexOf(f.name)!== -1)
                                t.push(f)
                        })
                        return t;
                    }else
                        return _ormModel._dbFields;
                    break;
            }
        }
    }
    
    return model;
}