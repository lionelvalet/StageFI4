var onAuthorize = function(){

	alert("Autorisé"); //message confirmant l'autorisation

	//Nettoyage de la fenêtre
    $("#dmembers").empty();
    $("#dboards").empty();
    $("#dlists").empty();
    $("#dcards").empty();

	//Récupération de MES tableaux

	// var $boards = $("<div>")
	// 		.text("Loading Boards")
	// 		.appendTo("#dboards");

	// 		Trello.get("members/me/boards", function(boards) {
	// 			$boards.empty();
	// 			$("<p>").text("Mes tableaux: ").appendTo($boards);
 //            	$.each(boards, function(ix, board) {
 //                	$("<p>")
 //                	.addClass("board")
 //                	.text(board.name+" | id: "+board.id)
 //                	.appendTo($boards);
 //            });

	// 	});

	//Récupération de MES cartes
	// var $cards = $("<div>")
 //            .text("Loading Cards...")
 //            .appendTo("#dcards");

 //    var $members = $("<div>")
 //    		.text("Loading Members...")
 // 			.appendTo("#dmembers");
 

 //            Trello.get("members/me/cards", function(cards) {
 //            	$cards.empty();
 //            	$("<p>").text("Mes cartes:").appendTo($cards);
 //            	$.each(cards, function(ix, card) {
 //                	$("<p>")
 //                	.addClass("card")
 //                	.text(card.name+" | id: "+card.id)
 //                	.appendTo($cards);

 //                	Trello.get("cards/"+card.id+"/members", function(members){
 //                		$members.empty();
 //            			$("<p>").text("Membres "+card.name+": ").appendTo($cards);
 //            			$.each(members, function(ix, member) {
 //                			$("<p>")
 //                			.addClass("member")
 //                			.text(member.fullName+" | id: "+member.id)
 //                			.appendTo($cards);
 //                		});
 //            		}); 
 //            	}); 
 //            });


//Définition des variables utiles
    var $idmembers = $("<div>").text("Membres de l'équipe: ").appendTo("#dmembers");


    		//Récupère tous les membres (nom complet et identifiant) d'une équipe passée en paramètre
    		Trello.get("organizations/equipe_test4/members",function(members){

    			$.each(members, function(ix, member) {
                 		$("<p>")
                 		.click(function(){
                 			info(member.id, member.fullName);
                 		})
               			.addClass("member")
                 		.text(member.fullName+" | id: "+member.id)
                 		.appendTo($idmembers);
    			});
    		});
}




function autorisation(){
 Trello.authorize({
        type: "popup",
        success: onAuthorize,
        scope: { write: true, read: true }
    })
}



function info(idmembre, nom){
	
	//Nettoyage de la fenêtre
    $("#dboards").empty();
    $("#dlists").empty();
    $("#dcards").empty();


    //Variables utiles
 	var $boards = $("<div>")
	.text("Loading Boards")
	.appendTo("#dboards");

	var $lists = $("<div>")
            .text("Loading Cards...")
            .appendTo("#dlists");

	var $cards = $("<div>")
            .text("Loading Cards...")
            .appendTo("#dcards");

    var parseIndex1;
    var parseIndex2;
    var dureeC;
    var dureeB;


				//Récupère les tableaux de l'utilisateur renseigné	
    			Trello.get("members/"+idmembre+"/boards", function(boards) {
					$boards.empty();
					$("<p>").text("Tableau(x) de "+nom+" :").appendTo($boards);
					$lists.empty();
            		$("<p>").text("Liste(s) de "+nom+" :").appendTo($lists);
            		$.each(boards, function(ix, board) {
                		$("<p>")
                		.addClass("board")
                		.text(board.name+" | id: "+board.id)
                		.appendTo($boards);

                		//Récupère les listes de chaque tableau (/!\problème car récupère les listes où un membre n'y est pas associé)
                		Trello.get("boards/"+board.id+"/lists", function(lists) {
            				
            				$.each(lists, function(ix, lists) {
            					$("<p>")
                				.addClass("list")
                				.text(lists.name+" | id: "+lists.id)
                				.appendTo($lists); 


                				//Permet d'extraire la durée spécifiée dans une liste
	                			parseIndex1 = lists.name.indexOf("[");
	                			parseIndex2 = lists.name.indexOf("]");

	                			 console.log(parseIndex1);
	                			 console.log(parseIndex2);

	                			 if (parseIndex1 == -1 || parseIndex2 == -1){
	                			 	dureeB = 0;
	                			 }
	                			 else{
	                				dureeB = lists.name.substring(parseIndex1+1, parseIndex2);
	                			}

	                			console.log(dureeB+" heure(s)");

	                			$("<p>").text(" durée: "+dureeB+" heure(s)").appendTo($lists);
            				}); 
           				 });
                	});
            	});



    			//Récupère les cartes de l'utilsateur renseigné
				Trello.get("members/"+idmembre+"/cards", function(cards) {
            		$cards.empty();
            		$("<p>").text("Carte(s) de "+nom+" :").appendTo($cards);
            		$.each(cards, function(ix, card) {
                		$("<p>")
                		.addClass("card")
                		.text(card.name+" | id: "+card.id)
                		.appendTo($cards); 

                		//Permet d'extraire la durée spécifiée dans une carte
                		parseIndex1 = card.name.indexOf("[");
                		parseIndex2 = card.name.indexOf("]");

                		// console.log(parseIndex1);
                		// console.log(parseIndex2);

                		dureeC = card.name.substring(parseIndex1+1, parseIndex2);
                		// console.log(dureeC+" heure(s)");

                		$("<p>").text(" durée: "+dureeC+" heure(s)").appendTo($cards);

            	}); 
            });


    		
}