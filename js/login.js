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

	var jxHdr = SSE.Services.Authentication.SessionStart({'SuccessFx': fxSuccess, 'FailureFx': fxFailure});
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
