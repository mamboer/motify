/*!
 * Motify 1.0.0
 * Various creative css3 styles and effects for unobtrusive notifications on a website 
 * Inspired by http://tympanus.net/Development/NotificationStyles/index.html
 * @dependencies 
 *  1. classy.js <http://faso.me/classy>
 *  2. modernizr
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015, FASO.ME <http://www.faso.me>
 */
(function (root, factory) {
    if (typeof exports === 'object'){
        module.exports = factory(require('./classy'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['classy'], factory );
    } else {
        // Browser globals
        root.Motify = factory(root.classy);
    }
}(this, function (classy,mintpl) {

	var docElem = window.document.documentElement,
		support = { animations : Modernizr.cssanimations },
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
	
	/**
	 * extend obj function
	 */
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

    function getWrapper( options ){
        var id = options.elemPrefix+'wrapper',
            cls = prefixStr(['wrapper','wrapper-'+options.position], options.elemPrefix).join(' '),
            elem = document.getElementById(id);

        if (!elem){
            elem = document.createElement('div');
            elem.className = cls;
            elem.id = id;
            document.body.appendChild(elem);
        }
        return elem;
    }

    function prefixStr( strs,prefix){
        if( typeof(strs) === 'string' ){
            strs = [strs];    
        }
        for(var i =0; i < strs.length; i++){
            strs[i] = ( prefix || '' ) + strs[i];   
        }
        return strs;
    }

    /**
    * 简单的html模板解析方法
    * @public
    * @function
    * @example
    *   var str="<a href=/u/@{uid}>@{username}</a>",
    *       data={uid:1,username:'levin'};
    *   alert(evalTpl(str,data));
    *   //提示信息为："<a href=/u/1>levin</a>"
    * @param {string} str html模板，字段用%包含
    * @param {Object} data json数据
    * @param {Boolean} alternative old-fashion template style like %xxx%
    */
    function evalTpl (str, data,alternative) {
        var result;
        var patt = new RegExp(alternative?"%([a-zA-z0-9]+)%":"@{([a-zA-z0-9]+)}");
        while ((result = patt.exec(str)) !== null) {
            var v = data[result[1]] || '';
            str = str.replace(new RegExp(result[0], "g"), v);
        }
        return str;
    }

	/**
	 * Motify function
	 */
	function Motify( options ) {	
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

	/**
	 * Motify class
	 */
	Motify.prototype.options = {
		elemPrefix:'mt-',
		// the message
		message : 'yo!',
		// layout type: growl|attached|bar|other
		layout : 'growl',
		// effects for the specified layout:
		// for growl layout: scale|slide|genie|jelly
		// for attached layout: flip|bouncyflip
		// for other layout: boxspinner|cornerexpand|loadingcircle|thumbslider
		// ...
		effect : 'slide',
		// notice, warning, error, success
		// will add class ns-type-warning, ns-type-error or ns-type-success
		type : 'error',
		// if the user doesn´t close the notification then we remove it 
		// after the following time
		ttl : 6000,
        // right-top,left-top,fluid-top,right-bottom,left-bottom,fluid-bottom
        position:'right-top',
        bodyTpl:'<div class="@{elemPrefix}box-inner">@{message}</div><span class="@{elemPrefix}close"></span>',
		// callbacks
		onClose : function() { return false; },
		onOpen : function() { return false; }
	};

	/**
	 * init function
	 * initialize and cache some vars
	 */
	Motify.prototype._init = function() {
		this.wrapper = getWrapper(this.options);
        // create HTML structure
		this.ntf = document.createElement( 'div' );
		this.ntf.className = prefixStr(['box', this.options.layout, 'effect-' + this.options.effect, 'type-' + this.options.type, 'pos-' + this.options.position ], this.options.elemPrefix ).join(' ');
		this.ntf.innerHTML = evalTpl(this.options.bodyTpl,this.options);

        this.options.clClose = this.options.elemPrefix + 'close';
        this.options.clShow = this.options.elemPrefix + 'show';
        this.options.clHide = this.options.elemPrefix + 'hide';

		// append to body or the element specified in options.wrapper
        if(this.options.position.slice(-3) === 'top'){
            this.wrapper.appendChild( this.ntf );
        } else {
            this.wrapper.insertBefore( this.ntf, this.wrapper.firstChild );
        }
		// dismiss after [options.ttl]ms
		var self = this;
		
		if(this.options.ttl) { // checks to make sure ttl is not set to false in notification initialization
			this.dismissttl = setTimeout( function() {
				if( self.active ) {
					self.dismiss();
				}
			}, this.options.ttl );
		}

		// init events
		this._initEvents();
	};

	/**
	 * init events
	 */
	Motify.prototype._initEvents = function() {
		var self = this;
		// dismiss notification
		this.ntf.querySelector( '.'+this.options.clClose ).addEventListener( 'click', function() { self.dismiss(); } );
	};

	/**
	 * show the notification
	 */
	Motify.prototype.show = function() {
		this.active = true;
		classy.remove( this.ntf, this.options.clHide );
		classy.add( this.ntf, this.options.clShow );
		if (typeof this.options.onOpen === 'function')
			this.options.onOpen();
	};

	/**
	 * dismiss the notification
	 */
	Motify.prototype.dismiss = function() {
		var self = this;
		this.active = false;
		clearTimeout( this.dismissttl );
		classy.remove( this.ntf, this.options.clShow );
		setTimeout( function() {
			classy.add( self.ntf, self.options.clHide );
			
			// callback
			if (typeof self.options.onClose === 'function')
				self.options.onClose();
		}, 25 );

		// after animation ends remove ntf from the DOM
		var onEndAnimationFn = function( ev ) {
			if( support.animations ) {
				if( ev.target !== self.ntf ) return false;
				this.removeEventListener( animEndEventName, onEndAnimationFn );
			}
			self.wrapper.removeChild( this );
		};

		if( support.animations ) {
			this.ntf.addEventListener( animEndEventName, onEndAnimationFn );
		}
		else {
			onEndAnimationFn();
		}
	};

	return Motify;

}));
