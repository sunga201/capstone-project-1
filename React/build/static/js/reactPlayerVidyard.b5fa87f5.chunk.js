(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{280:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==i(e)&&"function"!==typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var u=r?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(n,o,u):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n(0)),o=n(92),u=n(127);function a(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function i(e){return(i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function f(e){return function(){var t,n=y(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var r=y(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return function(e,t){if(t&&("object"===i(t)||"function"===typeof t))return t;return s(e)}(this,t)}}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(y,r.Component);var t,n,a,i=f(y);function y(){var e;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,y);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return d(s(e=i.call.apply(i,[this].concat(n))),"callPlayer",o.callPlayer),d(s(e),"mute",function(){e.setVolume(0)}),d(s(e),"unmute",function(){null!==e.props.volume&&e.setVolume(e.props.volume)}),d(s(e),"ref",function(t){e.container=t}),e}return t=y,(n=[{key:"componentDidMount",value:function(){this.props.onMount&&this.props.onMount(this)}},{key:"load",value:function(e){var t=this,n=this.props,r=n.playing,a=n.config,i=n.onError,l=n.onDuration,p=e&&e.match(u.MATCH_URL_VIDYARD)[1];this.player&&this.stop(),(0,o.getSDK)("https://play.vidyard.com/embed/v4.js","VidyardV4","onVidyardAPI").then(function(e){t.container&&(e.api.addReadyListener(function(e,n){t.player=n,t.player.on("ready",t.props.onReady),t.player.on("play",t.props.onPlay),t.player.on("pause",t.props.onPause),t.player.on("seek",t.props.onSeek),t.player.on("playerComplete",t.props.onEnded)},p),e.api.renderPlayer(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(t){d(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({uuid:p,container:t.container,autoplay:r?1:0},a.options)),e.api.getPlayerMetadata(p).then(function(e){t.duration=e.length_in_seconds,l(e.length_in_seconds)}))},i)}},{key:"play",value:function(){this.callPlayer("play")}},{key:"pause",value:function(){this.callPlayer("pause")}},{key:"stop",value:function(){window.VidyardV4.api.destroyPlayer(this.player)}},{key:"seekTo",value:function(e){this.callPlayer("seek",e)}},{key:"setVolume",value:function(e){this.callPlayer("setVolume",e)}},{key:"setPlaybackRate",value:function(e){this.callPlayer("setPlaybackSpeed",e)}},{key:"getDuration",value:function(){return this.duration}},{key:"getCurrentTime",value:function(){return this.callPlayer("currentTime")}},{key:"getSecondsLoaded",value:function(){return null}},{key:"render",value:function(){var e={width:"100%",height:"100%",display:this.props.display};return r.default.createElement("div",{style:e},r.default.createElement("div",{ref:this.ref}))}}])&&l(t.prototype,n),a&&l(t,a),y}();t.default=b,d(b,"displayName","Vidyard")}}]);
//# sourceMappingURL=reactPlayerVidyard.b5fa87f5.chunk.js.map