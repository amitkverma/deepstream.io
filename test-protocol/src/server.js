var childProcess = require('child_process'),
	EventEmitter = require( 'events' ).EventEmitter,
	utils = require( 'util' );

var Server = function( port ) {
	this._process = childProcess.spawn( 'node', [ 'start.js', '--port=' + port ], { cwd: '..' } );
	this._process.stdout.on('data', this._onOutput.bind( this ) );

	this._process.on( 'error', console.log.bind( console, 'error' ) );
	this._process.on( 'close', console.log.bind( console, 'close' ) );
	this.isReady = false;
};

utils.inherits( Server, EventEmitter );

Server.prototype._onOutput = function( line ) {
	if( line.toString( 'utf-8' ).indexOf( 'DeepStream started' ) ) {
		this.isReady = true;
		this.emit( 'ready' );
	}
};

module.exports = Server;