var organigramData = {
	"door1" : {
		"content":"Nous Trouver",
		"system":{
			"events":{
				"onclick":function(){
					if($("#door2").is(":visible")){
						$("#door2").slideUp();
						$("#contactLinks").slideDown();
						phOrganigram.openIdsBreadCrumb.unshift("contactLinks");
					}else{
						$("#contactLinks").slideUp();
						$("#door2").slideDown();
						phOrganigram.openIdsBreadCrumb.shift();
					}
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
				"Trello" : {
					"system":{
						"id":"link1",
						"onhover":function(){},
						"onclick":function(){}
					},
					"link" : "https://trello.com/board/pixel-humain-echolocal/50a3e15a175358d65a0089ef"
				},
				"Blog" : {"link":"http://blog.pixelhumain.com/"},
				"Twitter" : "",
				"FaceBook" : {"link":"https://www.facebook.com/groups/pixelhumain/"},
				"Diigo":{"link":"https://groups.diigo.com/group/pixelhumain"},
				"Mailing List" : {"link":"https://groups.google.com/forum/?hl=fr&fromgroups=#!forum/pixelhumain"},
				"Mail" : {"link":"contact@pixelhumain.com"},
				"Google Community" : "Restraint pour le moment",
				"Google Drive" : "Restraint pour le moment",
				"Google Maps" : {}
			}
		}
	},
	"door2" : {
		"content":"Pixels Actifs",
		"system":{
			"events":{
				"onclick":function(){
					
					if($("#door1").is(":visible")){log('door2 click','open');
						$("#door1").slideUp();
						$("#workTypes").slideDown();
						phOrganigram.openIdsBreadCrumb.unshift("workTypes");
					}else{log('door2 click',"close","#"+phOrganigram.clickIdsBreadCrumb[0]);
						$("#workTypes").slideUp();
						$("#door1").slideDown();
						phOrganigram.openIdsBreadCrumb.shift();
						
					}
				},
				"onhover":function(){}
			}
		},
		"open":{
			"system":{
				"id":"workTypes"
			},
			"list":{
				"benevoles":{
					"content" : "Toute L'equipe",
					"system":{
						"id":"benevoles",
						"events":{
							"onclick":function(){
								genericOpenClose("#door2");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"jlo":{
								"content":"Jeremy Loreau",
								"system":{
									
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								}
							},
							"jgo":{
								"content":"Jerome Gonthier",
								"system":{
									
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								}
							},
							"kla":{
								"content":"Kevin Lainé",
								"system":{
									
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								}
							},
							"slo":{
								"content":"Stephanie Lorente",
								"system":{
									
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								}
							},
							"sba":{
								"content":"Sylvain Barbot",
								"system":{
									
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								},
							},
							"tka":{
								"content":"Tibor Katelbach",
								"system":{
									
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								},
							}
						}
					}
				},
				"graphistes" : {
					"system":{
						"id":"graphistes",
						"events":{
							"onclick":function(){
								genericOpenClose("#door2");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"slo":{
								"content":"Stephanie Lorente",
								"system":{
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								}
							},
							"jlo":{
								"content":"Jeremy Loreau",
								"system":{
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								}
							}
						}
					}
				},
				"developpement":{
					"content":"Développement",
					"system":{
						"id":"developpement",
						"events":{
							"onclick":function(){
								genericOpenClose("#door2");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"tka":{
								"content":"Tibor Katelbach",
								"system":{
									"events":{
										"onclick":function(){
											genericFlip("developpement_tka","<img src='img/TKA.png' class='closeFlip fl'/> blablhablab<br/>lablalbabla<br/>blablhablab<br/>lablalbabla<br/>");
										},
										"onhover":function(){}
									}
								}
							},
							"sba":{
								"content":"Sylvain Barbot",
								"system":{
									"events":{
										"onclick":function(){
											genericFlip('developpement_sba', "<h1>Sylvain Barbot!</h1><img src='img/PEACE2.png' class='closeFlip'/> blablhablab<br/>lablalbabla<br/>");
										},
										"onhover":function(){}
									}
								}
							}
						}
					}
				},
				"drh":{
					"system":{
						"id":"drh",
						"events":{
							"onclick":function(){
								genericOpenClose("#door2");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"jgo":{
								"content":"Jerome Gonthier",
								"system":{
									
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								}
							},
							"sba":{
								"content":"Sylvain Barbot",
								"system":{
									
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								}
							},
							"slo":{
								"content":"Stephanie Lorente",
								"system":{
									
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								}
							},
							"tka":{
								"content":"Tibor Katelbach",
								"system":{
									
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								}
							}
						}
					}
				},
				"administratif":{
					"system":{
						"id":"administratif",
						"events":{
							"onclick":function(){
								genericOpenClose("#door2");
							},
							"onhover":function(){}
						}
					},
					"open":{
						"list":{
							"jgo":{
								"content":"Jerome Gonthier",
								"system":{
									
									"events":{
										"onclick":function(){alert("click");},
										"onhover":function(){}
									}
								}
							}
						}
					}
				},
				"recrutons":{
					"system":{
						"id":"recrutons",
						"events":{
							"onclick":function(){
								genericOpenClose("#door2");
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

function genericOpenClose(parentId){
	//the list is closed open it
	if($(parentId).is(":visible")){
		$(parentId).slideUp();
		$("#"+phOrganigram.clickIdsBreadCrumb[0]+"List").slideDown();
		phOrganigram.openIdsBreadCrumb.unshift(phOrganigram.clickIdsBreadCrumb[0]+"List");
	}else{
		//clicking twice on the same elment closes the section
		if(phOrganigram.clickIdsBreadCrumb[0] == phOrganigram.clickIdsBreadCrumb[1]){
			$("#"+phOrganigram.openIdsBreadCrumb[0]).slideUp();
			phOrganigram.openIdsBreadCrumb.shift();
			$("#door2").slideDown();
		}else{
			//open a different elemetn in the list
			$("#"+phOrganigram.openIdsBreadCrumb[0]).slideUp();
			$("#"+phOrganigram.clickIdsBreadCrumb[1]).removeClass('blockSelected');
			phOrganigram.openIdsBreadCrumb.shift();
			$("#"+phOrganigram.clickIdsBreadCrumb[0]+"List").slideDown();
			phOrganigram.openIdsBreadCrumb.unshift(phOrganigram.clickIdsBreadCrumb[0]+"List");
			
		}
	}
}
function genericFlip(id,html){
	if(phOrganigram.back != null){
		//closing by clicking another elmetn
		if($("#"+phOrganigram.clickIdsBreadCrumb[1]).hasClass('blockSelected'))
			$("#"+phOrganigram.clickIdsBreadCrumb[1]).removeClass('blockSelected');
		phOrganigram.back.close();
	}
	phOrganigram.back = flippant.flip($('#'+id)[0], html);
	$(".closeFlip").click(function(){
		phOrganigram.back.close();
		phOrganigram.back=null;
		//closing the currently flipped element
		$("#"+phOrganigram.clickIdsBreadCrumb[0]).removeClass('blockSelected');
	});
}