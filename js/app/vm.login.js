/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 5/20/13
 * Time: 10:07 AM
 * To change this template use File | Settings | File Templates.
 */
define([
  'ko',
  'utils',
  'vm.controller',
  'messenger',
  'dataservice',
  'router',
  'amplify',
  'vm.signUp',
  'config'
], function(
  ko,
  utils,
  ControllerViewModel,
  messenger,
  dataservice,
  Router,
  amplify,
  signupVM,
  config
) {
  "use strict";

  function LoginViewModel(options) {
    LoginViewModel.super_.call(this, options);

    this.title = ko.observable('Secure Login');
    this.userName = ko.observable('');
    this.password = ko.observable('');
    this.rememberMe = ko.observable(false);
    this.editing = ko.observable(false);

    this.editing = ko.observable(false);
    // this.canEdit = ko.observable(false);
    // this.editItem = ko.observable(null);

    // ensure correct scope
    this.cancelSignUp = this.cancelSignUp.bind(this);

    var _this = this;
    this.loginCmd = ko.asyncCommand({
      execute: function(complete) {
        dataservice.Customer.CustomerAuth({
          SessionID: dataservice.Session.sessionID(),
          Username: _this.userName(),
          Password: _this.password(),
          RememberMe: _this.rememberMe(),
        }, function(resp) {
          if (complete) {
            complete();
          }

          if (resp.Code !== 0) {
            console.error(resp);
            return;
          } else {
            config.CurrentUser(resp.Value);
            amplify.publish('customerAuthentication', resp);
            Router.instance.useDestPath();
          }
        });
      },
      canExecute: function(isExecuting) {
        return !isExecuting; // && isDirty() && isValid();
      }
    });
  }
  utils.inherits(LoginViewModel, ControllerViewModel);
  LoginViewModel.prototype.viewTemplate = 'login.view';
  LoginViewModel.prototype.signupVM = signupVM;

  LoginViewModel.prototype.onLoad = function(cb) { // override me
    cb(false);
  };
  LoginViewModel.prototype.onActivate = function(params) {
    if (params.action === 'signup') {
      this.signUp(false);
      this.setTitle(this.signupVM.name);
    } else {
      params.action = 'login';
      this.cancelSignUp(false);
      this.setTitle(this.title());
    }
  };
  LoginViewModel.prototype.signUp = function() {
    this.editing(true);
    // return true;
  };
  LoginViewModel.prototype.cancelSignUp = function() {
    this.editing(false);
    // return true;
  };

  return LoginViewModel;
});
