exports.main = [
{
    url: ['/','/home'],
    action: 'static/home', // format is path:controller_no_suffix/action
    method:'get'
},
{
    url: '/rest/account',
    action: 'account/index',
    method:'get',
    isRest:true // rest controllers will be placed in controllers/rest
}
]