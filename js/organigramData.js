/**
 * Node structure : 
 * "data" node contains references or system information and is not rendered directly 
 * "menu" node is a list , and is renderedas a menu by renderMenu
 * "menu":{
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
 * all other nodes a content and rendered recursively by renderChildrenRecursively
 * - node referencing : can be used when a nodes content is repeated many times 
 * in this case the node is added into "data" and referenced like so : "data.people.jgo"
 * 
 * example with 3 levels of content:
 * - door2 is the first 
 * - has a list of children where benevoles is the first 
 * - benevoles has it self a list of referenced nodes for content
 * notice any node can carry an "events" (onclick, onhover) nodes these are grouped during render and activated after the render process
 * if a node doesn't have a "content", it's id will be rendered 
 * 
 * "door2" : {
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
*/
var organigramData = {
	"data":{
		"people":{
			"jlo":{
				"content":"Jeremy Loreau",
				"data":{
					"name":"Jeremy Loreau",
					"txt":"blablhablab<br/>lablalbabla<br/>",
					"img":"img/KID.png"
				},
				"system":{
					"events":{
						"onclick":function(){
							genericFlip(organigramData.data.people.jlo.data);
						},
						"onhover":function(){}
					}
				}
			},
			"jgo":{
				"content":"Jerome Gonthier",
				"data":{
					"name":"Jerome Gonthier",
					"txt":"blablhablab<br/>lablalbabla<br/>",
					"img":"img/ECOLO.png"
				},
				"system":{
					"events":{
						"onclick":function(){
							genericFlip(organigramData.data.people.jgo.data);
						},
						"onhover":function(){}
					}
				}
			},
			"kla":{
				"content":"Kevin Lainé",
				"data":{
					"name":"Kevin Lainé",
					"txt":"blablhablab<br/>lablalbabla<br/>",
					"img":"img/SMILEY.png"
				},
				"system":{
					"events":{
						"onclick":function(){
							genericFlip(organigramData.data.people.kla.data);
						},
						"onhover":function(){}
					}
				}
			},
			"slo":{
				"content":"Stephanie Lorente",
				"data":{
					"name":"Stephanie Lorente",
					"txt":"blablhablab<br/>lablalbabla<br/>",
					"img":"img/SLO.png"
				},
				"system":{
					"events":{
						"onclick":function(){
							genericFlip(organigramData.data.people.slo.data);
						},
						"onhover":function(){}
					}
				}
			},
			"sba":{
				"content":"Sylvain Barbot",
				"data":{
					"name":"Sylvain Barbot",
					"txt":"blablhablab<br/>lablalbabla<br/>",
					"img":"img/PEACE2.png"
				},
				"system":{
					"events":{
						"onclick":function(){
							genericFlip(organigramData.data.people.sba.data);
						},
						"onhover":function(){}
					}
				}
			},
			"tka":{
				"content":"Tibor Katelbach",
				"data":{
					"name":"Tibor Katelbach",
					"txt":"blablhablab<br/>lablalbabla<br/>",
					"img":"img/TKA.png"
				},
				"system":{
					"events":{
						"onclick":function(){log("flip it");
							genericFlip(organigramData.data.people.tka.data);
						},
						"onhover":function(){}
					}
				}
			}
			
		}
	},
	"door1" : {
		"content":"Nous Trouver",
		"system":{
			"events":{
				"onclick":function(){
					genericOpenClose2("door2","door1Child");
				},
				"onhover":function(){
					
				}
			}
		},
		"open":{
			"system":{
				"id":"contactLinks"
			},
			"list":{
				"Trello <br/><small>(gestion projet)</small>" : {
					"link" : "https://trello.com/board/pixel-humain-echolocal/50a3e15a175358d65a0089ef"
				},
				"Blog <br/><small>(communication)</small>" : {"link":"http://blog.pixelhumain.com/"},
				"Twitter <br/><small>(communication)</small>" : {"link":"https://twitter.com/PixelHumain"},
				"FaceBook <br/><small>(communication)</small>" : {"link":"https://www.facebook.com/groups/pixelhumain/"},
				"Diigo<br/><small>(bookmarking)</small>":{"link":"https://groups.diigo.com/group/pixelhumain"},
				"Mailing List<br/><small>(communication)</small>" : {"link":"https://groups.google.com/forum/?hl=fr&fromgroups=#!forum/pixelhumain"},
				"Mail<small><br/>(contact us)</small>" : {"link":"contact@pixelhumain.com"},
				"Google Community <br/><small>(bénévole only)</small>" : "Restraint pour le moment",
				"Google Drive <br/><small>(bénévole only)</small>" : "Restraint pour le moment",
				/*"googleMap" : {
					"content":"Google Maps",
					"system":{
						"events":{
							"onclick":function(){
								
							},
							"onhover":function(){
								
							}
						}
					},
				}*/
			}
		}
	},
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
				"graphistes" : {
					"system":{
						"id":"graphistes",
						"events":{
							"onclick":function(){
								genericOpenClose2("door2","graphistesChild");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"slo":"data.people.slo",
							"jlo":"data.people.jlo",
						}
					}
				},
				"developpement":{
					"content":"Développement",
					"system":{
						"id":"developpement",
						"events":{
							"onclick":function(){
								genericOpenClose2("door2","developpementChild");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"tka":"data.people.tka",
							"sba":"data.people.sba"
						}
					}
				},
				"drh":{
					"system":{
						"id":"drh",
						"events":{
							"onclick":function(){
								genericOpenClose2("door2","drhChild");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"jgo":"data.people.jgo",
							"sba":"data.people.sba",
							"slo":"data.people.slo",
							"tka":"data.people.tka"
						}
					}
				},
				"administratif":{
					"system":{
						"id":"administratif",
						"events":{
							"onclick":function(){
								genericOpenClose2("door2","administratifChild");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"jgo":"data.people.jgo"
						}
					}
				},
				"recrutons":{
					"system":{
						"id":"recrutons",
						"events":{
							"onclick":function(){
								genericOpenClose2("door2","recrutonsChild");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"Autonome":"",
							"Alternatif":"",
							"Créatif":"",
							"Ouvert":"",
							"Assistante Administrative":"",
							"Analyste Financier":"",
							"Community Manager":"",
							"Génie Marketing":""
						}
					}
				}
			}
		}
	}	
};

function closeAll(){
	$(".blockSelected").removeClass('blockSelected');
	$.each(phOrganigram.buildIds, function(i, key)
	{
		if( $("#"+key).is(":visible") )
			$( "#"+key ).hide();
	});
}
function activate(panel1, panel2){
	closeAll();
	$( "#"+panel1 ).slideDown();
	phOrganigram.openIdsBreadCrumb.unshift(panel1);
	$( "#"+panel2 ).slideDown();
	phOrganigram.openIdsBreadCrumb.unshift(panel2);
}
/**
 *  Generic function to open close panels
 * @param parentId : the 2nd parent to be closed
 * @param openId : the child to open
 * @returns
 */
function genericOpenClose2(parentId,openId){
	log("genericOpenClose2",parentId,openId);
	if($("#"+openId).length == 0)
			alert(openId+" doesn't exist");
	// the list is closed open it
	if( $("#"+parentId).is(":visible") ){
		$("#"+parentId).slideUp("normal",function(){
			$( "#"+openId ).slideDown();
			phOrganigram.openIdsBreadCrumb.unshift(openId);
		});
	}else{
		// clicking twice on the same elment closes the section
		if(phOrganigram.clickIdsBreadCrumb[0] == phOrganigram.clickIdsBreadCrumb[1]){
			
			$("#"+phOrganigram.openIdsBreadCrumb[0]).slideUp("normal",function(){
				phOrganigram.openIdsBreadCrumb.shift();
				$("#"+parentId).slideDown();
			});
		}else{
			// open a different elemetn in the list
			$("#"+phOrganigram.openIdsBreadCrumb[0]).slideUp("normal",function(){
				$("#"+phOrganigram.clickIdsBreadCrumb[1]).removeClass('blockSelected');
				phOrganigram.openIdsBreadCrumb.shift();
				$("#"+openId).slideDown();
				phOrganigram.openIdsBreadCrumb.unshift(openId);
			});
			
			
		}
	}
}
function genericFlip(jsonData){
	log("flipping it");
	// build the back HTMl dynamically
	var backHtml = "<img src='"+jsonData.img+"' class='closeFlip fl'/><h1>"+jsonData.name+"!</h1> "+jsonData.txt;
	if(phOrganigram.back != null){
		// if a different elemetnt is selected, first close, before opening
		// newly clicked
		if($("#"+phOrganigram.clickIdsBreadCrumb[1]).hasClass('blockSelected'))
			$("#"+phOrganigram.clickIdsBreadCrumb[1]).removeClass('blockSelected');
		phOrganigram.back.close();
	}
	
	// flip clicked element
	phOrganigram.back = flippant.flip($('#'+phOrganigram.clickIdsBreadCrumb[0])[0], backHtml);
	
	// prepare close event code
	$(".closeFlip").click(function(){
		phOrganigram.back.close();
		phOrganigram.back=null;
		// closing the currently flipped element
		$("#"+phOrganigram.clickIdsBreadCrumb[0]).removeClass('blockSelected');
	});
}