var parser  = require('./parser.js');

function needGuessing(account){
  return ((account.status === "ILL" || account.status === "ERR") && (account.ill >= 1 || account.ill == 0));
}

module.exports = {

  verify: function(account, cb){
    if(!account.status){
      account.status = this.calculateChecksum(account) ? "" : "ERR";
    }

    var options = [];

    if(needGuessing(account)){
      parser.guess(account, function(option){
        if(this.calculateChecksum(option)){ options.push(option); }
      }.bind(this), function(account){
        account.options = options;

        if(account.options.length === 1){
          account.numbers = account.options[0].numbers;
          account.status  = "";
        }else{
          account.status  = account.options.length === 0 ? account.status : "AMB";
        }
      });
    }

    cb(account);
  },

  parse: function(accounts, cb){
    parser.accounts(accounts, cb);
  },

  calculateChecksum: function(account){
    var checksum = 0;
    var output = "";
    account.numbers.forEach(function(number, index){
      checksum += parseInt(number.output * (9 - index));
      output += number.output.toString();
    });

    return !(checksum % 11);
  }
}
