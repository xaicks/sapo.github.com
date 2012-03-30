(function(window,document,undefined){var prefixes=['webkit','Moz','ms','O'],animations={},useCssAnimations;function createEl(tag,prop){var el=document.createElement(tag||'div'),n;for(n in prop)el[n]=prop[n];return el;}function ins(parent,child1,child2){if(child2&&!child2.parentNode)ins(parent,child2);parent.insertBefore(child1,child2||null);return parent;}var sheet=(function(){var el=createEl('style');ins(document.getElementsByTagName('head')[0],el);return el.sheet||el.styleSheet;})();function addAnimation(alpha,trail,i,lines){var name=['opacity',trail,~~(alpha*100),i,lines].join('-'),start=0.01+i/lines*100,z=Math.max(1-(1-alpha)/trail*(100-start),alpha),prefix=useCssAnimations.substring(0,useCssAnimations.indexOf('Animation')).toLowerCase(),pre=prefix&&'-'+prefix+'-'||'';if(!animations[name]){sheet.insertRule('@'+pre+'keyframes '+name+'{'+'0%{opacity:'+z+'}'+start+'%{opacity:'+alpha+'}'+(start+0.01)+'%{opacity:1}'+(start+trail)%100+'%{opacity:'+alpha+'}'+'100%{opacity:'+z+'}'+'}',0);animations[name]=1;}return name;}function vendor(el,prop){var s=el.style,pp,i;if(s[prop]!==undefined)return prop;prop=prop.charAt(0).toUpperCase()+prop.slice(1);for(i=0;i<prefixes.length;i++){pp=prefixes[i]+prop;if(s[pp]!==undefined)return pp;}}function css(el,prop){for(var n in prop)el.style[vendor(el,n)||n]=prop[n];return el;}function merge(obj){for(var i=1;i<arguments.length;i++){var def=arguments[i];for(var n in def)if(obj[n]===undefined)obj[n]=def[n];}return obj;}function pos(el){var o={x:el.offsetLeft,y:el.offsetTop};while((el=el.offsetParent)){o.x+=el.offsetLeft;o.y+=el.offsetTop;}return o;}var Spinner=function Spinner(o){if(!this.spin)return new Spinner(o);this.opts=merge(o||{},Spinner.defaults,defaults);},defaults=Spinner.defaults={lines:12,length:7,width:5,radius:10,color:'#000',speed:1,trail:100,opacity:1/4,fps:20},proto=Spinner.prototype={spin:function(target){this.stop();var self=this,el=self.el=css(createEl(),{position:'relative'}),ep,tp;if(target){tp=pos(ins(target,el,target.firstChild));ep=pos(el);css(el,{left:(target.offsetWidth>>1)-ep.x+tp.x+'px',top:(target.offsetHeight>>1)-ep.y+tp.y+'px'});}el.setAttribute('aria-role','progressbar');self.lines(el,self.opts);if(!useCssAnimations){var o=self.opts,i=0,fps=o.fps,f=fps/o.speed,ostep=(1-o.opacity)/(f*o.trail/100),astep=f/o.lines;(function anim(){i++;for(var s=o.lines;s;s--){var alpha=Math.max(1-(i+s*astep)%f*ostep,o.opacity);self.opacity(el,o.lines-s,alpha,o);}self.timeout=self.el&&setTimeout(anim,~~(1000/fps));})();}return self;},stop:function(){var el=this.el;if(el){clearTimeout(this.timeout);if(el.parentNode)el.parentNode.removeChild(el);this.el=undefined;}return this;}};proto.lines=function(el,o){var i=0,seg;function fill(color,shadow){return css(createEl(),{position:'absolute',width:(o.length+o.width)+'px',height:o.width+'px',background:color,boxShadow:shadow,transformOrigin:'left',transform:'rotate('+~~(360/o.lines*i)+'deg) translate('+o.radius+'px'+',0)',borderRadius:(o.width>>1)+'px'});}for(;i<o.lines;i++){seg=css(createEl(),{position:'absolute',top:1+~(o.width/2)+'px',transform:'translate3d(0,0,0)',opacity:o.opacity,animation:useCssAnimations&&addAnimation(o.opacity,o.trail,i,o.lines)+' '+1/o.speed+'s linear infinite'});if(o.shadow)ins(seg,css(fill('#000','0 0 4px '+'#000'),{top:2+'px'}));ins(el,ins(seg,fill(o.color,'0 0 1px rgba(0,0,0,.1)')));}return el;};proto.opacity=function(el,i,val){if(i<el.childNodes.length)el.childNodes[i].style.opacity=val;};(function(){var s=css(createEl('group'),{behavior:'url(#default#VML)'}),i;if(!vendor(s,'transform')&&s.adj){for(i=4;i--;)sheet.addRule(['group','roundrect','fill','stroke'][i],'behavior:url(#default#VML)');proto.lines=function(el,o){var r=o.length+o.width,s=2*r;function grp(){return css(createEl('group',{coordsize:s+' '+s,coordorigin:-r+' '+-r}),{width:s,height:s});}var g=grp(),margin=~(o.length+o.radius+o.width)+'px',i;function seg(i,dx,filter){ins(g,ins(css(grp(),{rotation:360/o.lines*i+'deg',left:~~dx}),ins(css(createEl('roundrect',{arcsize:1}),{width:r,height:o.width,left:o.radius,top:-o.width>>1,filter:filter}),createEl('fill',{color:o.color,opacity:o.opacity}),createEl('stroke',{opacity:0}))));}if(o.shadow)for(i=1;i<=o.lines;i++)seg(i,-2,'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');for(i=1;i<=o.lines;i++)seg(i);return ins(css(el,{margin:margin+' 0 0 '+margin,zoom:1}),g);};proto.opacity=function(el,i,val,o){var c=el.firstChild;o=o.shadow&&o.lines||0;if(c&&i+o<c.childNodes.length){c=c.childNodes[i+o];c=c&&c.firstChild;c=c&&c.firstChild;if(c)c.opacity=val;}};}else useCssAnimations=vendor(s,'animation');})();window.Spinner=Spinner;})(window,document);