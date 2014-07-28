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
    var counter  = 0;
    var position = 0;

    for(i=0; data.length > 3; i+=3){
      position = i/3%9;

      if(!accounts[counter])                  { accounts[counter] = { numbers: [] } };
      if(!accounts[counter].numbers[position]){ accounts[counter].numbers[position] = { ascii: "" } };

      accounts[counter].numbers[position].ascii+= data.splice(0, 3).join("");
      if(accounts[counter].numbers[8] && accounts[counter].numbers[8].ascii.length === 9){
        data.splice(0, 27);
        counter++;
      }
    }

    cb(accounts);
  }
};
