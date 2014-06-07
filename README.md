# troll-avg
Time-based rolling average calculations for node.js


## Installation
Via [npm][]:

    $npm install --save troll-avg

## Quick Start

```javascript
var Troll=require('troll-avg');

// Setup 5 counting slots collecting updates for 1 second each 
// for three different keys. This will give the average values
// over the last 5 seconds.
var ravg=new Troll(['foo','bar','bletch'], 1, 5);

// Increment a random key by 1 every 250 mS
setInterval(function() {
	var r=Math.random();
	if (r<0.1) {            // 10% goes to boo
		ravg.update('foo');
	} else if (r<0.4) {     // 30% goes to bar
		ravg.update('bar');
	} else {                // 60% goes to bletch
		ravg.update('bletch');
	}
},250);
```

// Show all averages every second
setInterval(function() {
	console.log(ravg.averages());
}, 1000);

## Methods

### Constructor (allowedKeys, period, binCount)
The constructor expects three arguments.
 1. An array of the keys that are being averaged.
 2. How many seconds the data for each key is collected into one bins.
 3. How many bins that the average is calculated over.

### update(key, cnt) 
Add then *cnt* value into the current bin. If *cnt* is not specified it defaults to 1.

### average(key)
Return the rolling average value for the specified key.

### averages()
Return the rolling average values for all keys as an object.

## Notes
Since the collection of the values for the current time period is made into a separate set of bins calling .average() or .averages() before the first time period have elapsed the returned average(s) will be zero(s).


## License
Released under the MIT License

Copyright (c) 2014 Mats Engstrom - SmallRoomLabs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm]: https://npmjs.org
