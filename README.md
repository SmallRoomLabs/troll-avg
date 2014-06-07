troll-avg (CURRENTLY BUGGY!)
=========
Time-based rolling average calculations for node.js

___

Installation
===============

Via [npm][]:

    $npm install --save troll-avg

---
## Quick Start

	var Troll=require('troll-avg');

    // Setup 5 counting slots collectng for 1 second each for
    // three different keys. This wil give the average values
    // over the last 5 seconds.
    var series1keys=['foo','bar','bletch'];
	var series1=new Troll(series1keys,1,5);

    // Increment a random key by 1 every 250 mS
    setInterval(function() {
        var r=Math.rand();
        if (r<0.1) {            // 10% goes to Foo
            series1.update('Foo');
        } else if (r<0.4) {     // 30% goes to Bar
            series1.update('Bar');
        } else {                // 60% goes to Bletch
            series1.update('Bletch');
        }
    },250);

    // Show all averages every second
    setInterval(function() {
        console.log(series1.averages());
    }, 1000);


---
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
