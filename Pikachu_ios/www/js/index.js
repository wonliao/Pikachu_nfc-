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
	old_player:null,
	enemy_hp: 100,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // `load`, `deviceready`, `offline`, and `online`.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener("touchmove", function (e) { e.preventDefault(); return false; }, false);
    },
    // deviceready Event Handler
    //
    // The scope of `this` is the event. In order to call the `receivedEvent`
    // function, we must explicity call `app.receivedEvent(...);`
    onDeviceReady: function() {
		
		console.log( "onDeviceReady" );
        
		app.toggleClass("cls", "grv", "rdg", 500);
		
		app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);

		app.initNetwork();
	},
	initNetwork: function() {
		console.log("initNetwork");
		var wsUri = "ws://192.168.1.143:8000";		
		websocket = new WebSocket(wsUri);
		websocket.onopen = function(evt) { app.onOpen(evt) };
		websocket.onclose = function(evt) { app.onClose(evt) };
		websocket.onmessage = function(evt) { app.onMessage(evt) };
		websocket.onerror = function(evt) { app.onError(evt) };
	},
	onOpen: function(evt) { 
	
		console.log("CONNECTED");
		
		$('#pb1').progressBar(100);
		
		// for test
		/*
		app.showPlayer( "OPEN醬" );
		setTimeout( function() {
			app.showPlayer( "噴水龜" );
			setTimeout( function() {
				app.showPlayer( "OPEN醬" );
			}, 3000 );
		
		}, 3000 );
		*/
	},
	onClose: function(evt) { 
		console.log("DISCONNECTED"); 
	},
	onMessage: function(evt) { 
		
		console.log( "onMessage:" + evt.data );
		
		if( evt.data == "皮卡丘" || evt.data == "噴水龜" || evt.data == "OPEN醬") {
			app.showPlayer( evt.data );
		}
	},
	onError: function(evt) { 
		console.log( evt.data );
	},
	showPlayer: function( name ) {

		console.log( "showPlayer : " + name );

		var player = null;
		if( name == "皮卡丘" ) {
			player = $('#player_1');
			app.enemy_hp -= 20;
		} else if( name == "噴水龜" ) {
			player = $('#player_2');
			app.enemy_hp -= 10;
		} else if( name == "OPEN醬" ) {
			player = $('#player_3');
			app.enemy_hp = 100;
		}
		
		if( app.enemy_hp < 0 )	app.enemy_hp = 0;

		// 場上的角色
		if( app.old_player != null ) {

			// 場上的角色退場
			app.old_player.animate(
            	{ top: 800 }, 
            	"slow", 
				function(){
					
					app.old_player.hide();
					
					// 新角色登場
                	app.playerOnStage( player );
            	}
			);
		} else {

			// 隱藏 等待輸入角色卡片 文字
			$('#wait_text').hide();

			// 角色第一次登場
			app.playerOnStage( player );
		}
		
		app.old_player = player;
	},
	playerOnStage: function( player ) {

		player.css("top", '679px' ).show();
		player.animate(
			{
				top: 379
			}, 
			{
				duration: 'slow',
				easing: 'easeOutBounce',
				complete: app.enemy_damage
			}
		);
		
	},
	enemy_damage: function() {
	
		$('.skill').show();
		setTimeout( function() {
			$('.skill').hide();
		}, 2000 );	
	
		var second = 80;
		var move = 20;
		$('#enemy').animate( { left: 554+move }, second).animate( { left: 554-move }, second)
				   .animate( { left: 554+move }, second).animate( { left: 554-move }, second)
				   .animate( { left: 554+move }, second).animate( { left: 554-move }, second);
				
		setTimeout( function() {
			$('#pb1').progressBar( app.enemy_hp );
		}, 100 );	
	},
	toggleClass: function(id, c1, c2, ms)
	{
	  	var o=document.getElementById(id);
	  	o.className= (o.className == c1 ) ? c2 : c1;
	  	setTimeout('app.toggleClass("'+id+'","'+c1+'","'+c2+'",'+ms+')', ms);
	}

};

