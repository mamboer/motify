/*!
 * {{name}} {{version}}
 * {{description}} 
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
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['classy'], factory );
    } else {
        // Browser globals
        root.Motify = factory(root.classy);
    }
}(this, function (classy) {

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

	/**
	 * Motify function
	 */
	function Motify( options ) {	
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

	/**
	 * Motify options
	 */
	Motify.prototype.options = {
		// element to which the notification will be appended
		// defaults to the document.body
		wrapper : document.body,
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
		// callbacks
		onClose : function() { return false; },
		onOpen : function() { return false; }
	};

	/**
	 * init function
	 * initialize and cache some vars
	 */
	Motify.prototype._init = function() {
		// create HTML structure
		this.ntf = document.createElement( 'div' );
		this.ntf.className = 'mt-box mt-' + this.options.layout + ' mt-effect-' + this.options.effect + ' mt-type-' + this.options.type;
		var strinner = '<div class="mt-box-inner">';
		strinner += this.options.message;
		strinner += '</div>';
		strinner += '<span class="mt-close"></span></div>';
		this.ntf.innerHTML = strinner;

		// append to body or the element specified in options.wrapper
		this.options.wrapper.insertBefore( this.ntf, this.options.wrapper.firstChild );

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
		this.ntf.querySelector( '.mt-close' ).addEventListener( 'click', function() { self.dismiss(); } );
	};

	/**
	 * show the notification
	 */
	Motify.prototype.show = function() {
		this.active = true;
		classy.remove( this.ntf, 'mt-hide' );
		classy.add( this.ntf, 'mt-show' );
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
		classy.remove( this.ntf, 'mt-show' );
		setTimeout( function() {
			classy.add( self.ntf, 'mt-hide' );
			
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
			self.options.wrapper.removeChild( this );
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
