## Solera test

**Candidate**: Federico Ghedina  
**Contact** : federico.ghedina@gmail.com

First get depencencies (mocha and a build system) if not done globally the build exec will not be available  
```
$ npm install
```

then build it 
```
$ ./node_modules/malta/src/bin.js build.json
```

here if You can install `malta` globally you can execute instead `malta build.json`  

it stands watching for source modifications, so either open another console either CTRL + c  

then link it 
```
$ sudo npm link
```

run it using one of the two list file used for testing purposes (or obviously a new one)  
```
$ solera list1.txt
```

to run the test just use:  
```
$ npm test
```

### store settings
The _market.json_ file contains all settings for all items available in the store as well as some optional settings for _VAT_ and particular _discounts_.  
All elements present found in the list but not available will be ignored, anyway the test checks how many articles are ignored.  
While new _vat_ can be added directly in this file and used in the item settings, as far as concerns the discounts there are just two available: ['FIVE_FOR_THREE', 'THREE_FOR_TWO'] to add one just create a new strategy at the top or the `source/cashRegister.js` file
and rebuild if the build process has been stopped, otherwise it's ready to run when saved.