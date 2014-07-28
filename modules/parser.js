var patterns = [
   " _ " +
   "| |" +
   "|_|",
   "   " +
   "  |" +
   "  |",
   " _ " +
   " _|" +
   "|_ ",
   " _ " +
   " _|" +
   " _|",
   "   " +
   "|_|" +
   "  |",
   " _ " +
   "|_ " +
   " _|",
   " _ " +
   "|_ " +
   "|_|",
   " _ " +
   "  |" +
   "  |",
   " _ " +
   "|_|" +
   "|_|",
   " _ " +
   "|_|" +
   " _|"
];

var chars = [" ", "_", "|"];

module.exports = {
  accounts: function(accounts, cb){
    accounts.forEach(function(account){
      this.parse(account, cb);
    }.bind(this));
  },

  parse: function(account, cb){
    var output  = "";
    account.ill = 0;

    account.numbers.forEach(function(number){
      number.output = this.identify(number);
      output+= number.output;

      if(number.output == '?'){
        account.status = "ILL";
        account.ill++;
      }
    }.bind(this));
    account.output = output;
    cb(account);
  },

  identify: function(number){
    var output = "?";
    for(x = 0; x < patterns.length; x++){
      if(patterns[x] === number.ascii){
        output = x;
        x = patterns.length;
      }
    }
    return output;
  },

  guess: function(account, progress, cb){

    //clone array
    var numbers  = JSON.parse(JSON.stringify(account.numbers));
    var guessNum = null;
    var ascii    = null;
    var option   = null;

    numbers.forEach(function(number, index){
      ascii = number.ascii.split("");
      for(var x = 0; x < ascii.length; x++){
        if((account.status == "ILL" && number.output == "?") || account.status == "ERR"){
          chars.forEach(function(c){
            if(c != ascii[x]){
              ascii[x] = c;
              guessNum = this.identify({ ascii: ascii.join("") });
              numbers[index].output = guessNum;
              if(guessNum != "?"){ progress({ numbers: numbers }); }
              ascii = number.ascii.split("");
            }
          }.bind(this));
        }
      }
    }.bind(this));

    cb(account);
  }
};
