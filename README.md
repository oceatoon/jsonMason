jsonMason
=========

build a menu, viewer and visualisation of Json defined content

Structure 
------------


 Node structure : 
 "data" node contains references or system information and is not rendered directly 
 "menu" node is a list , and is renderedas a menu by renderMenu
   "menu":{
    	"system":{
  			"id":"menu"
  		},
  		"open":{
  			"system":{
  				"id":"menuChild"
  			},
  			"list":{
  				"menu1" : {
  					"content":"Formation Initiale",
  					"system":{
  						"events":{
  							"onclick":function(){
  								activate("door1","door1Child");
  							},
  							"onhover":function(){
  								
  							}
  						}
  					}
  				},
 all other nodes a content and rendered recursively by renderChildrenRecursively
 - node referencing : can be used when a nodes content is repeated many times 
 in this case the node is added into "data" and referenced like so : "data.people.jgo"
 
 example with 3 levels of content:
 - door2 is the first 
 - has a list of children where benevoles is the first 
 - benevoles has it self a list of referenced nodes for content
 notice any node can carry an "events" (onclick, onhover) nodes these are grouped during render and activated after the render process
 if a node doesn't have a "content", it's id will be rendered 
 
   "door2" : {
  		"content":"Pixels Actifs",
  		"system":{
  			"events":{
  				"onclick":function(){
  					genericOpenClose2("door1","door2Child");
  				},
  				"onhover":function(){}
  			}
  		},
  		"open":{
  			"system":{
  				"id":"door2Child"
  			},
  			"list":{
  				"benevoles":{
  					"content" : "Toute L'equipe",
  					"system":{
  						"id":"benevoles",
  						"events":{
  							"onclick":function(){
  								genericOpenClose2("door2","benevolesChild");
  							},
  							"onhover":function(){}
  						}
  					},
  					"open":{
  						"list":{
  							"jlo":"data.people.jlo",
  							"jgo":"data.people.jgo",
  							"kla":"data.people.kla",
  							"slo":"data.people.slo",
  							"sba":"data.people.sba",
  							"tka":"data.people.tka"
  						}
  					}
  				},
