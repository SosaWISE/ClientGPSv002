/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 10:07 AM
 * To change this template use File | Settings | File Templates.
 */
define([
  'notify',
  'util.strings',
  'ko',
  'utils',
  'vm.controller',
  'dataservice',
  'router',
  'vm.signup',
  'config'
], function(
  notify,
  strings,
  ko,
  utils,
  ControllerViewModel,
  dataservice,
  router,
  SignupViewModel,
  config
) {
  "use strict";

  function LoginViewModel(options) {
    var _this = this;
    LoginViewModel.super_.call(_this, options);

    _this.signupVM = ko.observable();
    _this.title = ko.observable(_this.name);
    _this.username = ko.observable('');
    _this.password = ko.observable('');
    _this.rememberMe = ko.observable(false);
    _this.editing = ko.observable(false);

    _this.editing = ko.observable(false);
    // _this.canEdit = ko.observable(false);
    // _this.editItem = ko.observable(null);


    // scoped events
    (function() {
      var index = 0,
        list = [
          'I don\'t know it either?',
        ];
      _this.clickForgot = function() {
        if (index > list.length) {
          index = 0;
        }
        alert(list[index]);
        index++;
      };
    })();
    _this.clickShowSignup = function() {
      _this.signUp();
      _this.setRouteData({
        action: 'signup',
      });
      _this.setTitle(_this.signupVM.name);
    };
    _this.clickHideSignup = function() {
      _this.cancelSignup();
      _this.setRouteData({
        action: 'login',
      });
      _this.setTitle(_this.title());
    };
    _this.cmdLogin = ko.command(
      function(cb) {
        setTimeout(function() {
          dataservice.Customer.CustomerAuth({
            SessionID: dataservice.Session.sessionID(),
            Username: _this.username(),
            Password: _this.password(),
            RememberMe: _this.rememberMe(),
          }, function(resp) {
            if (resp.Code !== 0) {
              console.error(resp);
              notify.warn('auth-failed', resp.Code, 6);
            } else {
              config.user(resp.Value);
              router.useDestPath();
            }

            cb();
          });
        }, 500); // the login call is too fast for development purposes...

        // must return true so the form will be submitted and the
        // browser will ask the user if the login info should be saved.
        // basically tells knockout to not call event.preventDefault()
        return true;
      }
    );
  }
  utils.inherits(LoginViewModel, ControllerViewModel);


  //
  // members
  //

  LoginViewModel.prototype.onLoad = function(cb) { // override me
    cb(false);
  };
  LoginViewModel.prototype.onActivate = function(routeData) {
    if (routeData.action === 'signup') {
      this.signUp();
      this.setTitle(this.signupVM.name);
    } else {
      routeData.action = 'login';
      this.cancelSignup();
      this.setTitle(this.title());
    }
  };
  LoginViewModel.prototype.signUp = function() {
    if (!this.signupVM()) {
      // lazy create the signup view model
      this.signupVM(new SignupViewModel({
        name: 'Sign up',
        parent: this,
      }));
    }
    this.editing(true);
  };
  LoginViewModel.prototype.cancelSignup = function() {
    this.editing(false);
  };

  return LoginViewModel;
});
