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
	this.data = data;//holds the data source json content
	this.currentlyOpen = null;
	this.back = null;//html used for the flippant functionality
	this.showLog = true;
	
	this.clickIds = {};//during the render process we gather id to events to bind them post rendering
	this.clickIdsBreadCrumb = [];//whenever an id is click it is added into this array 
	this.activateIdsActions = {};//id to activate function relation 
	this.openIdsBreadCrumb = [];//whenever an id is open it is added to this array, and removed when closed
	this.buildIds = []; //list of all ids build during the rendering process
	this.idsTree = {}; //represents all the ids in a json form or tree like structure, representing parent child relations
	
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
					html += self.renderMenu("menuChild",val.open.list);
					html += "<div class='clear'></div>";
				}
				else{
					html += "<div id='"+key+"' class='txt block topblock w49p '><div>"+val.content.toUpperCase()+"</div></div>";
					self.buildIds.push(key);
					self.idsTree[key] = {};
					self.clickIds[key] = val.system.events;
					if(val.open)
						html += self.renderChildrenRecursively(2,key,val);
				}
				
			}
		});
		return html;
	};
	this.renderChildrenRecursively = function(lvl,parentid,node)
	{
		var htmlLvl = "";
		var htmlLvlChildren = "";
		var showLog = true;
		if(node.open && node.system)
		{
			if(showLog)log( "level "+lvl,node );
			if(node.open.list)
			{ // content is a list
				if(showLog)log( "level "+lvl,"parentid",parentid,node,"Children count = ", _.size(node.open.list));
				var classList = "hidden block"; 
				htmlLvl +="<div class='"+classList+"' id='"+parentid+"Child'><ul>";
				self.buildIds.push(parentid+"Child");
				if(!self.idsTree[parentid])
					self.idsTree[parentid]={}; 
				self.idsTree[parentid][parentid+"Child"] = [];
				var heightLii = 100/_.size(node.open.list);
				
				$.each(node.open.list, function(kii, vii)
				{
					if(showLog)log("level"+lvl ,kii,vii);
					//referenced node or node aliasing
					if(typeof vii == "string" && vii.indexOf("data.")==0)
					{
						id = parentid+"_"+kii;
						vii = eval("phOrganigram.data."+vii);
					} else
						id = kii;
					if(vii.system && vii.system.events)
						self.clickIds[id] = vii.system.events;
					self.idsTree[parentid][parentid+"Child"].push(id);
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
			else if(node.open.template && node.open.template.name != undefined)
			{
				//the content will be build dynamicaly using a template as base code 
				if(node.system && node.system.events)
					self.clickIds[id] = node.system.events;
				
				//get the template.html from file
				var content = (node.open.content ) ? node.open.content : id ;
				$.ajax(
				{
				    type: 'GET',
				    async: false,
				    url:  'templates/'+node.open.template.name+'.html',
				    success: function(data) 
				    {
				    	content = nano(data,node.open.template.data );
				    	if(node.open.template.data.headerLinks)
				    		content = self.renderMenu("headerMenu"+node.system.id,node.open.template.data.headerLinks)+content;
				    	if(node.open.template.data.footerLinks)
				    		content = content+self.renderMenu("footerMenu"+node.system.id,node.open.template.data.footerLinks);
				    }
				  });
				// content is a final html block
				if(showLog)log( "level "+lvl,node,"Leaf",node.system.id+"Child",content );
				htmlLvl += "<div class='hidden block' id='"+node.system.id+"Child'>"+content;
				self.buildIds.push(node.system.id+"Child");
				if(!self.idsTree[parentid])
					self.idsTree[parentid]={}; 
				self.idsTree[parentid][node.system.id+"Child"] = {};
				htmlLvl += "</div>";
			}
			else
			{
				
				if(node.system && node.system.events)
					self.clickIds[id] = node.system.events;
				
				// content is a final html block
				if(showLog)log( "level "+lvl,node,"Leaf",node.system.id+"Child",content );
				htmlLvl += "<div class='hidden block' id='"+node.system.id+"Child'>"+content;
				self.buildIds.push(node.system.id+"Child");
				if(!self.idsTree[parentid])
					self.idsTree[parentid]={}; 
				self.idsTree[parentid][node.system.id+"Child"] = {};
				if(node.open.system && node.open.system.editable)
					htmlLvl += "<div class='edit'><a href='javascript:alert(\"Edit "+id+"_Leaf\")'>Edit</a></div>";
				htmlLvl += "</div>";
			}
		}
		if(htmlLvl)
			if(showLog)log("renderChildrenRecursively",id,htmlLvl);
		return htmlLvl;
	}
	this.renderMenu = function(id,list)
	{
		//if(self.showLog)log("renderMenu",id,'count',_.size(list));
		var html ="<div class='' id='"+id+"'><ul>";
		var width = 100/_.size(list);
		var style = "style='width:"+width+"%'";
		$.each(list, function(kii, vii)
		{
			id = kii ;
			var url = "";
			if(vii.system && vii.system.events)
				self.clickIds[kii] = vii.system.events;
			else
				url = vii.url;
			html+="<li id='"+id+"' "+style+" class='clickable menuLi'><div "+style+">";
			label = (vii.content) ? vii.content.toUpperCase(): kii.toUpperCase() ;
			if(url!='')
				label = "<a href='"+url+"' target='_blank'>"+label+"</a>";
			html+=label;
			html+="</div></li>";
		});
		html += "</ul></div>";
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
						
						$.address.value(key);  
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
			//BUG : marche pas qd bg color set in css
			if(events.onActivate)
			{
				if(!self.activateIdsActions[key])
					self.activateIdsActions[key] = events.onActivate;
			}
		});
		
	}
};
/* Nano Templates (Tomasz Mazur, Jacek Becela) */

function nano(template, data) {
  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    var keys = key.split("."), v = data[keys.shift()];
    for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return (typeof v !== "undefined" && v !== null) ? v : "";
  });
}


