/*!
 * Marionette.AnimatedCollectionView v0.1.4
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

  var Sequence = function(options) {
    this._buffer = [];
    this._timeout = null;
    this._running = false;
    this.options = options;
    this._run = this._run.bind(this);
  };

  Sequence.prototype.push = function(callback) {
    this._buffer.push(callback);
    this.run();
  };

  Sequence.prototype.run = function() {
    if (this._running) {
      return;
    }

    this._run();
  };

  Sequence.prototype._run = function() {
    if (!this._buffer.length) {
      this._running = false;
      return;
    }

    this._running = true;
    var current = this._buffer.shift();
    current();
    setTimeout(this._run, this.options.drag);
  };


  function decorateAnimatedCollectionView(View, options) {
    var o = $.extend(true, {}, decorateAnimatedCollectionView.defaults, options || {});
    var _removeChildView = View.prototype.removeChildView;
    var _initialize = View.prototype.initialize;

    return View.extend({
      initialize: function() {
        this.listenTo(this, 'collection:rendered', function() {
          // bind before:item:added after the collection has been fully rendered,
          // otherwise the add animation would be triggered for everything
          this.listenTo(this, 'before:item:added', this._animateAdd, this);
        }, this);

        this._animateSequence = new Sequence(o);
        return _initialize.apply(this, arguments);
      },

      removeChildView: function(view) {
        this._animateRemove(view)
          .then(_removeChildView.bind(this, view));
      },

      _animateAdd: function(view) {
        view.$el.addClass(o.add);
        view.$el.css('animation-play-state', 'paused');

        this._animateSequence.push(function() {
          view.$el.css('animation-play-state', '');
        });
      },

      _animateRemove: function(view) {
        var promise = view.$el.animationEndPromise(o.promise);

        view.$el.addClass(o.remove);
        view.$el.css('animation-play-state', 'paused');

        this._animateSequence.push(function() {
          view.$el.css('animation-play-state', '');
        });

        return promise;
      }
    });
  }

  decorateAnimatedCollectionView.version = '0.1.4';
  decorateAnimatedCollectionView.defaults = {
    add: 'item-adding',
    remove: 'item-removing',
    // options from jQuery-transitionEndEvent
    drag: 100,
    promise: {
      resolveTimeout: 1000
    }
  };

  return decorateAnimatedCollectionView;
}));