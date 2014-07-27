var patterns = [
  { ascii: [[" ", "_", " "],["|", " ", "|"],["|", "_", "|"]] }, //0
  { ascii: [[" ", " ", " "],[" ", " ", "|"],[" ", " ", "|"]] }, //1
  { ascii: [[" ", "_", " "],[" ", "_", "|"],["|", "_", " "]] }, //2
  { ascii: [[" ", "_", " "],[" ", "_", "|"],[" ", "_", "|"]] }, //3
  { ascii: [[" ", " ", " "],["|", "_", "|"],[" ", " ", "|"]] }, //4
  { ascii: [[" ", "_", " "],["|", "_", " "],[" ", "_", "|"]] }, //5
  { ascii: [[" ", "_", " "],["|", "_", " "],["|", "_", "|"]] }, //6
  { ascii: [[" ", "_", " "],[" ", " ", "|"],[" ", " ", "|"]] }, //7
  { ascii: [[" ", "_", " "],["|", "_", "|"],["|", "_", "|"]] }, //8
  { ascii: [[" ", "_", " "],["|", "_", "|"],[" ", "_", "|"]] }  //9
];

module.exports = {
  process: function(accounts, cb){
    accounts.forEach(function(account){
      account.numbers.forEach(function(number){
        this.identify(number);
        console.log(number);
      }.bind(this));

      cb(account.numbers, this.calculateChecksum(account));
    }.bind(this));

    //for(i = 0; i < accounts.length; i++){
      //for(y = 0; y < accounts[i].numbers.length; y++){
        //for(x = 0; x < numbers.length; x++){
          //if(JSON.stringify(numbers[x].ascii) === JSON.stringify(accounts[i].numbers[y].ascii)){
            //accounts[i].numbers[y].output = x;
            //x = numbers.length;
          //}
        //}
      //}

      //cb(accounts[i].numbers, this.calculateChecksum(accounts[i]));
    //}
  },

  identify: function(number){
    patterns.forEach(function(pattern, index){
      if(JSON.stringify(pattern.ascii) === JSON.stringify(number.ascii)){
        number.output = index;
        console.log("INDEX", index);
        return true;
      }
      console.log("HOLA", index);
    });
    number.output = "?";
  },

  calculateChecksum: function(account){
    var checksum = 0;
    account.numbers.forEach(function(number, index){
      checksum += parseInt(number.output * (9 - index));
    });

    return !(checksum % 11);
  }
};
