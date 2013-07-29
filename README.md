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
     				}
      
      
 all other nodes a content and rendered recursively by renderChildrenRecursively
 
   - node referencing : can be used when a nodes content is repeated many times in this case the node is added into "data" and referenced like so : "data.people.jgo"
   - content from templates : a node can be filled using a template sysytem name ex : template/titleAndText.html
       
        
        "open":{
     				"template":{
        					"name":"titleAndText",
       						"data":{
       							"name":"Jerome Gonthier",
       							"txt" : 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus',
       							"headerLinks" : {
       								"site":{"url":"toto.org"},
       								"mail":{"url":"toto@to.org"},
       								"facebook":{"url":"toto.org"},
       								"twitter":{"url":"twotter.org"}
       							},
       							"footerLinks" : {
       								"site":{"url":"toto.org"},
       								"mail":{"url":"toto@to.org"},
       								"facebook":{"url":"toto.org"},
       								"twitter":{"url":"twotter.org"}
       							}	
       						}
       					}
    				}

 example with 3 levels of content
 ----------------------------------
 
 - door2 is the first 
 - has a list of children where benevoles is the first 
 - benevoles has it self a list of referenced nodes for content
 notice any node can carry an "events" (onclick, onhover) nodes these are grouped during render and activated after the render process
 if a node doesn't have a "content", it's id will be rendered 
 content can 
 

json sample code
----------------------------------

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
