define(['ko'],
	function(ko) {
		function ModelList() {
			this.list = ko.observableArray();
			this.savingMap = {};
		}

		ModelList.prototype.isNew = function(item) {
			return !this.isSaving(item) || this.savingMap[item].isNew;
		};
		ModelList.prototype.isSaving = function(item) {
			return !!this.savingMap[item];
		};

		ModelList.prototype.onLoadAll = function(cb) {
			cb('onLoadAll must be overridden');
		};
		ModelList.prototype.loadAll = function(cb) {
			cb('onLoadAll must be overridden');
		};

		ModelList.prototype.onSave = function(item, cb) {
			cb('onSave must be overridden');
		};
		ModelList.prototype.save = function(item, cb) {
			if (!item) {
				cb('missing item');
			}
			if (this.isSaving(item)) {
				cb('item is already saving');
			}

			if (this.list().indexOf(item) < 0) {
				cb('item not in list');
				return;
			}

			this.onSave(item, cb);
		};

		ModelList.create = function() {
			return new ModelList();
		};

		return ModelList;
	}
);
