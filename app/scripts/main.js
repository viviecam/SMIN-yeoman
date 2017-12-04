$(document).ready(function() {

/* Swiper - Additional library */
	// var swiperHome = new Swiper ('.swiper-container.swiper-home', {
 //    	direction: 'horizontal',
	// 	autoplay: {
	// 		delay: 2500,
	// 		disableOnInteraction: false,
	// 	},
 //    	navigation: {
 //    		nextEl: '.swiper-button-next',
 //    		prevEl: '.swiper-button-prev',
 //    	},
	// 	pagination: {
	// 		el: '.swiper-pagination',
	// 		clickable: true,
	// 	}
 //    });     

/* Au survol d'une image */
	$( '.img-survol' ).hover(function() {
		console.log('survol');
		var myAlt = $(this).attr('alt');
		console.log(myAlt);
	});


/* Afficher dans la console et dans le h2 le “Name” retourné.*/
	var swapi1 = 'https://swapi.co/api/people/1/?format=json';
	$.getJSON(swapi1, function(json) {
		console.log(json.name);
		$('h2#name').html(json.name);
	});


/* Afficher la liste des personnages et générer leurs modales correspondantes */
	var id = 1; //initialisation de l'id du personnage, 
				//qui sert à lier le nom dans la liste, à la modale correspondante
	var swapi = 'https://swapi.co/api/people/?format=json&page=1' ;
				//initialisation de l'url
	getDonnees(swapi);

	//Requête vers l'API SWAPI
	function getDonnees(swapi) {
		// for (i=1; i<=9; i++) { //Ancienne version, lorsque l'on imposait un nombre de page
		$.getJSON(swapi, function(json) {
			// console.log(json.next);
			// console.log(json);
			$.each(json.results, function(){
				$('ol#list-characters').append('<li class="col-12 col-md-4"><a data-toggle="modal" data-target="#modal-charac-' + id + '">' + this.name + '</a></li>');
				$('div#details-characters').append('<div id="modal-charac-' + id + '" class="modal"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">' + this.name + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><ul> </ul></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>')
				for(var key in this) {
					/* Tentative pour récupérer les titres des films, les noms des "species", des "vehicles"...
					au lieu des urls.
					NE FONCTIONNE PAS*/
					// switch (key) {
					// 	case 'films':
							/* Initialisation de la liste des films */
							// $("#modal-charac-" + id + " .modal-body ul").append('<li class="films">' + key + ' : ');
							// console.log(this[key]);
							// console.log(this[key].length);
							/* Pour chaque film, une requête */
							// for (i=0; i<=this[key].length-1; i++) {
							// 	film = this[key][i];
							// 	$.getJSON(film, function(json) {
							// 		// console.log(json);
							// 		console.log(json.title);
							// 		$("#modal-charac-" + id + " .modal-body ul .films").html(json.title + ', ');
							// 	});
							// 	// $("#modal-charac-" + id + " .modal-body ul li.films").append();
							// 	// $("#modal-charac-" + id + " .modal-body ul .films").append(json2.title + ', ');
							// }
							// break;
					// 	case 'homeworld':
					// 	    break;
					// 	case 'species':
					// 	    break;
					// 	case 'vehicles':
					// 	    break;
					// 	case 'starships':
					// 	    break;
					// 	default:
					// 		$("#modal-charac-" + id + " .modal-body ul").append("<li>" + key + ' : ' + this[key] + "</li>");
					// 		break;
						// }
					// console.log(this);
				    $('#modal-charac-' + id + ' .modal-body ul').append('<li>' + key + ' : ' + this[key] + '</li>');
				}
				id = id+1;
				// console.log('next');	
			});
			//On ajoute l'url de la page suivante dans notre variable
			var swapi = json.next;
			// console.log(swapi);

			//On cache le bouton une fois arrivé à la dernière page
			if (swapi == null) {
				$( '#plusbutton' ).hide();
			};

			//Au clic sur le bouton "Voir plus", on effectue une nouvelle requete avec la nouvelle url
			$( '#plusbutton' ).off().click(function() { //The .off() method removes event handlers that were attached by default
	 			getDonnees(swapi);
	 		});
	 	}); //Fin $.getJSON
	}; //Fin function getDonnees(swapi)
});


