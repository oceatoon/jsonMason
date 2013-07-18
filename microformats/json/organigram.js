var organigramData = {
	"Nous Trouver" : {
		"Trello" : {"link":"https://trello.com/board/pixel-humain-echolocal/50a3e15a175358d65a0089ef"},
		"Blog" : {"link":"http://blog.pixelhumain.com/"},
		"Twitter" : "",
		"FaceBook" : {"link":"https://www.facebook.com/groups/pixelhumain/"},
		"Diigo":{"link":"https://groups.diigo.com/group/pixelhumain"},
		"Mailing List" : {"link":"https://groups.google.com/forum/?hl=fr&fromgroups=#!forum/pixelhumain"},
		"Mail" : {"link":"contact@pixelhumain.com"},
		"Google Community" : "Restraint pour le moment",
		"Google Drive" : "Restraint pour le moment",
		"Google Maps" : {}
	},
	"Pixels Actifs" : {
		"Graphiste" : {
			"Stephanie Lorente":{
				"Tel":"",
				"Mail":""
			},
			"Jermey Loureau":{
				"Tel":"",
				"Mail":""	
			}
		},
		"Developpement":{
			"Tibor Katelach":{
				"Tel":"",
				"Mail":""
			}
		},
		"DRH":{
			"Sylvain Barbot":{
				"Tel":"",
				"Mail":""
			}
		},
		"Bénévoles":{
			"Kevin Lainé":{
				"Mail":""
			}
		},
		"Administratif":{
			"Jerome Gonthier":{
				"Tel":"",
				"Mail":""
			}
		},
		"Nous cherchons":[
			"Assistante Administrative",
			"Analyste Financier",
			"Community Manager",
			"Génie Marketing"
		]
	}	
};
var debug = true;
function log(){
	if(debug)
		console.log(arguments);
}
function dir(){
	if(debug)
		console.dir(arguments);
}
Organigram = function(data){
	
	var self = this;
	this.clickIds = [];
	this.data = data;
	
	this.render = function(json,width,lvl,hide)
	{
		dir(json);
		var classUl = "";
		if(hide)
			classUl = "hidden";
		
		var html ='<ul id="lvl'+lvl+'" class="'+classUl+'">';
		var width = width/_.size(json);
		var childCount = 0;
		$.each(json, function(key, val){
			//html += "<div class='block' style='width:"+width+"%; background-color:grey;'>"+key;
			
			classLi = (typeof val == "object" ) ? 'clickable' : '';
			
			html += '<li id="child'+lvl+childCount+'" class="'+classLi+'">'+key;
			html += '</li>';
			if(typeof val == "object" ){
				//builds recursivly 
				html += self.render(val,width,lvl+""+childCount,true);
				
				//post building helps bind click events to objects
				self.clickIds.push({"parent" : "child"+lvl+childCount,
									"open" : "lvl"+lvl+""+childCount});
			}
			else
				html += " " +val;
			
			childCount++;
			//html += "</div>";
		});
		html +='</ul>';
		
		
		return html;
	};
	this.activeClicks = function(){
		$.each(self.clickIds, function(i, link){
			$("#"+link.parent).click(function(){
				$(".active").removeClass("active");
				$(this).addClass("active");
				$("#"+link.open).slideToggle();
				log("found siblings",$("#"+link.open).siblings().length);
				//$("#"+link.open).siblings().addClass("hidden");
			})
		});
		
	}
};


