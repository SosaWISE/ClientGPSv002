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