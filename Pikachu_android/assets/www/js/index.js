/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
var app = {

    // Application Constructor
    initialize: function() {

		//console.log( "won test ==> initialize" );
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {

		//console.log( "won test ==> bindEvents" );
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("touchmove", function (e) { e.preventDefault(); return false; }, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {

		//console.log( "won test ==> onDeviceReady" );
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        //console.log( "won test ==> Received Event: " + id);
		app.initNetwork();
	},
	initNetwork: function() {

		//console.log( "won test ==> initNetwork");

		var wsUri = "ws://192.168.1.143:8000";
		websocket = new WebSocket(wsUri);
		websocket.onopen = function(evt) { app.onOpen(evt) };
		websocket.onclose = function(evt) { app.onClose(evt) };
		websocket.onmessage = function(evt) { app.onMessage(evt) };
		
		$('body').css( "background-color", "#FF0" );
	},
	onOpen: function(evt) { 

		console.log( "won test ==> CONNECTED");
		
		$('body').css( "background-color", "#F00" );
		$('#loading_div').html("連線成功");
		setTimeout( function() {
				$('body').css( "background-color", "#FFF" );
				$('#loading_div').hide();
		}, 2000);

		nfc.addTagDiscoveredListener( this.nfcReader );
	},
	onClose: function(evt) { 

		console.log( "won test ==> DISCONNECTED"); 
	},
	onMessage: function(evt) { 
		
		console.log( "won test ==> onMessage:" + evt.data );
	},
	nfcReader: function(nfcEvent) {

		console.log("won test => " + JSON.stringify(nfcEvent.tag));

		var tag = nfcEvent.tag;
		if( tag.id == "4,-56,-87,-47,-32,37,-128" ) {
	
			$('#player_name').html("皮卡丘");
			$('body').css( "background-color", "#090" );

			setTimeout( function() {
				$('#player_name').html("請輸入角色卡片");
			}, 2000);
			
			setTimeout( function() {
				$('body').css( "background-color", "#FFF" );
			}, 1000);
			
			app.SendTag("皮卡丘");
		} else if( tag.id == "4,23,-75,17,-59,2,-128" ) {
			
			$('#player_name').html("噴水龜");
			$('body').css( "background-color", "#090" );

			setTimeout( function() {
				$('#player_name').html("請輸入角色卡片");
			}, 2000);
			
			setTimeout( function() {
				$('body').css( "background-color", "#FFF" );
			}, 1000);

			app.SendTag("噴水龜");
		} else if( tag.id == "-76,-113,34,43" ) {
			
			$('#player_name').html("OPEN醬");
			$('body').css( "background-color", "#090" );

			setTimeout( function() {
				$('#player_name').html("請輸入角色卡片");
			}, 2000);
			
			setTimeout( function() {
				$('body').css( "background-color", "#FFF" );
			}, 1000);

			app.SendTag("OPEN醬");
		}	
	},
	SendTag: function( tag ) {
		
		console.log( "won test => " + tag );

		websocket.send( tag );
	}
};

