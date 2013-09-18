/**
 * Created with JetBrains PhpStorm.
 * User: sosawise
 * Date: 8/6/13
 * Time: 4:26 PM
 * To change this template use File | Settings | File Templates.
 */
define(['ko', 'messenger', 'model.customer', 'dataservice.customer'],
  function(ko, messenger, Customer, customerService) {
    /** Initialize. */
    var
    _model = new Customer(),
      _loading = ko.observable(false),
      /** START Private Methods. */
      _activate = function(routeData, callback) {
        messenger.publish.viewModelActivated();
        if (callback) {
          callback();
        }
      },
      init = function() {
        _activate();
      },
      /**   END Private Methods. */

      _signUp = function() {
        debugger;
        var model = {
          LocalizationId: _model.localizationId(),
          LeadSourceId: _model.leadSourceId(),
          LeadDispositionId: _model.leadDispositionId(),
          DealerId: _model.dealerId(),
          SalesRepId: _model.salesRepId(),
          FirstName: _model.firstname(),
          LastName: _model.lastname(),
          PhoneHome: _model.phoneHome(),
          Email: _model.email(),
          Password: _model.password(),
          Gender: _model.gender()
        };
        _loading(true);
        customerService.CustomerSignUp({
          success: function() {
            _loading(false);
          },
          error: function(response) {
            _loading(false);
            console.error(response);
          }
        }, model);
      };

    init();

    /** Return Object. */
    return {
      name: 'Signup',
      get Activate() {
        return _activate;
      },
      signUp: _signUp,
      model: _model,
      loading: _loading
    };

  });
