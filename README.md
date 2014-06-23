# Marionette.AnimatedCollectionView

[MarionetteJS](http://marionettejs.com/) extension to decorate a [CollectionView](https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.collectionview.md) with callbacks to allow animated DOM insertion and removal.

## Usage

```js
var decorateAnimatedCollectionView = require('Marionette.AnimatedCollectionView');

var ListView = Marionette.CollectionView.extend({
  // …
});

var AnimatedListView = decorateAnimatedCollectionView(ListView, {
  // CSS class name to add for animating DOM insertion
  add: 'item-adding',
  // CSS class name to add for animating DOM removal
  remove: 'item-removing',
  // automatic promise resolution
  promise: {
    // options from jQuery-transitionEndEvent
    resolveTimeout: 1000
  }
});
```


## TODO

* documentation and tests
* API to differentiate between initial render and later additions
* API to allow "drag" (a delay between each item to animate in)


## Install

```bash
# with bower
bower install Marionette.AnimatedCollectionView

# with npm
npm install marionette.animatedcollectionview
```

**Note:** requires ['jQuery-transitionEndPromise'](https://github.com/medialize/jQuery-transitionEndPromise) to be made available at `jQuery-transitionEndPromise`


## License

Marionette.AnimatedCollectionView is published under the [MIT License](http://opensource.org/licenses/mit-license).


## Changelog

### 0.1.1 (June 23rd 2014) ###

* Of course I'm too dumb for package managers…

### 0.1.0 (June 23rd 2014) ###

* Initial Version


