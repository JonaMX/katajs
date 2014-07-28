var reader        = require('./modules/reader.js');
var accountNumber = require('./modules/accountNumber.js');

var args          = process.argv.slice(2);

var printAccount = function(account){
  console.log(account.output, account.status);

  //if(account.options){ console.log(account.options); }
};

reader.file(args[0], function(accounts){
  accountNumber.parse(accounts, function(account){
    accountNumber.verify(account, printAccount);
  });
});

