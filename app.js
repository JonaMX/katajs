var reader        = require('./modules/reader.js');
var accountNumber = require('./modules/accountNumber.js');

var args          = process.argv.slice(2);

var printAccount = function(account){
  var output = "";
  account.numbers.forEach(function(number){
    output += number.output.toString();
  });

  console.log(output, account.status);
};

reader.file(args[0], function(accounts){
  accountNumber.verify(accounts, printAccount);
});
