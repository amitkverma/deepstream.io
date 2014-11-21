var eio = require( 'engine.io-client' ),
	events = require( 'events' ),
	utils = require( 'util' );

var Client = function( port ) {
	this.isReady = false;
	this.lastMessage = null;
	
	this._connection =  eio( 'ws://localhost:' + port );
	this._connection.on( 'open', this._onOpen.bind( this ) );
	this._connection.on( 'message', this._onMessage.bind( this ) );
};

utils.inherits( Client, events.EventEmitter );

Client.prototype.reset = function() {
	this.lastMessage = null;	
};

Client.prototype.send = function( msg ) {
	this._connection.send( msg );	
};

Client.prototype._onOpen = function() {
	this.isReady = true;
	this.emit( 'ready' );
};

Client.prototype._onMessage = function( msg ) {
	console.log( msg );
	this.lastMessage = msg;
	this.emit( 'message', msg );
};

module.exports = Client;