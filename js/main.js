var ServiceViewModel = {
	
		goWebService: function(){
			var oData = {
				'callback' : "jsoncallback",
				'szApplicationToken' : "SOS_GPS_CLNT",
				'_' : "1365200104075"
			};
			console.log(JSON.stringify(oData));


			var jxHdr = $.ajax({
				"url": 'http://wsapi.securitysciences.com/AuthSrv/SosStart'
				, "data": JSON.stringify(oData)
				, "type": "POST"
				, "dataType": "jsonp"
				, "contentType": 'application/json; charset=utf-8'
				, "success": fxSuccess
				, "error": fxFailure
			});
		}
	
};

ko.applyBindings(ServiceViewModel);

function fxSuccess(response)
{
	alert('Success: ' + response);
	console.log(response);
}

function fxFailure(response)
{
	alert('Failure: ' + response);
	console.log(response);
}

ko.applyBindings(ServiceViewModel);