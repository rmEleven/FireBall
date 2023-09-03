class GameMenu{constructor(t){console.log("GameMenu Created"),this.root=t,this.$menu=$('\n            <div class="game-menu">\n                <div class="game-menu-field">\n                    <div class="game-menu-field-item game-menu-field-item-single-mode">\n                        单人模式\n                    </div>\n                    <div class="game-menu-field-item game-menu-field-item-multi-mode">\n                        多人模式\n                    </div>\n                    <div class="game-menu-field-item game-menu-field-item-settings">\n                        设置\n                    </div>\n                </div>\n            </div>\n        '),this.hide(),this.root.$game.append(this.$menu),this.$single_mode=this.$menu.find(".game-menu-field-item-single-mode"),this.$multi_mode=this.$menu.find(".game-menu-field-item-multi-mode"),this.$settings=this.$menu.find(".game-menu-field-item-settings"),this.start()}start(){this.add_listening_events()}add_listening_events(){let t=this;this.$single_mode.click((function(){console.log("single-mode clicked"),t.hide(),t.root.playground.show()})),this.$multi_mode.click((function(){console.log("multi-mode clicked")})),this.$settings.click((function(){console.log("settings clicked")}))}show(){this.$menu.show()}hide(){this.$menu.hide()}}let last_timestamp,GAME_OBJECTS=[];class GameObject{constructor(){GAME_OBJECTS.push(this),this.has_called_start=!1,this.timedelta=0}start(){}update(){}on_destroy(){}destroy(){this.on_destroy();for(let t=0;t<GAME_OBJECTS.length;t++)if(GAME_OBJECTS[t]===this){GAME_OBJECTS.splice(t,1);break}}}let GAME_ANIMATION=function(t){for(let s=0;s<GAME_OBJECTS.length;s++){let i=GAME_OBJECTS[s];i.has_called_start?(i.timedelta=t-last_timestamp,i.update()):(i.start(),i.has_called_start=!0)}last_timestamp=t,requestAnimationFrame(GAME_ANIMATION)};requestAnimationFrame(GAME_ANIMATION);class GameMap extends GameObject{constructor(t){console.log("GameMap Created"),super(),this.playground=t,this.$canvas=$("<canvas>画布</canvas>"),this.ctx=this.$canvas[0].getContext("2d"),this.ctx.canvas.width=this.playground.width,this.ctx.canvas.height=this.playground.height,this.playground.$playground.append(this.$canvas),this.start()}start(){}update(){this.render()}render(){this.ctx.fillStyle="rgba(0,0,0,0.2)",this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)}}class Particle extends GameObject{constructor(t,s,i,e,h,a,n,l,o){super(),this.playground=t,this.ctx=this.playground.gameMap.ctx,this.x=s,this.y=i,this.radius=e,this.color=h,this.speed=a,this.vx=n,this.vy=l,this.move_length=o,this.friction=.9,this.eps=10}start(){}update(){if(this.speed<this.eps||this.move_length<this.eps)return this.destroy(),!1;{let t=Math.min(this.move_length,this.speed*this.timedelta/1e3);this.x+=this.vx*t,this.y+=this.vy*t,this.speed*=this.friction,this.move_length-=t}this.render()}render(){this.ctx.fillStyle=this.color,this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),this.ctx.fill()}}class Player extends GameObject{constructor(t,s,i,e,h,a,n){super(),this.playground=t,this.ctx=this.playground.gameMap.ctx,this.x=s,this.y=i,this.radius=e,this.color=h,this.speed=a,this.move_length=0,this.vx=0,this.vy=0,this.d_speed=0,this.d_vx=0,this.d_vy=0,this.friction=.9,this.cur_skill=null,this.is_me=n,this.eps=.1}start(){if(this.is_me)this.add_listening_events();else{let t=Math.random()*this.playground.width,s=Math.random()*this.playground.height;this.move_to(t,s)}}add_listening_events(){let t=this;this.playground.gameMap.$canvas.on("contextmenu",(function(){return!1})),this.playground.gameMap.$canvas.mousedown((function(s){const i=t.ctx.canvas.getBoundingClientRect();3===s.which?t.move_to(s.clientX-i.left,s.clientY-i.top):1===s.which&&("fireball"===t.cur_skill&&t.shoot_fireball(s.clientX-i.left,s.clientY-i.top),t.cur_skill=null)})),$(window).keydown((function(s){if(81===s.which)return t.cur_skill="fireball",!1}))}remove_listening_events(){this.playground.gameMap.$canvas.off("mousedown"),$(window).off("keydown")}get_dist(t,s,i,e){let h=t-i,a=s-e;return Math.sqrt(h*h+a*a)}move_to(t,s){this.move_length=this.get_dist(this.x,this.y,t,s);let i=Math.atan2(s-this.y,t-this.x);this.vx=Math.cos(i),this.vy=Math.sin(i)}shoot_fireball(t,s){let i=this.x,e=this.y,h=.01*this.playground.height,a=.5*this.playground.height,n=1*this.playground.height,l=Math.atan2(s-e,t-i),o=Math.cos(l),r=Math.sin(l),d=.01*this.playground.height;new FireBall(this.playground,this,i,e,h,"orange",a,n,o,r,d)}is_attacked(t,s){let i=10+Math.floor(10*Math.random());for(let t=0;t<i;t++){let t=this.x,s=this.y,i=this.radius*Math.random()*.2,e=this.color,h=5*this.speed,a=2*Math.PI*Math.random(),n=Math.cos(a),l=Math.sin(a),o=5*this.radius;new Particle(this.playground,t,s,i,e,h,n,l,o)}if(this.radius-=s,this.radius<this.eps)return this.is_me&&this.remove_listening_events(),this.destroy(),!1;this.d_speed=60*s,this.d_vx=Math.cos(t),this.d_vy=Math.sin(t),this.speed*=1.4}update(){if(this.d_speed>10){this.vx=this.vy=this.move_length=0;let t=this.d_speed*this.timedelta/1e3;this.x+=this.d_vx*t,this.y+=this.d_vy*t,this.d_speed*=this.friction}if(!this.is_me&&Math.random()<.005){let t=this;for(;t===this;){let s=Math.floor(Math.random()*this.playground.players.length);t=this.playground.players[s]}let s=t.x+t.speed*t.vx*this.timedelta/1e3*.3,i=t.y+t.speed*t.vy*this.timedelta/1e3*.3;this.shoot_fireball(s,i)}if(this.move_length<this.eps){if(this.move_length=0,this.vx=0,this.vy=0,!this.is_me){let t=Math.random()*this.playground.width,s=Math.random()*this.playground.height;this.move_to(t,s)}}else{let t=Math.min(this.move_length,this.speed*this.timedelta/1e3);this.x+=this.vx*t,this.y+=this.vy*t,this.move_length-=t}this.render()}render(){this.ctx.fillStyle=this.color,this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),this.ctx.fill()}on_deatroy(){for(let t=0;t<this.playground.players.length;t++)if(this.playground.players[t]===this){this.playground.players.splice(t,1);break}}}class FireBall extends GameObject{constructor(t,s,i,e,h,a,n,l,o,r,d){super(),this.playground=t,this.player=s,this.ctx=this.playground.gameMap.ctx,this.x=i,this.y=e,this.radius=h,this.color=a,this.speed=n,this.move_length=l,this.vx=o,this.vy=r,this.damage=d,this.eps=.1}start(){}get_dist(t,s,i,e){let h=t-i,a=s-e;return Math.sqrt(h*h+a*a)}is_collision(t){return this.get_dist(this.x,this.y,t.x,t.y)<this.radius+t.radius}attack(t){let s=Math.atan2(t.y-this.y,t.x-this.x);t.is_attacked(s,this.damage),this.destroy()}update(){if(this.move_length<this.eps)this.destroy();else{let t=Math.min(this.move_length,this.speed*this.timedelta/1e3);this.x+=this.vx*t,this.y+=this.vy*t,this.move_length-=t}for(let t=0;t<this.playground.players.length;t++){let s=this.playground.players[t];s!==this.player&&this.is_collision(s)&&this.attack(s)}this.render()}render(){this.ctx.fillStyle=this.color,this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),this.ctx.fill()}}class GamePlayground{constructor(t){console.log("GamePlayground Created"),this.root=t,this.$playground=$('\n            <div class="game-playground">\n            </div>\n        '),this.hide(),this.start()}start(){this.add_listening_events()}add_listening_events(){}show(){this.$playground.show(),this.root.$game.append(this.$playground),this.width=this.$playground.width(),this.height=this.$playground.height(),this.gameMap=new GameMap(this),this.players=[],this.players.push(new Player(this,this.width/2,this.height/2,.05*this.height,"rgb(83,131,236)",.15*this.height,!0));let t=["lightcoral","lightgray","lightgreen","lightsalmon","lightyellow"];for(let s=0;s<5;s++){let s=Math.random()*this.width,i=Math.random()*this.height,e=Math.floor(Math.random()*t.length);this.players.push(new Player(this,s,i,.05*this.height,t[e],.15*this.height,!1))}}hide(){this.$playground.hide()}}class Settings{constructor(t){console.log("Settings Created"),this.root=t,this.platform="WEB",this.root.AcwingOS&&(this.platform="ACAPP"),this.start()}start(){this.getinfo()}login(){}register(){}getinfo(){let t=this;$.ajax({url:"https://app5952.acapp.acwing.com.cn/settings/getinfo/",type:"GET",data:{platform:t.platform},success:function(s){console.log(s),"success"===s.result?(t.hide(),t.root.menu.show()):t.login()}})}show(){this.$settings.show()}hide(){this.$settings.hide()}}export class Game{constructor(t,s){console.log("Game Created"),this.id=t,this.$game=$("#"+t),this.AcwingOS=s,this.settings=new Settings(this),this.menu=new GameMenu(this),this.playground=new GamePlayground(this),this.start()}start(){}}
