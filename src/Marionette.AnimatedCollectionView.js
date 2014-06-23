/*! 
 * Marionette.AnimatedCollectionView v0.1.2
 * @web: https://github.com/medialize/Marionette.AnimatedCollectionView/
 * @author: Rodney Rehm - http://rodneyrehm.de/en/
 */
(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof exports === 'object') {
    // Node
    module.exports = factory(require('jquery', 'jQuery-transitionEndPromise'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery', 'jQuery-transitionEndPromise'], factory);
  } else {
    // Browser globals (root is window)
    factory(root.jQuery);
  }
}(this, function ($) {
  'use strict';

  function decorateAnimatedCollectionView(View, options) {
      var o = $.extend({}, decorateAnimatedAddRemove.defaults, options || {});
      var _removeChildView = View.prototype.removeChildView;
      var _initialize = View.prototype.initialize;

      return View.extend({
          initialize: function() {
              this.listenTo(this, 'collection:rendered', function() {
                  // bind before:item:added after the collection has been fully rendered,
                  // otherwise the add animation would be triggered for everything
                  this.listenTo(this, 'before:item:added', this._animateAdd, this);
              }, this);

              return _initialize.apply(this, arguments);
          },

          removeChildView: function(view) {
              this._animateRemove(view)
                  .then(_removeChildView.bind(this, view));
          },

          _animateAdd: function(view) {
              view.$el.addClass(o.add);
          },

          _animateRemove: function(view) {
              var promise = view.$el.animationEndPromise(options.promise);
              view.$el.addClass(o.remove);
              return promise;
          }
      });
  }
  
  decorateAnimatedCollectionView.version = '0.1.2';
  decorateAnimatedCollectionView.defaults = {
      add: 'item-adding',
      remove: 'item-removing',
      // options from jQuery-transitionEndEvent
      promise: {
          resolveTimeout: 1000
      }
  };
  
  return decorateAnimatedCollectionView;
}));