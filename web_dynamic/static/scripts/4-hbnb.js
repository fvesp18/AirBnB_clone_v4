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
	  $('.amenities h4').html(output);
	});
	$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
			if (data.status === 'OK') {
				$('#api_status').addClass('available');
			} else {
				$('#api_status').removeClass('available');
			}
  });
	$.ajax({
		method: 'POST',
		url: 'http://0.0.0.0:5001/api/v1/places_search',
		contentType: 'application/json',
		dataType: 'json',
		data: {},
		success: function(data) {
			for (place of data) {
				const html = 
		'<article>' + '<div class="title_box">' + 
		'<h2>' +  place.name  + 
		'</h2>' + '<div class="price_by_night">' +
	       	place.price_by_night + '</div>' + '</div>' +
	       	'<div class="information">' + '<div class="max_guest">' +
	      	place.max_guest + 'Guest' + '</div>' +
	       	'<div class="number_rooms">' + place.number_rooms +
	       	'Bedroom' + '</div>' + '<div class="number_bathrooms">' +
	       	place.number_bathrooms + 'Bathroom' +
	       	'</div>' + '</div>' + '<div class="description">' + 
		place.description + '</div>' + '</article>';
				$('.places').append(html);
			}
		}
	});
}
