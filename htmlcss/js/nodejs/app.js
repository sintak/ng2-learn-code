const fs = require('fs');
var GIFEncoder = require('gifencoder');

var pngFileStream = require('png-file-stream');
var encoder = new GIFEncoder(854, 480);
 
pngFileStream('frame.png')
  .pipe(encoder.createWriteStream({ repeat: -1, delay: 500, quality: 10 }))
  .pipe(fs.createWriteStream('out/myanimated.gif'));

var encoder1 = new GIFEncoder(156, 157);
pngFileStream('frame.png')
  .pipe(encoder1.createWriteStream({ repeat: -1, delay: 500, quality: 10 }))
  .pipe(fs.createWriteStream('out/myanimated1.gif'));


var pngFileStream1 = require('png-file-stream');
// pngFileStream('test/**/frame?.png', false).pipe(fs.createWriteStream('myconcatendatedpngs.dat'));
pngFileStream1('frame.png', false)
    .pipe(fs.createWriteStream('out/myconcatendatedpngs.dat'));