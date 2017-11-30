var path = process.cwd();
var auth=require('./auth')


module.exports=function(app,passport){


app.get('/partials/*', function(req, res) {
    console.log("I AM HERE    "+req.params[0])
    res.sendFile(path+'/public/views/' + req.params[0]);

    });
    

app.route('/login')
    // .get(function (req, res) {
    //     res.sendFile(path + '/public/views/login.html');
    // })
    .post(auth.authenticate);

app.route('/logout')
    .post(function (req, res) {
        req.logout();
       res.end();
    });
app.route('/signup')
    // .get(isLoggedIn, function (req, res) {
    // 	res.sendFile(path + '/public/signup.html');
    // });
    // .get( function (req, res) {
    //     res.sendFile(path + '/public/views/signup.html');
    // });		
 app.get('/api/polls', function (req, res, next) {
    console.log('get api polls');
    Poll.find({}).exec(function(err, polls){
    if(err) console.log(err);
    res.json(polls);
     });
}); 
app.get('/newpoll',function (req, res) {
            res.sendFile(path + '/public/views/newpoll.html');
        });

 app.route('*')
.get(function (req, res) {
    res.sendFile(path + '/public/views/index.html');
});        

}