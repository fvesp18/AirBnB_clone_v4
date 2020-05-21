#!/usr/bin/node
window.onload = function () {
	const selected = {};
	$('INPUT:checkbox').change(function () {
	  if ($(this).is(':checked')) {
		selected[$(this).attr('data-id')] = $(this).attr('data-name');
	  } else {
		delete selected[($(this).attr('data-id'))];
	  }
	  const amenlist = $.map(selected, function (v, k) {
		return v;
	  });
	  let output = '';
	  for (let i = 0; i < amenlist.length; i++) {
		output += amenlist[i];
		if (i < amenlist.length - 1) {
		  output += ', ';
		}
	  }
	  output += '\xa0';
	  $('DIV.amenities h4').html(output);
	});
	$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
			if (data.status === 'OK') {
				$('#api_status').addClass('available');
			} else {
				$('#api_status').removeClass('available');
			}
  });
}
