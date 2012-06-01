iLikeIt!
========

iLikeIt! is a simple, proof of concept, image voting system packed as a ```jQuery``` plugin.
It is built on top of the ```Carousel``` component, part of Twitter's ```Bootstrap``` library, and based on web framework ```Asp.Net MVC 3```.

Basic Usage
===========

All you have to do is just create the HTML to build a Bootstrap's Carousel and in your javascript code, call the plugin like follows:
```
$(function () {
        var options = {
            postUrl : "/Home/RegisterVote" // You need to specify a POST URL to invoke your server side code
        }
        $("#myCarousel").iLikeIt(options);
    });
```

Upon voting, the plugin extracts the ID of the image being voted and passes it, along with the vote cast by the user, to the server.

Dependencies
============

* jQuery (version 1.7.2 as of now)
* Bootstrap (carousel.js and transition.js in the detail + the css)

License
=======

The MIT License

Copyright (c) 2012 Valerio Gheri

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.