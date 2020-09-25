
A SHORT DESCRIPTION OF MY IMPLEMENTATION 
----------------------------------------

#### LIBRARIES

The `build/js/lib/` folder contains all the core libraries, accessible
through the __H24__ namespace.

Many of these functions are a simplified version of the codebase of an [mvc
framework] I\`m developing since 2 year. All these files should contain mainly
the exact subset needed for the sample app.

The app models are contained in `build/js/models/`:

- __Cart__ : The Cart object, which contains a List instance for the Items
         ontained within
- __List__ : Almost generic list to inject a ul tag compiled from json data,
and render/update associated dom.
- __Item__ : Abstract item
- __CartItem__ : Extends Item, as far as concerns the cart, with his tpl
and custom action
- __ListItem__ : As CartItem but concerning the product list.
 
sometimes models contains templates, that should be avoided.

---
#### ALMOST ONE FOR EACH TYPE
To reduce the number of http request (for `js` and `css`) I used a simple
 nodejs package called [Malta], the `build/build.sh` script launches malta
 daemon and on the fly builds packed `js` and `css`(or `less`) used in the app.

---
#### EVENT DELEGATION

All events on page are captured thanks to one single binding for the click event on a container, which ,under right circumstances, publishes through
an observer the topic with all relevant information allowing subscribers 
to take their action.

---
#### COUPLING

Whenever possible components are build to have minimal knowledgle about
each other.

---
#### ENHANCEMENTS
- Programming
	* json validation, exception handling
- UI
	* make it responsive
	* enrich item template
- UX
	- The cart should present a total section, a button for checkout
	- If an item is added twice, a counter should be added instead of
	adding another element to the cart overlay
	- the 'my cart' button should somehow inform the user about the
	cardinality of the set contained, maybe change color when not
	empty or show a the number of items.

---
#### CROSS COMPATIBILITY

__Tested successfully on__ : Firefox, Chrome, Opera, Safari, IE9,
Android phone(Galaxy S2), Ipad(safari, chrome), in Iphone (safari, chrome) infinite scroll does not seem to work fine.

Seen the html5 tags it works at a good extent even with IE7, IE8 only
thanks to the shiv [trick] \(in head\), more specifically [trick-spec]

---
### ONLINE VERSION

You can find a deployed version [here]

---
[Malta]: https://www.npmjs.org/package/malta
[trick]: http://www.paulirish.com/2011/the-history-of-the-html5-shiv/
[trick-spec]: http://intertwingly.net/blog/2008/01/22/Best-Standards-Support#c1201006277
[here]: http://www.freakstyle.it/home24
[mvc framework]: http://www.jmvc.org

