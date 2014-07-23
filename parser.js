var numbers = [
  { ascii: [[" ", "_", " "],["|", " ", "|"],["|", "_", "|"]], amb: [8] },    //0
  { ascii: [[" ", " ", " "],[" ", " ", "|"],[" ", " ", "|"]], amb: [7] },    //1
  { ascii: [[" ", "_", " "],[" ", "_", "|"],["|", "_", " "]] },              //2
  { ascii: [[" ", "_", " "],[" ", "_", "|"],[" ", "_", "|"]] },              //3
  { ascii: [[" ", " ", " "],["|", "_", "|"],[" ", " ", "|"]] },              //4
  { ascii: [[" ", "_", " "],["|", "_", " "],[" ", "_", "|"]], amb: [6, 9] }, //5
  { ascii: [[" ", "_", " "],["|", "_", " "],["|", "_", "|"]], amb: [5] },    //6
  { ascii: [[" ", "_", " "],[" ", " ", "|"],[" ", " ", "|"]], amb: [1] },    //7
  { ascii: [[" ", "_", " "],["|", "_", "|"],["|", "_", "|"]], amb: [0, 9] }, //8
  { ascii: [[" ", "_", " "],["|", "_", "|"],[" ", "_", "|"]], amb: [5, 8] }  //9
];

module.exports = {
  process: function(accounts, cb){
    for(i = 0; i < accounts.length; i++){
      for(y = 0; y < accounts[i].numbers.length; y++){
        for(x = 0; x < numbers.length; x++){
          if(JSON.stringify(numbers[x].ascii) === JSON.stringify(accounts[i].numbers[y].ascii)){
            accounts[i].numbers[y].output = x;
            x = numbers.length;
          }
        }
      }

      cb(accounts[i].numbers, this.calculateChecksum(accounts[i]));
    }
  },

  calculateChecksum: function(account){
    var checksum = 0;
    account.numbers.forEach(function(number, index){
      checksum += parseInt(number.output * (9 - index));
    });

    return !(checksum % 11);
  }
};
