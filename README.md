WireSheep
=========
by [Feross Aboukhadijeh](https://github.com/feross) & [John Hiesey](https://github.com/jhiesey) & [Daniel Posch](https://github.com/dcposch) & [Nikil Viswanathan](https://github.com/nikilster)

[Wireshark](http://www.wireshark.org/) + [Firesheep](http://codebutler.com/firesheep) = WireSheep
---------------------------------

WireSheep lets you sniff packets on an open WiFi network. Instead of just stealing login cookies, like Firesheep, it lets you see traffic in realtime, like Wireshark.

WireSheep shows you each user on the network and all the HTTP requests they're making. 

Features 
--------

* Extensible set of filters. The basic filter just shows the URL of each request, and you can click on it to see the page. The Youtube filter, for example, matches YT URLs and shows a mini embedded video. The Facebook filter looks for FB responses and sets the user name (eg "User 3" becomes "Dan Posch").

Current bugs
------------
* Doesn't handle packet reordering or resending.

Feature ideas
-------------

These are things we might implement soon.

* "Follow mode": click on a username to follow just them. Get a big `<iframe>` that shows whatever they're currently seeing.
* Firesheep's original functionality: allow filters (eg the FB filter) to scrape session cookies. Provide a list of hijackable sessions.
* Google filter: show each Google query a user enters.
* Hacker News filter: eg replace "User 4" with "dcposch".
* More filters!

Architecture
------------

Currently: C++/QT app, compiled together with a modified Firesheep backend (uses pcap / winpcap). The app creates a QWebFrame (embedded WebKit). The Qt part is just plumbing: it gets sniffed requests from Firesheep, sends them to the JS/HTML frontend as blobs of JSON. 

Future: same JS/HTML frontend. We'll run a local server (eg using Python's SimpleHTTPServer) for the backend. 

Advantages: simpler, removes dependency on Qt, cleaner builds. By separating the backend from the frontend, we could also spy on open networks without physically present--eg one laptop is sniffing packets and running the server, remote laptop connects to the server.

Build instructions
------------------

Go to the 'qt' dir.

> cd qt

On Mac OS X:
> qmake -spec macx-g++  
> make clean all  
> open fireflock.app

On Linux/Unix:
> qmake  
> make clean all  
> ./fireflock

On Windows:
> qmake  
> nmake clean all  
> debug\fireflock.exe
