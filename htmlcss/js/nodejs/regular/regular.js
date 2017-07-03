const fs = require('fs');
var re = /PrintDao.[a-zA-Z_0-9]+/ig;
let map = new Map();
fs.readFile('code.txt', 'utf8', (err, data) => {
  if (err) throw err;
//   console.log(data);
  var result  = data.match(re);
//   console.log(result);
  for(let i= 0; i < result.length; i++) {
    // map[result[i]] = result[i];
    map.set(result[i], result[i])
  }
  console.log(map);
  console.log(map.size);
  
  var output = '';
  map.forEach((value, key, map) => {
      console.log(`${ key }: ${ value }`);
      output += key + '\n';
  });

  
    fs.writeFile('output.txt', output, (err) => {
        if (err) throw err;      
    })
});