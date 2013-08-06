define([
  'vm.devices-tab',
  'model.device',
  'datacontext',
],
function(devicesTabVM, Device, datacontext) {
  "use strict";

  // Create viewmodel for the edit divs
  // Enable the save buttons to work
  // Add the dataservices for the device update.

  describe('vm.devices-tab', function () {
    var vm;
    beforeEach(function () {
      vm = devicesTabVM.create();
    });

    it('`editing` should start false', function () {
      expect(vm.editing()).toBe(false);
    });
    it('`editItem` should start defined', function () {
      expect(vm.editItem()).toBeDefined();
    });
    it('`saving` should start false', function () {
      expect(vm.saving()).toBe(false);
    });
    it('editor `focusField` should start false', function () {
      expect(vm.editItem().focusField()).toBe(false);
    });
    it('editor `model` should start null', function () {
      expect(vm.editItem().model()).toBeNull();
    });

    describe('when `startEdit` is called', function () {
      var deviceModel;
      beforeEach(function () {
        deviceModel = new Device();
        vm.startEdit(deviceModel);
      });

      it('`editing` should change to true', function () {
        expect(vm.editing()).toBe(true);
      });
      it('editor `focusField` should change to true', function () {
        expect(vm.editItem().focusField()).toBe(true);
      });
      it('editor `model` should change to the passed in model', function () {
        expect(vm.editItem().model()).toBe(deviceModel);
      });

      describe('when `saveEdit` is called', function () {

        beforeEach(function () {
          spyOn(datacontext.Devices, 'updateData').andCallFake(function(entity, callbacks) {
            setTimeout(function () {
              callbacks.success({
                "Code": 0,
                "Message": "",
                "SessionId": 0,
                "ValueType": "",
                "Value": null
              });
            }, 0);
          });

          vm.saveEdit();
        });

        it('`saving` should change to true', function () {
          expect(vm.saving()).toBe(true);
        });

        describe('when save is complete', function () {

          beforeEach(function () {
            waitsFor(function () {
              return !vm.saving();
            });
          });

          it('`saving` should change to false', function () {
            expect(vm.saving()).toBe(false);
          });
          it('data should be sent to the webservice', function () {
            expect(datacontext.Devices.updateData).toHaveBeenCalled();
          });
        });
      });
    });
  });
});
