var fs   = require('fs');

module.exports = {
  file: function(path, cb){
    fs.readFile(path, 'utf-8', (function (err, data) {
      if (err) { return console.log(err); }
      this.split(data, cb);
    }).bind(this));
  },

  split: function(data, cb){
    data         = data.replace(/\n/g, "").split("");
    var accounts = [];
    var len      = data.length;
    var counter  = 0;
    var position = 0;

    for(i=0; i< len; i+=3){
      position = i/3%9;

      if(!accounts[counter])          { accounts[counter] = []; }
      if(!accounts[counter][position]){ accounts[counter][position] = []; }

      accounts[counter][position].push(data.splice(0, 3));

      if(accounts[counter][8] && accounts[counter][8].length == 4){ counter++; }
    }

    cb(accounts);
  }
};
