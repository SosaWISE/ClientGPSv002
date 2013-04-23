var oViewModel = {
	LoginTitle: ko.observable("Login"),
	PersonAge: ko.observable(43),
	userName: ko.observable("SosaWISE"),
	userPassword: ko.observable("GetThis")
};

oViewModel.LoginTitle.subscribe(function(newValue){
	alert("The Login Title has changed to : " + newValue);
});

$(function() {

	var currentModule = 'home';
	$('body').addClass(currentModule);
	$('nav.primary .indicator').css('top',$('nav.primary a.'+currentModule).offset().top + 15);

	$('nav.primary a').click(function() {
		$('body').removeClass(currentModule);
		currentModule = $(this).attr('class');
		$('nav.primary .indicator').css('top',$(this).offset().top + 15);
		if(currentModule == 'logo') {
			$('nav.primary .indicator').css('top',$('nav.primary a.home').offset().top + 15);
			currentModule = 'home';
		}
		$('body').addClass(currentModule);
	});
});

function TestSosStart()
{
	var oData = {};
	oData.szApplicationToken = 'SSE_MAIN_PORTAL';

	var jxHdr = $.ajax({
		//url: 'http://localhost:50475/api/AuthSrv'
		url: 'http://localhost:61023/api/Values'
		, data: JSON.stringify(oData)
		, type: "POST"
		, dataType: "json"
		, contentType: 'application/json; charset=utf-8'
		, success: fxSuccess
		, error: fxFailure
	});
}

function fxSuccess(response)
{
	alert('Success: ' + response);
}

function fxFailure(response)
{
	alert('Failure: ' + response);
	console.log(response);
}

