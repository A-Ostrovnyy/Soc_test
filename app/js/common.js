// import * as selectize from "../libs/selectize.js-master/dist/js/selectize.js"


//Counter
$('.count').each(function(){
	$(this).prop('Counter',0).animate({
		Counter: $(this).text()
	},{
		duration: 4000,
		easing: 'swing',
		step: function(now){
			$(this).text(Math.ceil(now));
        }
	});
});


//Render sub_services block

$("#sub_services").change(function() {
    $( ".counter" ).slideToggle( 500, function(){
        $( ".service" ).slideToggle( 500 );
    } );
    $( ".promo_img" ).removeClass( "col-md-6" ).addClass("col-md-3 col-sm-12");
    $( ".wraper" ).removeClass( "col-md-6" ).addClass("col-md-9 col-sm-12");
}); 

//Render stylist block
$(".stylist_head").click(function() {
    $( "#stylist" ).slideToggle( 650 ),
    $( "#art_stylist" ).slideToggle( 650 );
}); 