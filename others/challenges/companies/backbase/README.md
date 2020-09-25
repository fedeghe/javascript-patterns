
A SHORT DESCRIPTION OF MY IMPLEMENTATION 
----------------------------------------

#### SUMMARY
The `js/script.js` when dom is ready, after setting all needed path parameters for sources _.xml_ and _.xsl_ files, here through a simple observer are defined all the functions needed to load the articles list, bind click events on items, at click get details, unbind click, remove unwanted dom elements, bind a silly back function (triggered with escape button)
 

#### LIBRARIES

The `js/fg/` folder contains all the core libraries, each one adds his own chunk to the FG namespace. The only dependency comes from the `FG.makeNS` function defined in the `js/fg/fg.js` and it's used in every lib to add his own functionalities to the namespace.  

Many of these functions are a simplified version of the codebase of an mvc framework I\`m writing since a year. An exception are the `js/list.js` and the `js/xslt.js` the has been written for the exercise.  

All the components relevat for that exercise are meant to be singletons, so in a page will be not possible to render two or more lists.  

The prototypal version of these two objects is really easy.

---


#### COUPLING

Whenever possible components are build to have minimal knowledgle about each other.

---


#### CHALLENGES

At first reading I thought that the biggest problem would be to successfully manage the transformations, honestly this is the first time I face client side XSLT. I was wrong.<br />
The main problem has been the lackage of the _currentTarget_ in events (obviously only in IE7, IE8), fundamental for the event delegation.<br />
The edge solution, indeed adopted in almost all libraries, is to normalize every event, creating a new one and setting the correct _currentTarget_, among all the others discrepancies.<br />
 At all a trivial task, I had to find a quick and dirty workaround. I degraded using the fact that I know exactly from where the Event can be fired (target) and which parent node I would expect to be the _curretTarget_ (the node where the event has been binded).<br />
A bubble search until I reach the tag I know is the pseudo-solution. Bad but works.

---


#### UX CONSIDERATIONS

The document describing the exercise is a bit fuzzy, it seems like the user can never go back to the article list, I choosed a dummy solution to let the user go back with an `escape` keystroke, even though this locks the user for example on a mobile device, I know I would never do it in a real solution.<br />
As a rule of thumb a button with a back arrow should be shown in a upper angle.

---

#### CROSS COMPATIBILITY

Tested successfully on : Firefox, Chrome, Opera, Safari, IE7, IE8, IE9

   
#### DEPLOY 

To run the exercise there are some options:

1. Local virtualhost<br />**requirements**: a webserver

2. Adjust `srv/config.json` _webroot_ parameter using as value the absolute path of the folder that contains the `index.html`, run `[sudo] node server.js` and visit [your locahost on port 8080](http://localhost:8080/).<br />If that port do not fits you, change it on the `config.json`<br />
__Hint__ : for ports under 1024 only root will start the server<br />**requirements**: nodejs

3. : visit [this example link](http://www.freakstyle.it/backbase). Note here I condensed all js in one minified file.<br />**requirements**: Internet connection 

**debug mode** : to see some event relevant event debug messages while running the sample include a parameter named debug valued as true (ex. http://www.freakstyle.it/backbase/?debug=true)

---
