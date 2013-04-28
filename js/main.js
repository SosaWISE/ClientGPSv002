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
	var sidebarHidden = false;

	$('body').addClass(currentModule);
	$('nav.primary .indicator').css('top',$('nav.primary a.'+currentModule).offset().top + 15);

	$('nav.primary a').click(function() {
		$('body').removeClass(currentModule);
		$('body').removeClass('sidebar-hidden');
		sidebarHidden = false;
		currentModule = $(this).attr('class');
		$('nav.primary .indicator').css('top',$(this).offset().top + 15);
		if(currentModule == 'logo') {
			$('nav.primary .indicator').css('top',$('nav.primary a.home').offset().top + 15);
			currentModule = 'home';
		}
		$('body').addClass(currentModule);
	});

	sidebarTabs = $('.sidebars li.tab a');
	sidebarTabs.click(function() {
		that = $(this);
		if($(this).hasClass('devices')) {
			$('#devices-map').css('right', 300);
			$('.devices-pane').css('right', 0);
		} else {
			$('#devices-map').css('right', '');
			$('.devices-pane').css('right', '');
		}
		sidebarTabs.removeClass('active');
		sidebarTabPanes = $(this).parent().parent().parent().find('.pane');
		sidebarTabPanes.removeClass('active');
		thisSidebarTabPane = $(this).parent().parent().parent().find('.'+that.attr('class')+'.pane');
		thisSidebarTabPane.addClass('active');
		$(this).addClass('active');
	});

	
	$('.sidebar-toggle').click(function() {
		if(!sidebarHidden) {
			$('body').addClass('sidebar-hidden');
			sidebarHidden = true;
		} else {
			$('body').removeClass('sidebar-hidden');
			sidebarHidden = false;
		}
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

/**********************************************************************************************************************
 * @fileOverview Created by Andres Sosa
 * Date: 4/26/2013
 * Time: 12:19 PM
 * @author: <a href="mailto:asosa@securitysciences.com">Andres Sosa</a>
 * @description This file has the main entry point to the application.
 *
 /********************************************************************************************************************/
// ** Make sure we are using the right NameSpace.
namespace('SSE');

(function (Main) {
	/** Initializing. */

	/** START Private Properties. */
	var _sessionId = null;
	/**   END Private Properties. */

	/** START Public Properties. */
	Object.defineProperty(Main, 'SessionID', {
		get: function() { return _sessionId; }
	});
	/**   END Public Properties. */

	/** START Public Method. */

	Main.GetSessionIdFx = function ()
	{
		/** Initialize. */
		function fxSuccess(response)
		{
			_sessionId = response.SessionID;
		}
		function fxFailure(response)
		{
			SSE.Lib.MessageBox.Failure(SSE.Models.Message.new({
				Title: 'Failure occurred.'
				, MessageBody: "The following response object was returned: " + response
				, MessageType: "Failure"
			}));
		}

		if (_sessionId === undefined || _sessionId === null)
		{
			SSE.Services.Authentication.SessionStart({'SuccessFx': fxSuccess, 'FailureFx': fxFailure});
		}
	};


	Main.Initialize = function()
	{

	};
	/**   END Public Method. */

}(SSE.Main = SSE.Main || {}));
