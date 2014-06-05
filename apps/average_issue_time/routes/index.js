/*
 * GET home page.
 */

var request = require('request');

exports.index = function(req, res){
  res.render('index', { title: 'Time of open issues on GitHub' });
};

exports.process = function(req, res) {

  var options = {
    url: 'https://api.github.com/repos/' + req.body.user + '/' + req.body.repo + '/issues/events',
    headers: {
      'User-Agent': 'songawee' 
    } 
  }; 

  request(options, function (error, response, body) {
    var data = JSON.parse(body);

    var array = [];
    array  = data;

    var result = 0;
    var counter = 0;

    for (var i = 0; i < array.length; i++) {
      if (data[i].issue.closed_at != null) {
        var opened = new Date(data[i].issue.created_at);
        var closed = new Date(data[i].issue.closed_at);
        console.log('Opened: ' + opened);
        console.log('Closed: ' + closed + '\n');
        result += (closed.getTime() - opened.getTime());
        counter++;
      }
    }

    result = result/counter;
    result = result/(60 * 60 * 24 * 1000);

    res.render('index', { title: 'Time between open/close issues on GitHub', test: result.toFixed(2), user: req.body.user, repo: req.body.repo});
  });
};
