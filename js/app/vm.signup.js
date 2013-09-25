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
    _this.model.DealerId(config.dealerId);
    _this.model.SalesRepId(config.salesRepId);
    _this.model.LeadDispositionId(config.leadDispositionId);
    _this.model.LeadSourceId(config.leadSourceId);
    _this.model.LocalizationId(navigator.language || config.localizationId);

    _this.model.FirstName('b');
    _this.model.LastName('bb');
    _this.model.PhoneHome('123.123.1234');
    _this.model.Email('e@ma.il');
    _this.model.Password('Password1');
    _this.model.Gender('Male');

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
    var _this = this,
      loading = _this.loading,
      model = _this.model,
      data;

    model.validate();
    model.update();
    if (!model.isValid()) {
      alert('Some fields are invalid: ' + model.errMsg());
      return;
    }

    loading(true);
    data = model.getValue();
    console.log(data);
    dataservice.Customer.CustomerSignUp(data, function(resp) {
      loading(false);

      if (resp.Code !== 0) {
        console.error(resp);
      } else {
        //@TODO: show success page and possibly ask for more info

        // log the user in
        config.user(resp.Value);
        // go to home page
        _this.goToRoute({
          route: 'home',
        });
      }
    });
  };

  return SignupViewModel;
});
