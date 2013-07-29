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
	this.buildIds = [];
	this.data = data;
	this.currentlyOpen = null;
	this.back = null;
	this.showLog = true;
	/**
	 * build the HTML code dynamically 
	 * based on the json desicption file in our first use case organigramData
	 */
	this.render = function(json)
	{
		dir(json);
		var html = "";
		var showLog = false;
		$.each(json, function(key, val)
		{
			if(key != "data"){
				if(showLog)log("level1", key);
				//build first level doors
				if(key == "menu"){
					html += self.renderMenu(val);
					html += "<div class='clear'></div>";
				}
				else{
					html += "<div id='"+key+"' class='txt block topblock w49p '><div>"+val.content.toUpperCase()+"</div></div>";
					self.buildIds.push(key);
					self.clickIds[key] = val.system.events;
					if(val.open)
						html += self.renderChildrenRecursively(2,key,val);
				}
				
			}
		});
		return html;
	};
	this.renderChildrenRecursively = function(lvl,id,node)
	{
		var htmlLvl = "";
		var htmlLvlChildren = "";
		var showLog = true;
		if(node.open && node.system)
		{
			if(showLog)log( "level "+lvl,node );
			if(node.open.list)
			{ // content is a list
				if(showLog)log( "level "+lvl,node,"Children count = ", _.size(node.open.list));
				var classList = "hidden block"; 
				htmlLvl +="<div class='"+classList+"' id='"+id+"Child'><ul>";
				self.buildIds.push(id+"Child");
				var heightLii = 100/_.size(node.open.list);
				
				$.each(node.open.list, function(kii, vii)
				{
					if(showLog)log("level"+lvl ,kii,vii);
					//reference alias 
					id = kii ;
					if(vii.system && vii.system.events)
						self.clickIds[kii] = vii.system.events;
					var style = "style='height:"+heightLii+"%'";
					htmlLvl+="<li id='"+id+"' "+style+" class='txt txt2'><div>";
					label = (vii.content) ? vii.content.toUpperCase(): kii.toUpperCase() ;
					htmlLvl+=label;
					htmlLvl+="</div></li>";
					if(vii.open && vii.system)
						htmlLvlChildren += self.renderChildrenRecursively(lvl+1, id, vii);
				});
				htmlLvl += "</ul></div>"+htmlLvlChildren;
			}
			else
			{
				
				if(node.system && node.system.events)
					self.clickIds[id] = node.system.events;
				
				// content is a final html block
				var content = (node.open.content ) ? node.open.content : id ;
				if(showLog)log( "level "+lvl,node,"Leaf",node.system.id+"Child",content );
				htmlLvl += "<div class='hidden block' id='"+node.system.id+"Child'>"+content;
				self.buildIds.push(node.system.id+"Child");
				if(node.open.system.editable)
					htmlLvl += "<div class='edit'><a href='javascript:alert(\"Edit "+id+"_Leaf\")'>Edit</a></div>";
				htmlLvl += "</div>";
			}
		}
		if(htmlLvl)
			if(showLog)log("renderChildrenRecursively",id,htmlLvl);
		return htmlLvl;
	}
	this.renderMenu = function(node)
	{
		if(self.showLog)log("renderMenu");
		var html = "";
		if(node.open && node.system)
		{
			if(node.open.list){ 
				html +="<div class='' id='menuChild'><ul>";
				var width = 100/_.size(node.open.list);
				var style = "style='width:"+width+"%'";
				$.each(node.open.list, function(kii, vii)
				{
					id = kii ;
					if(vii.system && vii.system.events)
						self.clickIds[kii] = vii.system.events;
					html+="<li id='"+id+"' "+style+" class='clickable'><div "+style+">";
					label = (vii.content) ? vii.content.toUpperCase(): kii.toUpperCase() ;
					html+=label;
					html+="</div></li>";
				});
				html += "</ul></div>";
			}
		}
		return html;
	}
	/**
	 * elements to activate are gathered during html build process according to 
	 * Json description driven events
	 * - onhover
	 * - onclick
	 */
	this.activeElements = function()
	{
		//$('#workTypes').insertBefore('#door1');
		$.each(self.clickIds, function(key, events)
		{
			log("activeElements",key,"event",events);
			if(events.onclick)
			{
				//add pre-click actions such as :
				//set proper css class on element
				//add to click element breadcrumb
				var tmpClick = events.onclick;
				
				events.onclick = function(source)
				{
					if($("#"+key).is(":visible"))
					{//hack because on level three even hidden events are executed 
						log("events.onclick",source);
						self.clickIdsBreadCrumb.unshift(key);
						log("clickIdsBreadCrumb",self.clickIdsBreadCrumb);
						
						//continue on to execute the json description click code
						tmpClick(source);
						
						//manage genericaly selected css
						$(".blockSelected").removeClass('blockSelected');
						if(!$(this).hasClass('blockSelected') )
							$(this).addClass('blockSelected');
						else {
							$("#"+key+" div").html($(this).data("data-text"));
							
						}
					}
				};
				
				$("#"+key).click(events.onclick);
			}
			//BUG : marche pas qd bg color set in css
			if(events.onhover)
			{
				$("#"+key).mouseover(function()
				{
					//$(this).data("data-initColor",$(this).css('backgroundColor'));
					if($(this).hasClass('blockSelected')){
						$(this).data("data-text",$("#"+key+" div").html());
						//$(this).css("background-color","yellow");
						$("#"+key+" div").html("RETOUR");
					}
					$(this).addClass('blockHovered');
				});
				$("#"+key).mouseout(function()
				{
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


