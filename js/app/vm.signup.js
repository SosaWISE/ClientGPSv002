/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 8/6/13
 * Time: 4:26 PM
 * To change this template use File | Settings | File Templates.
 */
define([
  'utils',
  'vm.controller',
  'ko',
  'config',
  'model.customer',
  'dataservice'
], function(
  utils,
  ControllerViewModel,
  ko,
  config,
  model_customer,
  dataservice
) {
  "use strict";

  function SignupViewModel(options) {
    var _this = this;
    SignupViewModel.super_.call(_this, options);

    _this.model = model_customer.wrap({});

    // scoped events
    _this.clickSignup = function() {
      _this.signup();
    };
  }
  utils.inherits(SignupViewModel, ControllerViewModel);


  //
  // members
  //

  SignupViewModel.prototype.signup = function() {
    var loading = this.loading,
      model = this.model;

    model.validate();
    model.update();
    if (!model.isValid()) {
      alert('Some fields are invalid: ' + model.errMsg());
      return;
    }

    loading(true);
    dataservice.Customer.CustomerSignUp(model.getValue(), function(resp) {
      loading(false);

      if (resp.Code !== 0) {
        console.error(resp);
      } else {
        //@TODO: show success page

        //@TODO: log the user in
        config.CurrentUser(model.getValue());
        //@TODO: go to home page
      }
    });
  };

  return SignupViewModel;
});
