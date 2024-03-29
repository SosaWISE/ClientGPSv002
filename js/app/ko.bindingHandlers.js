﻿define([
  'jquery',
  'ko',
  // include other handlers
  'ko.bindingHandlers.notice',
  'ko.bindingHandlers.value',
  'ko.bindingHandlers.cmd'
], function(
  $,
  ko
) {
  "use strict";

  var unwrap = ko.utils.unwrapObservable;


  function createToggleClassHandler(name, cls) {
    cls = cls || name;
    ko.bindingHandlers[name] = {
      update: function(element, valueAccessor) {
        var hasVal = unwrap(valueAccessor()),
          el = $(element);
        if (hasVal) {
          setTimeout(function() { // needed for browser transitions????
            el.addClass(cls);
          }, 0);
        } else {
          setTimeout(function() {
            el.removeClass(cls);
          }, 0);
        }
      }
    };
  }


  // active
  //---------------------------
  createToggleClassHandler('active');
  // editing
  //---------------------------
  createToggleClassHandler('editing');
  // disabled
  //---------------------------
  createToggleClassHandler('cssDisabled', 'disabled');

  // swapLoginFields
  //---------------------------
  //@NOTE: this only works one time
  ko.bindingHandlers.swapLoginFields = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
      element = $(element);
      var loginformEl = document.getElementById('loginform');
      // replace placeholders with the actual fields from hidden form
      element.find('.ph-loginform').replaceWith(loginformEl);
      // set current browser values on viewModel
      viewModel.username(element.find('.email').val());
      viewModel.password(element.find('.password').val());
    },
  };


  // setClass
  //---------------------------
  ko.bindingHandlers.setClass = {
    update: function(element, valueAccessor) {
      var cls = unwrap(valueAccessor()),
        el = $(element);
      if (valueAccessor._prevCls) {
        el.removeClass(valueAccessor._prevCls);
      }
      if (cls) {
        valueAccessor._prevCls = cls;
        el.addClass(cls);
      }
    }
  };

  // escape
  //---------------------------
  ko.bindingHandlers.escape = {
    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
      var command = valueAccessor();
      $(element).keyup(function(event) {
        if (event.keyCode === 27) { // <ESC>
          command.call(viewModel, viewModel, event);
        }
      });
    }
  };

  // hidden
  //---------------------------
  ko.bindingHandlers.hidden = {
    update: function(element, valueAccessor) {
      var value = unwrap(valueAccessor());
      ko.bindingHandlers.visible.update(element, function() {
        return !value;
      });
    }
  };

  // checboxImage
  //---------------------------
  ko.bindingHandlers.checkboxImage = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
      var $el = $(element),
        settings = valueAccessor();

      $el.addClass('checkbox');

      $el.click(function() {
        if (settings.checked) {
          settings.checked(!settings.checked());
        }
      });

      ko.bindingHandlers.checkboxImage.update(
        element, valueAccessor, allBindingsAccessor, viewModel);
    },
    update: function(element, valueAccessor) {
      var $el = $(element),
        settings = valueAccessor(),
        enable = (settings.enable !== undefined) ? unwrap(settings.enable()) : true,
        checked = (settings.checked !== undefined) ? unwrap(settings.checked()) : true;

      $el.prop('disabled', !enable);

      if (checked) {
        $el.addClass('selected');
      } else {
        $el.removeClass('selected');
      }
    }
  };

  // favoriteCheckbox
  //---------------------------
  ko.bindingHandlers.favoriteCheckbox = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
      var $el = $(element);

      $el.addClass('markfavorite');

      ko.bindingHandlers.favoriteCheckbox.update(
        element, valueAccessor, allBindingsAccessor, viewModel);
    },
    update: function(element, valueAccessor) {
      var $el = $(element),
        valAccessor = valueAccessor(),
        enable = (valAccessor.enable !== undefined) ? unwrap(valAccessor.enable()) : true,
        checked = (valAccessor.checked !== undefined) ? unwrap(valAccessor.checked()) : true;

      $el.prop('disabled', !enable);
      if (checked) {
        if (enable) {
          $el.attr('title', 'remove favorite');
        } else {
          $el.attr('title', 'locked');
        }
      } else {
        $el.attr('title', 'mark as favorite');
      }

      if (checked) {
        $el.addClass('selected');
      } else {
        $el.removeClass('selected');
      }

      if (enable) {
        $el.removeClass('locked');
      } else {
        $el.addClass('locked');
      }
    }
  };

  // starRating
  //---------------------------
  ko.bindingHandlers.starRating = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
      // Create the span's (only do in init)
      for (var i = 0; i < 5; i++) {
        $('<span>').appendTo(element);
      }

      ko.bindingHandlers.starRating.update(element, valueAccessor, allBindingsAccessor, viewModel);
    },

    update: function(element, valueAccessor, allBindingsAccessor) {
      // Give the first x stars the 'chosen' class, where x <= rating
      var ratingObservable = valueAccessor(),
        allBindings = allBindingsAccessor(),
        enable = (allBindings.enable !== undefined) ? unwrap(allBindings.enable) : true;

      // Toggle the appropriate CSS classes
      if (enable) {
        $(element).addClass('starRating').removeClass('starRating-readonly');
      } else {
        $(element).removeClass('starRating').addClass('starRating-readonly');
      }

      // Wire up the event handlers, if enabled
      if (enable) {
        // Handle mouse events on the stars
        $('span', element).each(function(index) {
          var $star = $(this);

          $star.hover(
            function() {
              $star.prevAll().add(this).addClass('hoverChosen');
            },
            function() {
              $star.prevAll().add(this).removeClass('hoverChosen');
            });

          $star.click(function() {
            //var ratingObservable = valueAccessor(); // Get the associated observable
            ratingObservable(index + 1); // Write the new rating to it
          });
        });
      }

      // Toggle the chosen CSS class (fills in the stars for the rating)
      $('span', element).each(function(index) {
        $(this).toggleClass('chosen', index < ratingObservable());
      });
    }
  };
});
