$(function() {

	var currentModule = 'home';
	var sidebarHidden = false;

	$('body').addClass(currentModule);
	$('nav.primary .indicator').css('top',$('nav.primary a.'+currentModule).offset().top + 15);

	$('nav.primary a').click(function() {
		$('body').removeClass(currentModule);
		$('body').removeClass('sidebar-hidden');
		$('.sidebars > .sidebar').removeClass('active');
		sidebarHidden = false;
		currentModule = $(this).attr('class');
		$('nav.primary .indicator').css('top',$(this).offset().top + 15);
		if(currentModule == 'logo') {
			$('nav.primary .indicator').css('top',$('nav.primary a.home').offset().top + 15);
			currentModule = 'home';
		}
		$('body').addClass(currentModule);
		$('.sidebars > .sidebar.'+currentModule).addClass('active');
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

	$('.sidebars .content ul li').click(function() {
		if($('body').attr('class') != 'home' && $('body').attr('class') != 'reports') {
			$(this).parent().find('li').removeClass('active');
			$(this).addClass('active');	
		}
	});

	$('a.edit-btn').click(function() {
		parent = $(this).parent();
		activeSidebar = $('.sidebar.active');
		if(activeSidebar.hasClass('devices')) {
			devicesModule = $('.modules .devices');
			activePane = $('.pane.active');
			activePane.addClass('editing');
			$('.sidebar-toggle').css('z-index', 0);
			if(activePane.hasClass('geofences')) {
				devicesModule.addClass('editing');
			}
			if(parent.hasClass('actions')) {
				activePane.addClass('edit-item');
			}
		} else {
			activeSidebar.addClass('editing');
			if(parent.hasClass('actions')) {
				activeSidebar.addClass('edit-item');
			}
		}
	});
	$('.edit-wrap .cancel, .edit-wrap .save').click(function(){
		activeSidebar = $('.sidebar.active');
		if(activeSidebar.hasClass('devices')) {
			panes = $('.sidebars .pane');
			devicesModule = $('.modules .devices');
			panes.removeClass('editing edit-item');
			devicesModule.removeClass('editing');
			$('.sidebar-toggle').css('z-index', '');
		} else {
			activeSidebar.removeClass('editing edit-item');
		}
	});

	$('select').change(function(){
	    if($(this).val() == 'placeholder') {
	    	$(this).removeClass('item-selected');
	    } else {
	    	$(this).addClass('item-selected');
	    }
	});

});
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

(function (Main, $) {
	/** Initializing. */

	/** START Private Properties. */
	/**
	 * @property {long} _sessionId This is the currently active session.  This is stored in a cockie.
	 * @private
	 */
	var _sessionId = null;
	/**
	 * @property {object} _authCustomer This is the Authenticated Customer.
	 * @private
	 */
	var _authCustomer = null;
	/**   END Private Properties. */

	/** START Private event handlers. */
	function _onSessionStart(e)
	{
		_sessionId = e.SessionID;
	}
	function _onCustAuthentication(e)
	{
		_authCustomer = e.authenticatedCustomer;
	}
	function _onSessionTermination()
	{
		_authCustomer = null;
		_sessionId = null;
	}
	/**   END Private event handlers. */


	/** START Public Properties. */
	Object.defineProperty(Main, 'SessionID', {
		get: function() { return _sessionId; }
		, set: function(val) { _sessionId = val; }
	});
	Object.defineProperty(Main, 'AuthCustomer', {
		get: function() { return _authCustomer; }
	});
	/**   END Public Properties. */

	/** START Public Method. */

	/**
	 * @description This method retrieves the SessionID Asynchronously.
	 */
	Main.GetSessionIdFx = function ()
	{
		/** Initialize. */
		function fxSuccess(response)
		{
			_sessionId = response.SessionId;
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

	/**
	 * This method returns the session id for a new session.  It does this by making an syncronous call.
	 * @returns {long}
	 */
	Main.GetSessionIdFxSync = function (){
		/** Check to see if the SessionID is already present. */
		if (_sessionId === undefined || _sessionId === null)
		{
			/** Execute call. */
			var responseObj = SSE.Services.Authentication.SessionStartSync();
			_sessionId = responseObj.SessionID;
		}

		/** Return sessionId. */
		return _sessionId;
	};


	/**
	 * @description This is the main entry point for the application.
	 */
	Main.Initialize = function()
	{
		/** Initialize any special handlers of internal events. */
		$(document).on('custAuthentication', _onCustAuthentication);
		$(document).on('sessionTermination', _onSessionTermination);
		$(document).on('sessionStart', _onSessionStart);

		/** Start the new session. */
		SSE.Services.Authentication.SessionStart({
			SuccessFx: function (response)
			{
				_sessionId = response.SessionId;

				/** Check to see if there was a successfull authentication. */
				if (response.Value.AuthCustomer !== null)
				{
					/** Fire trigger. */
					$.event.trigger({
						type: 'custAuthentication'
						, authenticatedCustomer: response.Value.AuthCustomer
						, time: new Date()
					});
				}
			}
			, FailureFx: function (response){
				SSE.Lib.MessageBox.Failure(SSE.Models.Message.new({
					Title: "Failure on Main Init"
					, MessageBody: "When calling SessionStart a failure occurred: " * response
					, MessageType: "Failure"
				}));
			}
		});
	};
	/**   END Public Method. */

}(SSE.Main = SSE.Main || {}, jQuery));
