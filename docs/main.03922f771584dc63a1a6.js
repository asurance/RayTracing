!function(t){var e={};function o(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(r,i,function(e){return t[e]}.bind(null,i));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=3)}([function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o(1),i=function(){function t(t,e,o){void 0===t&&(t=0),void 0===e&&(e=0),void 0===o&&(o=0),this.x=t,this.y=e,this.z=o}return t.prototype.reset=function(){return this.x=this.y=this.z=0,this},t.prototype.set=function(t,e,o){return this.x=t,this.y=e,this.z=o,this},t.prototype.clone=function(e){return void 0===e&&(e=t.Pool.create()),e.x=this.x,e.y=this.y,e.z=this.z,e},t.prototype.length=function(){return Math.hypot(this.x,this.y,this.z)},t.prototype.sqauredLength=function(){return this.dot(this)},t.prototype.normalize=function(e){void 0===e&&(e=t.Pool.create());var o=this.length();return o>0&&this.multiScale(1/o,e),e},t.prototype.add=function(e,o){return void 0===o&&(o=t.Pool.create()),o.x=this.x+e.x,o.y=this.y+e.y,o.z=this.z+e.z,o},t.prototype.multiScale=function(e,o){return void 0===o&&(o=t.Pool.create()),o.x=this.x*e,o.y=this.y*e,o.z=this.z*e,o},t.prototype.multiVec3=function(e,o){return void 0===o&&(o=t.Pool.create()),o.x=this.x*e.x,o.y=this.y*e.y,o.z=this.z*e.z,o},t.prototype.reciprocal=function(e){return void 0===e&&(e=t.Pool.create()),e.x=1/e.x,e.y=1/e.y,e.z=1/e.z,e},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y+this.z*t.z},t.prototype.cross=function(e,o){void 0===o&&(o=t.Pool.create());var r=this.y*e.z-this.z*e.y,i=this.z*e.x-this.x*e.z,n=this.x*e.y-this.y*e.x;return o.x=r,o.y=i,o.z=n,o},t.prototype.reflect=function(e,o){return void 0===o&&(o=t.Pool.create()),o=this.add(e.multiScale(-2*this.dot(e),o),o)},t.prototype.toString=function(){return"("+this.x+","+this.y+","+this.z+")"},t.Pool=new r.RecyclablePool(t,"Vector3"),t}();e.Vector3=i},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){void 0===e&&(e=""),this.pool=[],this.tidyPool=[],this.tidyLayer=[],this.count=0,this.logCount="",this.template=t,this.logCount=e}return t.prototype.create=function(){var t=this.pool.pop();return t?t.reset():(t=new this.template,this.logCount&&(this.count++,console.log(this.logCount+":"+this.count))),this.tidyLayer.length>0&&this.tidyPool.push(t),t},t.prototype.reUse=function(t){this.pool.push(t)},t.prototype.tidy=function(t,e){var o;void 0===e&&(e=this.create()),this.tidyLayer.push(this.tidyPool.length),e=t().clone(e);var r=this.tidyLayer.pop();return(o=this.pool).push.apply(o,this.tidyPool.splice(r)),this.tidyPool.length=0,e},t}();e.RecyclablePool=r},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o(0),i=o(1),n=function(){function t(t,e,o){void 0===t&&(t=r.Vector3.Pool.create()),void 0===e&&(e=r.Vector3.Pool.create()),void 0===o&&(o=0),this.depth=0,this.origin=t,this.direction=e,this.depth=o}return t.prototype.set=function(t,e,o){return void 0===o&&(o=0),this.origin=t,this.direction=e,this.depth=o,this},t.prototype.reset=function(){return this.origin.reset(),this.direction.reset(),this},t.prototype.clone=function(e){return void 0===e&&(e=t.Pool.create()),e.origin=this.origin.clone(e.origin),e.direction=this.direction.clone(e.direction),e},t.prototype.getPointAtT=function(t,e){var o=this;return void 0===e&&(e=r.Vector3.Pool.create()),r.Vector3.Pool.tidy((function(){return o.origin.add(o.direction.multiScale(t))}),e)},t.Pool=new i.RecyclablePool(t,"Ray"),t}();e.Ray=n},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o(4),i=o(6),n=o(0),c=o(7),s=o(8),u=o(9),a=o(10),l=document.createElement("canvas");l.width=a.WIDTH,l.height=a.HEIGHT,document.body.appendChild(l);var h=l.getContext("2d"),d=Math.cos(Math.PI/4),f=new c.World([new s.RTObject(new i.Sphere(n.Vector3.Pool.create().set(d,0,-1),d),new u.Reflect),new s.RTObject(new i.Sphere(n.Vector3.Pool.create().set(-d,0,-1),d),new u.Reflect)]),p=new r.Camera(n.Vector3.Pool.create().set(0,0,0),n.Vector3.Pool.create().set(0,0,-1),n.Vector3.Pool.create().set(0,1,0),90,a.WIDTH,a.HEIGHT);console.log("first render"),p.render(f),h.putImageData(p.imageData,0,0)},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o(0),i=o(2),n=o(5),c=function(){function t(t,e,o,i,n,c){var s=this;this.origin=t,this.width=n,this.height=c,this.imageData=new ImageData(n,c);var u=i*Math.PI/180,a=Math.tan(u/2),l=n/c*a,h=r.Vector3.Pool.tidy((function(){return t.add(e.multiScale(-1)).normalize()})),d=r.Vector3.Pool.tidy((function(){return o.cross(h).normalize()})),f=h.cross(d);this.lowerLeftCorner=r.Vector3.Pool.tidy((function(){return s.origin.add(d.multiScale(l).add(f.multiScale(a)).add(h).multiScale(-1))})),this.horizontal=d.multiScale(2*l),this.vertical=f.multiScale(2*a)}return t.prototype.render=function(t){var e=this,o={t:0,position:r.Vector3.Pool.create(),normal:r.Vector3.Pool.create()},c=i.Ray.Pool.create();c.origin=this.origin.clone(c.origin);for(var s=function(s){for(var a=function(a){r.Vector3.Pool.reUse(c.direction),c.direction=r.Vector3.Pool.tidy((function(){return e.lowerLeftCorner.add(e.horizontal.multiScale(s/(e.width-1)).add(e.vertical.multiScale(1-a/(e.height-1))))})),c.depth=0;for(var l=t.hitTest(c,o);l instanceof i.Ray;){if(l.depth>50){i.Ray.Pool.reUse(l),l=r.Vector3.Pool.create().set(0,0,0);break}var h=t.hitTest(l,o);i.Ray.Pool.reUse(l),l=h}n.render2Image(u.imageData,s,a,l),r.Vector3.Pool.reUse(l)},l=0;l<u.height;l++)a(l)},u=this,a=0;a<this.width;a++)s(a);i.Ray.Pool.reUse(c),r.Vector3.Pool.reUse(o.position),r.Vector3.Pool.reUse(o.normal)},t}();e.Camera=c},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.render2Image=function(t,e,o,r){var i=o*t.width+e<<2;t.data[i]=Math.floor(255.99*r.x),t.data[i+1]=Math.floor(255.99*r.y),t.data[i+2]=Math.floor(255.99*r.z),t.data[i+3]=255}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o(0),i=function(){function t(t,e){this.center=t.clone(),this.radius=e}return t.prototype.hitTest=function(t,e,o,i){var n=this,c=r.Vector3.Pool.tidy((function(){return t.origin.add(n.center.multiScale(-1))})),s=t.direction.sqauredLength(),u=c.dot(t.direction),a=c.sqauredLength()-this.radius*this.radius;if(r.Vector3.Pool.reUse(c),u*u-s*a){var l=Math.sqrt(u*u-s*a),h=(-u-l)/s;if(h<o&&h>e)return i.t=h,i.position=t.getPointAtT(h,i.position),i.normal=r.Vector3.Pool.tidy((function(){return i.position.add(n.center.multiScale(-1)).multiScale(1/n.radius)}),i.normal),!0;if((h=(-u+l)/s)<o&&h>e)return i.t=h,i.position=t.getPointAtT(h,i.position),i.normal=r.Vector3.Pool.tidy((function(){return i.position.add(n.center.multiScale(-1)).multiScale(1/n.radius)}),i.normal),!0}return!1},t}();e.Sphere=i},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o(0),i=function(){function t(t){this.objs=t}return t.prototype.hitTest=function(t,e){var o=null,i=1/0;return this.objs.forEach((function(r,n){r.shape.hitTest(t,1e-10,i,e)&&(o=n,i=e.t)})),null!==o?this.objs[o].mat.scatter(t,e):r.Vector3.Pool.create().set((t.direction.y+2)/3,(t.direction.y+1)/2,(t.direction.y+3)/4)},t}();e.World=i},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t,e){this.shape=t,this.mat=e};e.RTObject=r},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=o(2),i=o(0),n=function(){function t(){}return t.prototype.scatter=function(t,e){if(t.direction.dot(e.normal)>=0)return i.Vector3.Pool.create().set(0,0,0);var o=r.Ray.Pool.create();return o.set(e.position.clone(o.origin),i.Vector3.Pool.tidy((function(){return t.direction.normalize().reflect(e.normal)}),o.direction),t.depth+1),o},t}();e.Reflect=n},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.WIDTH=1024,e.HEIGHT=768}]);