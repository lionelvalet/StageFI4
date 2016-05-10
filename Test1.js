var onAuthorize = function(){

	alert("Autorisé"); //message confirmant l'autorisation

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
	var username = document.getElementById("username").value; 
	var userBoards = $("<div>").text("").appendTo("#dboards");
    var $idmembers = $("<div>").text("").appendTo("#dmembers");

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
    var duree;
 
 //Récupère l'identifiant d'un membre en spécifiant son nom d'utilisateur

    		Trello.get("members/"+username,function(member){
    			$("<a>")
    			.text("id de "+username+": "+member.id)
    			.appendTo($idmembers);

    			//Récupère les tableaux de l'utilisateur renseigné	
    			Trello.get("members/"+member.id+"/boards", function(boards) {
					$boards.empty();
					$("<p>").text("Tableaux de "+username+" :").appendTo($boards);
            		$.each(boards, function(ix, board) {
                		$("<p>")
                		.addClass("board")
                		.text(board.name+" | id: "+board.id)
                		.appendTo($boards);


                		//Récupère les listes de chaque tableau (/!\problème car récupère les tableaux où un membre n'y est pas associé)
                		Trello.get("boards/"+board.id+"/lists", function(lists) {
            				$lists.empty();
            				$("<p>").text("Listes de "+username+" :").appendTo($lists);
            				$.each(lists, function(ix, lists) {
                				$("<p>")
                				.addClass("list")
                				.text(lists.name+" | id: "+lists.id)
                				.appendTo($lists); 
            				}); 
           				 });

            		});

				});


    			//Récupère les cartes de l'utilsateur renseigné
				Trello.get("members/"+member.id+"/cards", function(cards) {
            		$cards.empty();
            		$("<p>").text("Cartes de "+username+" :").appendTo($cards);
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

                		duree = card.name.substring(parseIndex1+1, parseIndex2);
                		// console.log(duree+" heure(s)");

                		$("<p>").text(" durée: "+duree+" heure(s)").appendTo($cards);

            	}); 
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