let modalOverlayResult;
let closeButtonResult;
$(function(){
	$(".item-content ul li").each(function(){
		var fold = $(this).find(".fold");
		if(fold.is(":hidden")){
			$(this).width(630);
		}else{
			$(this).width(140);
		}
	})

	$(".item-content ul li").click(function(){
		$(this).animate({width:630},200);
		$(this).find(".unfold").show();
		$(this).find(".fold").hide();
		$(this).siblings().animate({width:140},200);
		$(this).siblings().find(".unfold").hide();
		$(this).siblings().find(".fold").show();
	})

	modalOverlayResult = document.querySelector('.modal-overlay-result');
	closeButtonResult = document.querySelector('.close-button-result');
	document.addEventListener('click', (event) => {
		if (event.target === modalOverlayResult || event.target === closeButtonResult) {
			modalOverlayResult.style.display = 'none';
		}
	});
})

function countResult(id) {	
	// modalOverlayResult.style.display = 'flex';
	window.location.href='./info.html'
};
