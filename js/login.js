var oViewModel = {
	LoginTitle: ko.observable("Login"),
	PersonAge: ko.observable(43),
	userName: ko.observable("SosaWISE"),
	userPassword: ko.observable("GetThis")
};

oViewModel.LoginTitle.subscribe(function(newValue){
	alert("The Login Title has changed to : " + newValue);
});


function TestSosStart()
{
	var oData = {};
	oData.AppToken = 'SSE_MAIN_PORTAL';

	var jxHdr = $.ajax({
		//url: 'http://localhost:50475/api/AuthSrv'
		//url: 'http://localhost:61023/api/Values'
		//url: 'http://localhost:61023/AuthSrv/PostStartSSE'
		//url: 'http://localhost:50475/AuthSrv/SosStart'
		url: 'http://sse.services.cors/AuthSrv/SosStart'
		, crossDomain: true
		, async: true
		, cache: false
		, data: JSON.stringify(oData)
		, type: "POST"
		, dataType: "json"
		, contentType: 'application/json; charset=utf-8'
		, success: fxSuccess
		, error: fxFailure
	});

	/** Return handler. */
	return jxHdr;
}

function fxSuccess(response)
{
	alert('Success.  Session ID: ' + response.SessionId);
}

function fxFailure(response)
{
	alert('Failure: ' + response.statusText);
	console.log(response);
}

/** Make sure we are using the right Request object based on the browser. */
if ('XDomainRequest' in window && window.XDomainRequest !== null) {
 
  // override default jQuery transport
  jQuery.ajaxSettings.xhr = function() {
      try 
      { 
		oXhr = new XDomainRequest(); 
		if (oXhr)
		{
			//oXhr.onerror     = fxFailure;
			//oXhr.onload      = fxSuccess;
		}

		/** Set Content Type. */
		oXhr.contentType = 'application/json; charset=utf-8';


      	return oXhr;
      }
      catch(e) { }
  };
 
  // also, override the support check
  jQuery.support.cors = true;
 
}