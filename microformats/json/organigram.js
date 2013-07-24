//TODO : url hashing for Real Simple History and back button feautres
//TODO : make people generic meaning only one definition location
//BUG : on 3rd level
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
	this.clickIds = {};
	this.clickIdsBreadCrumb = [];
	this.openIdsBreadCrumb = [];
	this.data = data;
	this.currentlyOpen = null;
	this.back = null;
	
	
	this.render = function(json)
	{
		dir(json);
		var html = "";
		$.each(json, function(key, val)
		{
			log("level1", key);
			//build first level doors
			html += "<div id='"+key+"' class='txt block topblock'><div>"+val.content.toUpperCase()+"</div></div>";
			self.clickIds[key] = val.system.events;
			if(val.open)
			{
				log("level2" );
				//build 2nd level doors
				html+="<div class='hidden block' id='"+val.open.system.id+"'><ul>";
				var heightLi = 100/_.size(val.open.list);
				htmlLvl3 = "";
				$.each(val.open.list, function(ki, vi)
				{
					var id = "";
					if(vi.system && vi.system.events){
						self.clickIds[ki] = vi.system.events;
						id = "id='"+vi.system.id+"'" ;
					}
					html+="<li "+id+" style='height:"+heightLi+"%' class='txt'><div>";
					html+= (vi.link) ? "<a href='"+vi.link+"'>"+ki.toUpperCase()+"</a>" : ki.toUpperCase();
					html+="</div></li>";
					//build 3rd level doors
					log("level2" ,ki,vi);
					if(vi.open && vi.system)
					{
						log("level3" );
						htmlLvl3 +="<div class='hidden block' id='"+vi.system.id+"List'><ul>";
						var heightLii = 100/_.size(vi.open.list);
						$.each(vi.open.list, function(kii, vii)
						{
							if(vii.system && vii.system.events){
								self.clickIds[ki+"_"+kii] = vii.system.events;
								id = "id='"+ki+"_"+kii+"'" ;
							}
							htmlLvl3+="<li "+id+" style='height:"+heightLii+"%' class='txt txt2'><div>";
							label = (vii.content) ? vii.content.toUpperCase(): kii.toUpperCase() ;
							label= (vii.link) ? "<a href='"+vii.link+"'>"+label+"</a>" : label;
							//hack to vertical align
							htmlLvl3+=label;
							htmlLvl3+="</div></li>";
							log("level3" ,kii,vii);
						});
						htmlLvl3 += "</div></ul>";
						
					}
				});
				html += "</div></ul>";
				html += htmlLvl3;
			}
		});
		return html;
	};
	
	this.activeElements = function()
	{
		//$('#workTypes').insertBefore('#door1');
		$.each(self.clickIds, function(key, events)
		{
			log("activeElements",key);
			if(events.onclick){
				var tmpClick = events.onclick;
				events.onclick = function(source){
					self.clickIdsBreadCrumb.unshift(key);
					log("clicked",key,self.clickIdsBreadCrumb);
					
					tmpClick(source);
					
					//manage genericaly selected css
					if(!$(this).hasClass('blockSelected') )
						$(this).addClass('blockSelected');
					else {
						$("#"+key+" div").html($(this).data("data-text"));
						$(this).removeClass('blockSelected');
					}
				};
				$("#"+key).click(events.onclick);
			}
			//BUG : marche pas qd bg color set in css
			if(events.onhover){
				$("#"+key).mouseover(function(){
					//$(this).data("data-initColor",$(this).css('backgroundColor'));
					if($(this).hasClass('blockSelected')){
						$(this).data("data-text",$("#"+key+" div").html());
						//$(this).css("background-color","yellow");
						$("#"+key+" div").html("BACK");
					}
					$(this).addClass('blockHovered');
				});
				$("#"+key).mouseout(function(){
					//log("data-initColor",$(this).data("data-initColor"));
					if($(this).hasClass('blockSelected'))
						$("#"+key+" div").html($(this).data("data-text"));
					/* provoque un BUG a la recup de la couleur ???
					 * else if($(this).data("data-initColor")!="transparent")
						$(this).css("background-color",$(this).data("data-initColor"));*/
					
					$(this).removeClass('blockHovered');
				});
			}
		});
		
	}
};


