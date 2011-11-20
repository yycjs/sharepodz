(function(){var directionsService=new google.maps.DirectionsService();function GVMap(elements,params){this.el=elements
this.params={draggable:false,icon:null}
this.updateParams(params)}
GVMap.prototype.updateParams=function(params){for(key in params){if(undefined!=this.params[key]){this.params[key]=params[key]}}}
GVMap.prototype.auto=function(){if(this.isCompatible()){for(var i=0;i<this.el.length;i++){var obj=this.el[i]
var jObj=jQuery(obj)
if(!this.isLatLng(jObj)){if(!this.isQuery(jObj)){if(!this.isRoute(jObj)){this.query(GVMap.option.query,obj)}}}}}}
GVMap.prototype.init=function(obj,gparams){var jObj=jQuery(obj)
var type=this.getMapType(jObj)
var zoom=this.getZoomLevel(jObj)
var control=this.getControl(jObj)
if("undefined"==typeof(gparams)){gparams={center:new google.maps.LatLng(-34.397,150.644)}}
gparams.zoom=zoom
gparams.mapTypeId=type
obj.params={icon:this.getIcon(jObj),draggable:this.params.draggable}
obj.geocoder=new google.maps.Geocoder()
obj.directions=new google.maps.DirectionsRenderer()
obj.map=new google.maps.Map(obj,gparams)
obj.directions.setMap(obj.map)}
GVMap.prototype.getIcon=function(){return null}
GVMap.prototype.isLatLng=function(el){if(el.attr('data-latitude')!=null&&el.attr('data-longitude')!=null){this.latLng(el.attr('data-latitude'),el.attr('data-longitude'),el[0])
return true}
return false}
GVMap.prototype.latLng=function(latitude,longitude,obj){obj=obj||this.el[0]
this.init(obj,{center:new google.maps.LatLng(Number(latitude),Number(longitude))})}
GVMap.prototype.isQuery=function(el){if(el.attr('data-query')!=null){this.query(el.attr('data-query'),el[0])
return true}
return false}
GVMap.prototype.query=function(query,obj){obj=obj||this.el[0]
this.init(obj)
var zoom=this.getZoomLevel(jQuery(obj))
var gmap=this
obj.geocoder.geocode({address:query},function(results,status){if(status==google.maps.GeocoderStatus.OK){obj.map.setCenter(results[0].geometry.location)
var marker_opts={map:obj.map,position:results[0].geometry.location,clickable:true}
if(gmap.params.icon!=null){marker_opts.icon=gmap.params.icon}
if(gmap.params.draggable){marker_opts.draggable=gmap.params.draggable}
var marker=new google.maps.Marker(marker_opts)
google.maps.event.addListener(marker,'click',function(){gmap.onclick(obj,marker)})
if(gmap.params.draggable){google.maps.event.addListener(marker,"dragstart",function(){if("undefined"!=typeof(obj.map.infowindow)){obj.map.infowindow.close()}})
google.maps.event.addListener(marker,"dragend",function(){gmap.ondrop(obj,marker)})}}else{alert(GVMap.messages.addressNotFound+': '+query)
return}})
return this}
GVMap.prototype.isRoute=function(el){if(el.attr('data-from')!=null&&el.attr('data-to')!=null){this.route(el.attr('data-from'),el.attr('data-to'),el[0])
return true}
return false}
GVMap.prototype.route=function(from,to,obj){obj=obj||this.el[0]
this.init(obj)
var request={origin:from,destination:to,travelMode:GVMap.option.travelMode,unitSystem:GVMap.option.unitSystem}
if(jQuery(obj).attr('data-panel')!=null){obj.directions.setPanel(jQuery("#"+jQuery(obj).attr('data-panel'))[0])}
directionsService.route(request,function(result,status){if(status==google.maps.DirectionsStatus.OK){obj.directions.setDirections(result);}else{alert(GVMap.messages.addressNotFound)}})}
GVMap.prototype.getMapType=function(el){var type=el.attr('data-type')||GVMap.option.type
switch(type){case'normal':return google.maps.MapTypeId.ROADMAP;case'satellite':return google.maps.MapTypeId.SATELLITE;case'hybrid':return google.maps.MapTypeId.HYBRID;default:return google.maps.MapTypeId.ROADMAP;}}
GVMap.prototype.getZoomLevel=function(el){return Number(el.attr('data-zoom')||GVMap.option.zoom)}
GVMap.prototype.getControl=function(el){var control=el.attr('data-control')||GVMap.option.control
switch(control){case'small':return google.maps.NavigationControlStyle.SMALL;case'large':return google.maps.NavigationControlStyle.DEFAULT;default:return google.maps.NavigationControlStyle.DEFAULT;}}
GVMap.prototype.isCompatible=function(){return true}
GVMap.prototype.getPlaceHolder=function(obj,mark){var placeholder=jQuery(obj).attr('data-placeholder')
if(null==placeholder){if(null!=jQuery(obj).attr('data-query')){placeholder=jQuery(obj).attr('data-query')}}
return placeholder}
GVMap.prototype.onclick=function(obj,mark){var placeholder=this.getPlaceHolder(obj,mark)
if(null==placeholder){placeholder=GVMap.messages.emptyBallon}
if("undefined"==typeof(obj.map.infowindow)){var infowindow=new google.maps.InfoWindow({content:placeholder})
obj.map.infowindow=infowindow}
obj.map.infowindow.setContent(placeholder)
obj.map.infowindow.open(obj.map,mark)}
GVMap.prototype.ondrop=function(obj,mark){var placeholder=this.getPlaceHolder(obj,mark)
if(null==placeholder){placeholder=GVMap.messages.emptyBallon}
if("undefined"!=obj.map.infowindow){var infowindow=new google.maps.InfoWindow({content:placeholder})
obj.map.infowindow=infowindow}
obj.map.infowindow.open(obj.map,mark)}
GVMap.prototype.center=function(query,obj){var callback=function(gvmap){}
if("function"==typeof(obj)){callback=obj
obj=null}
obj=obj||this.el[0]
this.init(obj)
var zoom=this.getZoomLevel(jQuery(obj))
var gmap=this
obj.geocoder.geocode({address:query},function(results,status){if(status==google.maps.GeocoderStatus.OK){obj.map.setCenter(results[0].geometry.location)
callback(gmap)}else{alert(GVMap.messages.addressNotFound+': '+query)
return}})
return this}
GVMap.prototype.links=function(selector){onEvent='click'
var gmap=this
var element=this.el[0]
var map=element.map
var geocoder=element.geocoder
var params=this.params
if(window.location.hash!=""){jQuery('.gvmap-selected').removeClass('gvmap-selected')
jQuery(selector+'[href$='+window.location.hash+']').addClass('gvmap-selected')}
jQuery(selector).bind(onEvent,function(e){jQuery('.gvmap-selected').removeClass('gvmap-selected')
jQuery(this).addClass('gvmap-selected')
var point=this.mark.getPosition()
map.setCenter(point)
gmap.onclick(this,this.mark)})
jQuery(selector).each(function(index,obj){var query=jQuery(obj).attr('data-query')
geocoder.geocode({address:query},function(results,status){if(status==google.maps.GeocoderStatus.OK){var marker_opts={map:map,position:results[0].geometry.location,clickable:true}
if(gmap.params.icon!=null){marker_opts.icon=gmap.params.icon}
if(gmap.params.draggable){marker_opts.draggable=gmap.params.draggable}
var marker=new google.maps.Marker(marker_opts)
google.maps.event.addListener(marker,'click',function(){jQuery('.gvmap-selected').removeClass('gvmap-selected')
jQuery(marker.obj).addClass('gvmap-selected')
gmap.onclick(obj,marker)})
marker.obj=obj
obj.mark=marker
obj.map=map
if(jQuery(obj).hasClass('gvmap-selected')){jQuery(obj)[onEvent]()}}else{alert(GVMap.messages.addressNotFound+': '+query)
return}})})}
GVMap.option={zoom:15,type:'normal',control:'small',query:'São Paulo - Brasil',travelMode:google.maps.DirectionsTravelMode.DRIVING,unitSystem:google.maps.DirectionsUnitSystem.METRIC}
GVMap.messages={incompatible:'Seu navegador não é compatível com o Google Maps',addressNotFound:'Endereço não encontrado',fillInAllFields:'Preencha todos os campos',emptyBallon:'Nenhuma mensagem para este balão'}
if(undefined!=jQuery){jQuery.fn.gvmap=function(params){return new GVMap(this,params)}}})()