module.exports = function(app){

    app.get('/', require('./home').get);

    app.get('/issues', require('./issues').get);

    app.get('/events', require('./events').get);

    //app.post('/', require('./home').post);
};