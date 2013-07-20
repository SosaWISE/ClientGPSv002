define([
  'vm.devices-tab',
  'model.device',
],
function(devicesTabVM, Device) {
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
    it('`editItem` should start null', function () {
      expect(vm.editItem()).toBeNull();
    });
    it('device editor `focusTitle` should start false', function () {
      expect(vm.deviceEditorVM.focusTitle()).toBe(false);
    });
    it('device editor `model` should start null', function () {
      expect(vm.deviceEditorVM.model()).toBeNull();
    });

    describe('when startEdit is called', function () {
      var deviceModel;
      beforeEach(function () {
        deviceModel = new Device();
        vm.startEdit(deviceModel);
      });

      it('`editing` should change to true', function () {
        expect(vm.editing()).toBe(true);
      });
      it('`editItem` should change to device editor', function () {
        expect(vm.editItem()).toBe(vm.deviceEditorVM);
      });
      it('device editor `focusTitle` should change to true', function () {
        expect(vm.deviceEditorVM.focusTitle()).toBe(true);
      });
      it('device editor `model` should change to the passed in model', function () {
        expect(vm.deviceEditorVM.model()).toBe(deviceModel);
      });
    });
  });
});
