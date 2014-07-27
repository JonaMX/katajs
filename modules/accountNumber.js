var parser  = require('./parser.js');

module.exports = {

  verify: function(accounts, cb){
    var callback = function(account){
      account.valid = this.calculateChecksum(account);
      if(!account.status){ account.status = account.valid ? "" : "ERR" }

      if(account.status === "ERR" || account.status === "ILL" ){
        parser.guess(account, this.calculateChecksum, cb);
      }else{
        cb(account);
      }
    }.bind(this);

    accounts.forEach(function(account){
      parser.account(account, callback);
    });
  },

  calculateChecksum: function(account){
    var checksum = 0;
    account.numbers.forEach(function(number, index){
      checksum += parseInt(number.output * (9 - index));
    });

    return !(checksum % 11);
  }
}
