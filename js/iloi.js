var organigramData = {
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
				"menu2" : {
					"content":"Formation Continue",
					"system":{
						"events":{
							"onclick":function(){
								activate("door2","door2Child");
							},
							"onhover":function(){
								
							}
						}
					}
				},
				"menu3" : {
					"content":"Pôle Recherche",
					"system":{
						"events":{
							"onclick":function(){
								activate("recherche","rechercheChild");
							},
							"onhover":function(){
								
							}
						}
					}
				}
			}
		}
	},
	"door1" : {
		"content":"Formation Initiale",
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
				"id":"door2Child"
			},
			"list":{
				"ANNÉE PRÉPARATOIRE : PASARTIC" : "",
				"PREMIER CYCLE : MAAJIC, LICENCE" : "",
				"SECOND CYCLE : MASTER, FORMA" : ""
			}
		}
	},
	"door2" : {
		"content":"Formation Continue",
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
				"id":"workTypes"
			},
			"list":{
				"licence":{
					"system":{
						"id":"licence",
						"events":{
							"onclick":function(){
								genericOpenClose2("door2","licenceChild");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"licence1":{
								"system":{
									"id":"licence1",
									"events":{
										"onclick":function(){
											genericOpenClose2("door2Child","licence1Child");
										},
										"onhover":function(){
											
										}
									}
								},
								"open":{
									"system":{
										"editable":true
									},
									"content":'<div style="padding:15px"><h1>HTML Ipsum Presents 1 </h1><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p></div>'
								}
							},
							"licence2":{
								"system":{
									"id":"licence2",
									"events":{
										"onclick":function(){
											genericOpenClose2("door2Child","licence2Child");
										},
										"onhover":function(){
											
										}
									}
								},
								"open":{
									"system":{
										"editable":true
									},
									"content":'<div style="padding:15px"><h1>HTML Ipsum Presents 2 </h1><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p></div>'
								}
							},
							"licence3":"",
							"licence4":"",
							"licence5":"",
						}
					}
				},
				"master" : {
					"system":{
						"id":"master",
						"events":{
							"onclick":function(){
								genericOpenClose2("door2","masterChild");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"master1":"",
							"master2":"",
							"master3":"",
						}
					}
				},
				"recherche":{
					"system":{
						"id":"recherche",
						"events":{
							"onclick":function(){
								genericOpenClose2("door2","rechercheChild");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"recherche1":"",
							"recherche2":""
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