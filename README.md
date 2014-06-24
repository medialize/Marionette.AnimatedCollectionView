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
  // delay in milliseconds to wait in between animating mutliple items of a collection
  // animate element 1, wait, animate element 2, wait, …
  stagger: 100,
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
* API for animated sorting

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

### 0.1.5 (June 24th 2014) ###

* renaming drag option to stagger option - I clearly have no idea what I'm doing.

### 0.1.4 (June 24th 2014) ###

* adding drag option


### 0.1.3 (June 23rd 2014) ###

* fixing bad options access


### 0.1.2 (June 23rd 2014) ###

* … still too dumb for package managers…

### 0.1.1 (June 23rd 2014) ###

* Of course I'm too dumb for package managers…

### 0.1.0 (June 23rd 2014) ###

* Initial Version


