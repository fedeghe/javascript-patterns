H24.events.ready(function () {
    "use strict";

    // if needed override starting lang, default en, available de, en, fr, pl, it
    // H24.i18n.currentLang = 'en';

    // inject select in header
    H24.i18n.injectSelect(document.getElementsByTagName('header')[0]);

    // set title
    H24.dom.byId('tit').innerHTML = H24.i18n.get('title');

    // create a list of products, will rendere in the #items node
    // and as item type will use H24.obj.ListItem wich extends abstract H24.obj.Item
    //
    var list = new H24.obj.List(
            H24.dom.byId('items'),
            H24.obj.ListItem
        ),

        // 'my cart' button reference
        // 
        cartButt = H24.dom.byId('cart'),

        // a cart object
        // 
        cart = new H24.obj.Cart(H24.dom.byId('cartOverlay'), cartButt),

        // container where will be enabled event delegation
        // 
        container = H24.dom.byId('content'),

        // topic used for observer
        // 
        topic = 'listAction';


    // get products autoex function 
    (function getProducts() {
        H24.io.getJson('srv/data.json', function (jdata) {
            
            // render the list
            //
            list.add(jdata).render();

            // on scroll 
            // if scrolled to the bottom getproducts again
            // and always spy the scroll to adjust the 'mycart' buttom position
            //
            H24.iscroll.enable(
                function () {
                    H24.utils.screen.amIatBottom() && getProducts();
                },
                function (){
                    var st = H24.utils.screen.scrollTop();
                    // using numbers in that way is ugly, I agree
                    if (st > 145) {
                        H24.dom.style(cartButt, 'position', 'relative');
                        H24.dom.style(cartButt, 'top', (st - 143)+ 'px');
                    } else {
                        H24.dom.style(cartButt, 'position', '');
                    }
                }
            );
        });
    })();

    // enable simple event delegation
    // attribute based ()
    H24.events.eDelegate(topic, container, 'click', 'data-action', 'data-params');

    // subscribe to the topic switching on the passed action (determined by the data-action tag attribute
    // (see the H24.events.eDelegate function)
    H24.pubsub.sub(topic, function (topic, action, args) {
        switch (action) {
            case 'add': args && cart.add(list.get(args.id)).show(); break;
            case 'remove': args && cart.remove(args.id); break;
            case 'showCart': cart.show(); break;
            case 'hideCart': cart.hide(); break;
        }
    });
});