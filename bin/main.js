const { Routes } = require('discord-api-types/v9');
;(function ($global) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = "EReg";
EReg.escape = function(s) {
	return s.replace(EReg.escapeRe,"\\$&");
};
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,matchedLeft: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return HxOverrides.substr(this.r.s,0,this.r.m.index);
	}
	,matchedRight: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		var sz = this.r.m.index + this.r.m[0].length;
		return HxOverrides.substr(this.r.s,sz,this.r.s.length - sz);
	}
	,matchedPos: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			var b = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b;
		}
	}
	,split: function(s) {
		return s.replace(this.r,"#__delim__#").split("#__delim__#");
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
	,__class__: EReg
};
var EnumValue = {};
EnumValue.match = function(this1,pattern) {
	return false;
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = "HxOverrides";
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10 ? "0" + m : "" + m) + "-" + (d < 10 ? "0" + d : "" + d) + " " + (h < 10 ? "0" + h : "" + h) + ":" + (mi < 10 ? "0" + mi : "" + mi) + ":" + (s < 10 ? "0" + s : "" + s);
};
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d["setTime"](0);
		d["setUTCHours"](k[0]);
		d["setUTCMinutes"](k[1]);
		d["setUTCSeconds"](k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw haxe_Exception.thrown("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) {
			i = 0;
		}
	}
	while(i < len) {
		if(((a[i]) === obj)) {
			return i;
		}
		++i;
	}
	return -1;
};
HxOverrides.lastIndexOf = function(a,obj,i) {
	var len = a.length;
	if(i >= len) {
		i = len - 1;
	} else if(i < 0) {
		i += len;
	}
	while(i >= 0) {
		if(((a[i]) === obj)) {
			return i;
		}
		--i;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
HxOverrides.keyValueIter = function(a) {
	return new haxe_iterators_ArrayKeyValueIterator(a);
};
HxOverrides.now = function() {
	return Date.now();
};
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
$hxClasses["IntIterator"] = IntIterator;
IntIterator.__name__ = "IntIterator";
IntIterator.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIterator
};
var Main = function() { };
$hxClasses["Main"] = Main;
Main.__name__ = "Main";
Main.__properties__ = {get_name:"get_name"};
Main.config = null;
Main.universe = null;
Main.start = function() {
	var vec = new Array(1);
	vec[0] = new ecs_Phase(true,"main",new Array(4),new Array(4));
	var entities = new ecs_core_EntityManager(1000);
	var vec1 = new Array(2);
	vec1[0] = new ecs_Components(2);
	vec1[1] = new ecs_Components(2);
	var components = new ecs_core_ComponentManager(entities,vec1);
	var resources = new ecs_core_ResourceManager([0],new Array(0));
	var vec1 = new Array(1);
	var this1 = [0];
	var _g = this1.length;
	while(_g < 1) this1[_g++] = 0;
	var cmpBits = this1;
	bits_Bits.set(cmpBits,1);
	bits_Bits.set(cmpBits,0);
	vec1[0] = new ecs_Family(0,cmpBits,[0],1000);
	var u = new ecs_Universe(entities,components,resources,new ecs_core_FamilyManager(components,resources,vec1),vec);
	var phase = vec[0];
	var s = new systems_commands_Hi(u);
	phase.systems[0] = s;
	phase.enabledSystems[0] = true;
	s.onEnabled();
	var s = new systems_commands_Boop(u);
	phase.systems[1] = s;
	phase.enabledSystems[1] = true;
	s.onEnabled();
	var s = new systems_commands_Test(u);
	phase.systems[2] = s;
	phase.enabledSystems[2] = true;
	s.onEnabled();
	var s = new systems_commands_ServerLink(u);
	phase.systems[3] = s;
	phase.enabledSystems[3] = true;
	s.onEnabled();
	var _g = 0;
	var _g1 = u.families.number;
	while(_g < _g1) u.families.tryActivate(_g++);
	Main.universe = u;
	var client = new discord_$js_Client({ intents : [1,512]});
	client.once("ready",function() {
		var $l=arguments.length;
		var _ = new Array($l>0?$l-0:0);
		for(var $i=0;$i<$l;++$i){_[$i-0]=arguments[$i];}
		haxe_Log.trace("Ready!",{ fileName : "src/Main.hx", lineNumber : 46, className : "Main", methodName : "start"});
		Main.connected = true;
	});
	client.on("interactionCreate",function(interaction) {
		if(!interaction.isCommand()) {
			return;
		}
		var command = { name : interaction.commandName, content : null};
		var enum_id = command.name.charAt(0).toUpperCase() + command.name.substring(1);
		var _g = 0;
		var _g1 = Main.config.commands;
		while(_g < _g1.length) {
			var value = _g1[_g];
			++_g;
			if(value.name != command.name) {
				continue;
			}
			if(value.params == null) {
				command.content = Type.createEnum(components_CommandOptions,enum_id);
				break;
			} else {
				var params = [];
				var _g2 = 0;
				var _g3 = value.params;
				while(_g2 < _g3.length) {
					var param = _g3[_g2];
					++_g2;
					switch(param.type) {
					case "bool":
						params.push(interaction.options.getBoolean(param.name));
						break;
					case "channel":
						params.push(interaction.options.getChannel(param.name));
						break;
					case "mention":
						params.push(interaction.options.getMentionable(param.name));
						break;
					case "number":
						params.push(interaction.options.getNumber(param.name));
						break;
					case "role":
						params.push(interaction.options.getRole(param.name));
						break;
					case "string":
						params.push(interaction.options.getString(param.name));
						break;
					case "user":
						params.push(interaction.options.getUser(param.name));
						break;
					default:
					}
				}
				command.content = Type.createEnum(components_CommandOptions,enum_id,params);
				break;
			}
		}
		var _ecsTmpEntity = Main.universe.createEntity();
		Main.universe.components.set(_ecsTmpEntity,0,command);
		Main.universe.components.set(_ecsTmpEntity,1,interaction);
		var ecsEntCompFlags = Main.universe.components.flags[ecs_Entity.id(_ecsTmpEntity)];
		var ecsTmpFamily = Main.universe.families.get(0);
		if(bits_Bits.areSet(ecsEntCompFlags,ecsTmpFamily.componentsMask)) {
			ecsTmpFamily.add(_ecsTmpEntity);
		}
	});
	client.login(Main.config.discord_token);
	new haxe_Timer(100).run = function() {
		Main.universe.update(1);
	};
};
Main.main = function() {
	try {
		Main.config = JSON.parse(js_node_Fs.readFileSync("./config.json",{ encoding : "utf8"}));
	} catch( _g ) {
		var _g1 = haxe_Exception.caught(_g);
		haxe_Log.trace(_g1.get_message(),{ fileName : "src/Main.hx", lineNumber : 105, className : "Main", methodName : "main"});
	}
	if(Main.config == null || Main.config.discord_token == "TOKEN_HERE") {
		throw haxe_Exception.thrown("Enter your discord auth token.");
	}
	var commands = Main.parseCommands();
	new discordjs_rest_REST({ version : "9"}).setToken(Main.config.discord_token).put(Routes.applicationGuildCommands(Main.config.client_id,Main.config.server_id),{ body : commands}).then(function(_) {
		haxe_Log.trace("Successfully registered application commands.",{ fileName : "src/Main.hx", lineNumber : 116, className : "Main", methodName : "main"});
	},function(err) {
		haxe_Log.trace(err,{ fileName : "src/Main.hx", lineNumber : 116, className : "Main", methodName : "main"});
	});
	Main.start();
};
Main.parseCommands = function() {
	var command_defs = Main.config.commands;
	if(command_defs == null || command_defs.length == 0) {
		throw haxe_Exception.thrown("No commands configured in the config.json file.");
	}
	var commands = [];
	var _g = 0;
	while(_g < command_defs.length) {
		var command = command_defs[_g];
		++_g;
		var main_command = new discord_$builder_SlashCommandBuilder().setName(command.name).setDescription(command.description);
		if(command.params != null) {
			var _g1 = 0;
			var _g2 = command.params;
			while(_g1 < _g2.length) {
				var param = _g2[_g1];
				++_g1;
				switch(param.type) {
				case "bool":
					main_command.addBooleanOption(new discord_$builder_SlashCommandBooleanOption().setName(param.name).setDescription(param.description).setRequired(param.required));
					break;
				case "channel":
					main_command.addChannelOption(new discord_$builder_SlashCommandChannelOption().setName(param.name).setDescription(param.description).setRequired(param.required));
					break;
				case "mention":
					main_command.addMentionableOption(new discord_$builder_SlashCommandMentionableOption().setName(param.name).setDescription(param.description).setRequired(param.required));
					break;
				case "number":
					main_command.addNumberOption(new discord_$builder_SlashCommandNumberOption().setName(param.name).setDescription(param.description).setRequired(param.required));
					break;
				case "role":
					main_command.addRoleOption(new discord_$builder_SlashCommandRoleOption().setName(param.name).setDescription(param.description).setRequired(param.required));
					break;
				case "string":
					main_command.addStringOption(new discord_$builder_SlashCommandStringOption().setName(param.name).setDescription(param.description).setRequired(param.required));
					break;
				case "user":
					main_command.addUserOption(new discord_$builder_SlashCommandUserOption().setName(param.name).setDescription(param.description).setRequired(param.required));
					break;
				default:
				}
			}
		}
		commands.push(discord_$builder_AnySlashCommand.fromBase(main_command));
	}
	return commands;
};
Main.get_name = function() {
	if(Main.config == null || Main.config.project_name == null) {
		return "bot";
	}
	return Main.config.project_name;
};
Math.__name__ = "Math";
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = "Reflect";
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	var tmp1;
	if(o.__properties__) {
		tmp = o.__properties__["set_" + field];
		tmp1 = tmp;
	} else {
		tmp1 = false;
	}
	if(tmp1) {
		o[tmp](value);
	} else {
		o[field] = value;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compare = function(a,b) {
	if(a == b) {
		return 0;
	} else if(a > b) {
		return 1;
	} else {
		return -1;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
Reflect.isObject = function(v) {
	if(v == null) {
		return false;
	}
	var t = typeof(v);
	if(!(t == "string" || t == "object" && v.__enum__ == null)) {
		if(t == "function") {
			return (v.__name__ || v.__ename__) != null;
		} else {
			return false;
		}
	} else {
		return true;
	}
};
Reflect.isEnumValue = function(v) {
	if(v != null) {
		return v.__enum__ != null;
	} else {
		return false;
	}
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) {
		return false;
	}
	delete(o[field]);
	return true;
};
Reflect.copy = function(o) {
	if(o == null) {
		return null;
	}
	var o2 = { };
	var _g = 0;
	var _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice;
		var a1 = arguments;
		var a2 = a.call(a1);
		return f(a2);
	};
};
var Safety = function() { };
$hxClasses["Safety"] = Safety;
Safety.__name__ = "Safety";
Safety.or = function(value,defaultValue) {
	if(value == null) {
		return defaultValue;
	} else {
		return value;
	}
};
Safety.orGet = function(value,getter) {
	if(value == null) {
		return getter();
	} else {
		return value;
	}
};
Safety.sure = function(value) {
	if(value == null) {
		throw new safety_NullPointerException("Null pointer in .sure() call");
	} else {
		return value;
	}
};
Safety.unsafe = function(value) {
	return value;
};
Safety.check = function(value,callback) {
	if(value != null) {
		return callback(value);
	} else {
		return false;
	}
};
Safety.let = function(value,callback) {
	if(value == null) {
		return null;
	} else {
		return callback(value);
	}
};
Safety.run = function(value,callback) {
	if(value != null) {
		callback(value);
	}
};
Safety.apply = function(value,callback) {
	if(value != null) {
		callback(value);
	}
	return value;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = "Std";
Std.is = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.isOfType = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.downcast = function(value,c) {
	if(js_Boot.__downcastCheck(value,c)) {
		return value;
	} else {
		return null;
	}
};
Std.instance = function(value,c) {
	if(js_Boot.__downcastCheck(value,c)) {
		return value;
	} else {
		return null;
	}
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.int = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	b: null
	,get_length: function() {
		return this.b.length;
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,addChar: function(c) {
		this.b += String.fromCodePoint(c);
	}
	,addSub: function(s,pos,len) {
		this.b += len == null ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len);
	}
	,toString: function() {
		return this.b;
	}
	,__class__: StringBuf
	,__properties__: {get_length:"get_length"}
};
var haxe_SysTools = function() { };
$hxClasses["haxe.SysTools"] = haxe_SysTools;
haxe_SysTools.__name__ = "haxe.SysTools";
haxe_SysTools.quoteUnixArg = function(argument) {
	if(argument == "") {
		return "''";
	}
	if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
		return argument;
	}
	return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
};
haxe_SysTools.quoteWinArg = function(argument,escapeMetaCharacters) {
	if(!new EReg("^[^ \t\\\\\"]+$","").match(argument)) {
		var result_b = "";
		var needquote = argument.indexOf(" ") != -1 || argument.indexOf("\t") != -1 || argument == "";
		if(needquote) {
			result_b += "\"";
		}
		var bs_buf = new StringBuf();
		var _g = 0;
		var _g1 = argument.length;
		while(_g < _g1) {
			var _g2 = HxOverrides.cca(argument,_g++);
			if(_g2 == null) {
				var c = _g2;
				if(bs_buf.b.length > 0) {
					result_b += Std.string(bs_buf.b);
					bs_buf = new StringBuf();
				}
				result_b += String.fromCodePoint(c);
			} else {
				switch(_g2) {
				case 34:
					var bs = bs_buf.b;
					result_b += bs == null ? "null" : "" + bs;
					result_b += bs == null ? "null" : "" + bs;
					bs_buf = new StringBuf();
					result_b += "\\\"";
					break;
				case 92:
					bs_buf.b += "\\";
					break;
				default:
					var c1 = _g2;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c1);
				}
			}
		}
		result_b += Std.string(bs_buf.b);
		if(needquote) {
			result_b += Std.string(bs_buf.b);
			result_b += "\"";
		}
		argument = result_b;
	}
	if(escapeMetaCharacters) {
		var result_b = "";
		var _g = 0;
		var _g1 = argument.length;
		while(_g < _g1) {
			var c = HxOverrides.cca(argument,_g++);
			if(haxe_SysTools.winMetaCharacters.indexOf(c) >= 0) {
				result_b += String.fromCodePoint(94);
			}
			result_b += String.fromCodePoint(c);
		}
		return result_b;
	} else {
		return argument;
	}
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = "StringTools";
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.htmlEscape = function(s,quotes) {
	var buf_b = "";
	var _g_offset = 0;
	var _g_s = s;
	while(_g_offset < _g_s.length) {
		var s = _g_s;
		var index = _g_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g_offset;
		}
		var code = c1;
		switch(code) {
		case 34:
			if(quotes) {
				buf_b += "&quot;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 38:
			buf_b += "&amp;";
			break;
		case 39:
			if(quotes) {
				buf_b += "&#039;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 60:
			buf_b += "&lt;";
			break;
		case 62:
			buf_b += "&gt;";
			break;
		default:
			buf_b += String.fromCodePoint(code);
		}
	}
	return buf_b;
};
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&quot;").join("\"").split("&#039;").join("'").split("&amp;").join("&");
};
StringTools.contains = function(s,value) {
	return s.indexOf(value) != -1;
};
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	if(slen >= elen) {
		return s.indexOf(end,slen - elen) == slen - elen;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	l -= s.length;
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	buf_b += s == null ? "null" : "" + s;
	return buf_b;
};
StringTools.rpad = function(s,c,l) {
	if(c.length <= 0) {
		return s;
	}
	var buf_b = "";
	buf_b = "" + (s == null ? "null" : "" + s);
	while(buf_b.length < l) buf_b += c == null ? "null" : "" + c;
	return buf_b;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	while(true) {
		s = "0123456789ABCDEF".charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.unsafeCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
StringTools.iterator = function(s) {
	return new haxe_iterators_StringIterator(s);
};
StringTools.keyValueIterator = function(s) {
	return new haxe_iterators_StringKeyValueIterator(s);
};
StringTools.isEof = function(c) {
	return c != c;
};
StringTools.quoteUnixArg = function(argument) {
	if(argument == "") {
		return "''";
	} else if(!new EReg("[^a-zA-Z0-9_@%+=:,./-]","").match(argument)) {
		return argument;
	} else {
		return "'" + StringTools.replace(argument,"'","'\"'\"'") + "'";
	}
};
StringTools.quoteWinArg = function(argument,escapeMetaCharacters) {
	var argument1 = argument;
	if(!new EReg("^[^ \t\\\\\"]+$","").match(argument1)) {
		var result_b = "";
		var needquote = argument1.indexOf(" ") != -1 || argument1.indexOf("\t") != -1 || argument1 == "";
		if(needquote) {
			result_b += "\"";
		}
		var bs_buf = new StringBuf();
		var _g = 0;
		var _g1 = argument1.length;
		while(_g < _g1) {
			var _g2 = HxOverrides.cca(argument1,_g++);
			if(_g2 == null) {
				var c = _g2;
				if(bs_buf.b.length > 0) {
					result_b += Std.string(bs_buf.b);
					bs_buf = new StringBuf();
				}
				result_b += String.fromCodePoint(c);
			} else {
				switch(_g2) {
				case 34:
					var bs = bs_buf.b;
					result_b += Std.string(bs);
					result_b += Std.string(bs);
					bs_buf = new StringBuf();
					result_b += "\\\"";
					break;
				case 92:
					bs_buf.b += "\\";
					break;
				default:
					var c1 = _g2;
					if(bs_buf.b.length > 0) {
						result_b += Std.string(bs_buf.b);
						bs_buf = new StringBuf();
					}
					result_b += String.fromCodePoint(c1);
				}
			}
		}
		result_b += Std.string(bs_buf.b);
		if(needquote) {
			result_b += Std.string(bs_buf.b);
			result_b += "\"";
		}
		argument1 = result_b;
	}
	if(escapeMetaCharacters) {
		var result_b = "";
		var _g = 0;
		var _g1 = argument1.length;
		while(_g < _g1) {
			var c = HxOverrides.cca(argument1,_g++);
			if(haxe_SysTools.winMetaCharacters.indexOf(c) >= 0) {
				result_b += String.fromCodePoint(94);
			}
			result_b += String.fromCodePoint(c);
		}
		return result_b;
	} else {
		return argument1;
	}
};
StringTools.utf16CodePointAt = function(s,index) {
	var c = s.charCodeAt(index);
	if(c >= 55296 && c <= 56319) {
		c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
	}
	return c;
};
var ValueType = $hxEnums["ValueType"] = { __ename__:"ValueType",__constructs__:null
	,TNull: {_hx_name:"TNull",_hx_index:0,__enum__:"ValueType",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"ValueType",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:2,__enum__:"ValueType",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:3,__enum__:"ValueType",toString:$estr}
	,TObject: {_hx_name:"TObject",_hx_index:4,__enum__:"ValueType",toString:$estr}
	,TFunction: {_hx_name:"TFunction",_hx_index:5,__enum__:"ValueType",toString:$estr}
	,TClass: ($_=function(c) { return {_hx_index:6,c:c,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TClass",$_.__params__ = ["c"],$_)
	,TEnum: ($_=function(e) { return {_hx_index:7,e:e,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TEnum",$_.__params__ = ["e"],$_)
	,TUnknown: {_hx_name:"TUnknown",_hx_index:8,__enum__:"ValueType",toString:$estr}
};
ValueType.__constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TClass,ValueType.TEnum,ValueType.TUnknown];
ValueType.__empty_constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TUnknown];
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = "Type";
Type.getClass = function(o) {
	return js_Boot.getClass(o);
};
Type.getEnum = function(o) {
	if(o == null) {
		return null;
	}
	return $hxEnums[o.__enum__];
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	return c.__name__;
};
Type.getEnumName = function(e) {
	return e.__ename__;
};
Type.resolveClass = function(name) {
	return $hxClasses[name];
};
Type.resolveEnum = function(name) {
	return $hxEnums[name];
};
Type.createInstance = function(cl,args) {
	return new (Function.prototype.bind.apply(cl,[null].concat(args)));
};
Type.createEmptyInstance = function(cl) {
	return Object.create(cl.prototype);
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) {
		throw haxe_Exception.thrown("No such constructor " + constr);
	}
	if(Reflect.isFunction(f)) {
		if(params == null) {
			throw haxe_Exception.thrown("Constructor " + constr + " need parameters");
		}
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) {
		throw haxe_Exception.thrown("Constructor " + constr + " does not need parameters");
	}
	return f;
};
Type.createEnumIndex = function(e,index,params) {
	var c;
	var _g = e.__constructs__[index];
	if(_g == null) {
		c = null;
	} else {
		var ctor = _g;
		c = ctor._hx_name;
	}
	if(c == null) {
		throw haxe_Exception.thrown(index + " is not a valid enum constructor index");
	}
	return Type.createEnum(e,c,params);
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"__meta__");
	HxOverrides.remove(a,"prototype");
	return a;
};
Type.getEnumConstructs = function(e) {
	var _this = e.__constructs__;
	var result = new Array(_this.length);
	var _g = 0;
	var _g1 = _this.length;
	while(_g < _g1) {
		var i = _g++;
		result[i] = _this[i]._hx_name;
	}
	return result;
};
Type.typeof = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "function":
		if(v.__name__ || v.__ename__) {
			return ValueType.TObject;
		}
		return ValueType.TFunction;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			return ValueType.TInt;
		}
		return ValueType.TFloat;
	case "object":
		if(v == null) {
			return ValueType.TNull;
		}
		var e = v.__enum__;
		if(e != null) {
			return ValueType.TEnum($hxEnums[e]);
		}
		var c = js_Boot.getClass(v);
		if(c != null) {
			return ValueType.TClass(c);
		}
		return ValueType.TObject;
	case "string":
		return ValueType.TClass(String);
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) {
		return true;
	}
	try {
		var e = a.__enum__;
		if(e == null || e != b.__enum__) {
			return false;
		}
		if(a._hx_index != b._hx_index) {
			return false;
		}
		var enm = $hxEnums[e];
		var params = enm.__constructs__[a._hx_index].__params__;
		var _g = 0;
		while(_g < params.length) {
			var f = params[_g];
			++_g;
			if(!Type.enumEq(a[f],b[f])) {
				return false;
			}
		}
	} catch( _g ) {
		return false;
	}
	return true;
};
Type.enumConstructor = function(e) {
	return $hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name;
};
Type.enumParameters = function(e) {
	var enm = $hxEnums[e.__enum__];
	var params = enm.__constructs__[e._hx_index].__params__;
	if(params != null) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < params.length) {
			var p = params[_g1];
			++_g1;
			_g.push(e[p]);
		}
		return _g;
	} else {
		return [];
	}
};
Type.enumIndex = function(e) {
	return e._hx_index;
};
Type.allEnums = function(e) {
	return e.__empty_constructs__.slice();
};
var bits_Bits = {};
bits_Bits.fromPositions = function(positions) {
	var bits = [0];
	var _g = 0;
	while(_g < positions.length) {
		var pos = positions[_g];
		++_g;
		if(pos < 32) {
			bits[0] |= 1 << pos;
		} else {
			var cell = pos / 32 | 0;
			if(bits.length <= cell) {
				var _g1 = bits.length;
				var _g2 = cell + 1;
				while(_g1 < _g2) bits[_g1++] = 0;
			}
			bits[cell] |= 1 << pos - cell * 32;
		}
	}
	return bits;
};
bits_Bits._new = function(capacity) {
	if(capacity == null) {
		capacity = 0;
	}
	var this1 = [0];
	if(capacity > 0) {
		var newLength = Math.ceil(capacity / 32);
		var _g = this1.length;
		while(_g < newLength) this1[_g++] = 0;
	}
	return this1;
};
bits_Bits.set = function(this1,pos) {
	if(pos < 32) {
		this1[0] |= 1 << pos;
	} else {
		var cell = pos / 32 | 0;
		if(this1.length <= cell) {
			var _g = this1.length;
			var _g1 = cell + 1;
			while(_g < _g1) this1[_g++] = 0;
		}
		this1[cell] |= 1 << pos - cell * 32;
	}
};
bits_Bits.unset = function(this1,pos) {
	if(pos < 32) {
		this1[0] &= ~(1 << pos);
	} else {
		var cell = pos / 32 | 0;
		if(this1.length <= cell) {
			var _g = this1.length;
			var _g1 = cell + 1;
			while(_g < _g1) this1[_g++] = 0;
		}
		this1[cell] &= ~(1 << pos - cell * 32);
	}
};
bits_Bits.add = function(this1,bits) {
	var data = bits;
	if(this1.length < data.length) {
		var newLength = data.length;
		var _g = this1.length;
		while(_g < newLength) this1[_g++] = 0;
	}
	var _g = 0;
	var _g1 = data.length;
	while(_g < _g1) {
		var cell = _g++;
		this1[cell] |= data[cell];
	}
};
bits_Bits.remove = function(this1,bits) {
	var data = bits;
	var _g = 0;
	var _g1 = data.length;
	while(_g < _g1) {
		var cell = _g++;
		if(cell >= this1.length) {
			break;
		}
		this1[cell] &= ~data[cell];
	}
};
bits_Bits.isSet = function(this1,pos) {
	if(pos < 32) {
		return 0 != (this1[0] & 1 << pos);
	} else {
		var cell = pos / 32 | 0;
		if(cell < this1.length) {
			return 0 != (this1[cell] & 1 << pos - cell * 32);
		} else {
			return false;
		}
	}
};
bits_Bits.areSet = function(this1,bits) {
	var data = bits;
	var has = true;
	var _g = 0;
	var _g1 = data.length;
	while(_g < _g1) {
		var cell = _g++;
		if(cell < this1.length) {
			has = data[cell] == (this1[cell] & data[cell]);
		} else {
			has = 0 == data[cell];
		}
		if(!has) {
			break;
		}
	}
	return has;
};
bits_Bits.forEach = function(this1,callback) {
	var _g = 0;
	var _g1 = this1.length;
	while(_g < _g1) {
		var cell = _g++;
		var cellValue = this1[cell];
		if(cellValue != 0) {
			var _g2 = 0;
			while(_g2 < 32) {
				var i = _g2++;
				if(0 != (cellValue & 1 << i)) {
					callback(cell * 32 + i);
				}
			}
		}
	}
};
bits_Bits.copy = function(this1) {
	return this1.slice();
};
bits_Bits.toString = function(this1) {
	var result = "";
	var _g = 0;
	var _g1 = this1.length;
	while(_g < _g1) {
		var cellValue = this1[_g++];
		var _g2 = 0;
		while(_g2 < 32) result = (0 != (cellValue & 1 << _g2++) ? "1" : "0") + result;
	}
	return HxOverrides.substr(result,result.indexOf("1"),null);
};
bits_Bits.isEmpty = function(this1) {
	var empty = true;
	var _g = 0;
	while(_g < this1.length) if(this1[_g++] != 0) {
		empty = false;
		break;
	}
	return empty;
};
bits_Bits.count = function(this1) {
	var result = 0;
	var _g = 0;
	while(_g < this1.length) {
		var v = this1[_g];
		++_g;
		if(v != 0) {
			v -= v >>> 1 & 1431655765;
			v = (v & 858993459) + (v >>> 2 & 858993459);
			result += (v + (v >>> 4) & 252645135) * 16843009 >>> 24;
		}
	}
	return result;
};
bits_Bits.clear = function(this1) {
	var _g = 0;
	var _g1 = this1.length;
	while(_g < _g1) this1[_g++] = 0;
};
bits_Bits.merge = function(this1,bits) {
	if(this1.length < bits.length) {
		var result = bits.slice();
		var _g = 0;
		var _g1 = this1.length;
		while(_g < _g1) {
			var cell = _g++;
			result[cell] |= this1[cell];
		}
		return result;
	} else {
		var result = this1.slice();
		var _g = 0;
		var _g1 = bits.length;
		while(_g < _g1) {
			var cell = _g++;
			result[cell] |= bits[cell];
		}
		return result;
	}
};
bits_Bits.intersect = function(this1,bits) {
	if(this1.length < bits.length) {
		var result = this1.slice();
		var _g = 0;
		var _g1 = this1.length;
		while(_g < _g1) {
			var cell = _g++;
			result[cell] &= bits[cell];
		}
		return result;
	} else {
		var result = bits.slice();
		var _g = 0;
		var _g1 = bits.length;
		while(_g < _g1) {
			var cell = _g++;
			result[cell] &= this1[cell];
		}
		return result;
	}
};
bits_Bits.iterator = function(this1) {
	return new bits_BitsIterator(this1);
};
var bits_BitsIterator = function(data) {
	this.i = 0;
	this.cell = 0;
	this.data = data;
};
$hxClasses["bits.BitsIterator"] = bits_BitsIterator;
bits_BitsIterator.__name__ = "bits.BitsIterator";
bits_BitsIterator.prototype = {
	data: null
	,cell: null
	,i: null
	,hasNext: function() {
		var has = false;
		while(this.cell < this.data.length) {
			var cellValue = this.data[this.cell];
			if(cellValue != 0) {
				while(this.i < 32) {
					if((cellValue & 1 << this.i) != 0) {
						has = true;
						break;
					}
					++this.i;
				}
				if(has) {
					break;
				}
			}
			this.i = 0;
			++this.cell;
		}
		return has;
	}
	,next: function() {
		++this.i;
		return this.cell * 32 + this.i - 1;
	}
	,__class__: bits_BitsIterator
};
var bits_BitsData = {};
bits_BitsData.__properties__ = {get_length:"get_length"};
bits_BitsData._new = function() {
	return [0];
};
bits_BitsData.resize = function(this1,newLength) {
	var _g = this1.length;
	while(_g < newLength) this1[_g++] = 0;
};
bits_BitsData.copy = function(this1) {
	return this1.slice();
};
bits_BitsData.countOnes = function(this1) {
	var result = 0;
	var _g = 0;
	while(_g < this1.length) {
		var v = this1[_g];
		++_g;
		if(v != 0) {
			v -= v >>> 1 & 1431655765;
			v = (v & 858993459) + (v >>> 2 & 858993459);
			result += (v + (v >>> 4) & 252645135) * 16843009 >>> 24;
		}
	}
	return result;
};
bits_BitsData.get = function(this1,index) {
	return this1[index];
};
bits_BitsData.set = function(this1,index,value) {
	return this1[index] = value;
};
bits_BitsData.get_length = function(this1) {
	return this1.length;
};
var components_CommandOptions = $hxEnums["components.CommandOptions"] = { __ename__:"components.CommandOptions",__constructs__:null
	,Hi: {_hx_name:"Hi",_hx_index:0,__enum__:"components.CommandOptions",toString:$estr}
	,Test: ($_=function(category,data) { return {_hx_index:1,category:category,data:data,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Test",$_.__params__ = ["category","data"],$_)
	,Boop: ($_=function(user) { return {_hx_index:2,user:user,__enum__:"components.CommandOptions",toString:$estr}; },$_._hx_name="Boop",$_.__params__ = ["user"],$_)
};
components_CommandOptions.__constructs__ = [components_CommandOptions.Hi,components_CommandOptions.Test,components_CommandOptions.Boop];
components_CommandOptions.__empty_constructs__ = [components_CommandOptions.Hi];
var discord_$builder_SharedNameAndDescription = require("@discordjs/builders").SharedNameAndDescription;
var discord_$builder_SharedSlashCommandOptions = require("@discordjs/builders").SharedSlashCommandOptions;
var discord_$builder_AnySlashCommand = {};
discord_$builder_AnySlashCommand._new = function(builder) {
	return builder;
};
discord_$builder_AnySlashCommand.fromBase = function(base) {
	return discord_$builder_AnySlashCommand._new(base);
};
discord_$builder_AnySlashCommand.fromUser = function(user) {
	return discord_$builder_AnySlashCommand._new(user);
};
discord_$builder_AnySlashCommand.fromBool = function(bool) {
	return discord_$builder_AnySlashCommand._new(bool);
};
discord_$builder_AnySlashCommand.fromString = function(string) {
	return discord_$builder_AnySlashCommand._new(string);
};
discord_$builder_AnySlashCommand.fromChannel = function(channel) {
	return discord_$builder_AnySlashCommand._new(channel);
};
discord_$builder_AnySlashCommand.fromRole = function(role) {
	return discord_$builder_AnySlashCommand._new(role);
};
discord_$builder_AnySlashCommand.fromNumber = function(number) {
	return discord_$builder_AnySlashCommand._new(number);
};
discord_$builder_AnySlashCommand.fromMentionable = function(mentionable) {
	return discord_$builder_AnySlashCommand._new(mentionable);
};
var discord_$builder_SlashCommandOptionBase = require("@discordjs/builders").SlashCommandOptionBase;
var discord_$builder_SlashCommandBooleanOption = require("@discordjs/builders").SlashCommandBooleanOption;
var discord_$builder_SlashCommandBuilder = require("@discordjs/builders").SlashCommandBuilder;
var discord_$builder_SlashCommandChannelOption = require("@discordjs/builders").SlashCommandChannelOption;
var discord_$builder_SlashCommandMentionableOption = require("@discordjs/builders").SlashCommandMentionableOption;
var discord_$builder_SlashCommandNumberOption = require("@discordjs/builders").SlashCommandNumberOption;
var discord_$builder_SlashCommandRoleOption = require("@discordjs/builders").SlashCommandRoleOption;
var discord_$builder_SlashCommandStringOption = require("@discordjs/builders").SlashCommandStringOption;
var discord_$builder_SlashCommandUserOption = require("@discordjs/builders").SlashCommandUserOption;
var discord_$js_APIMessage = require("discord.js").APIMessage;
var discord_$js_Activity = require("discord.js").Activity;
var discord_$js_Application = require("discord.js").Application;
var discord_$js_Base = require("discord.js").Base;
var discord_$js_ApplicationCommandManager = require("discord.js").ApplicationCommandManager;
var discord_$js_BaseClient = require("discord.js").BaseClient;
var discord_$js_Emoji = require("discord.js").Emoji;
var discord_$js_BaseGuildEmoji = require("discord.js").BaseGuildEmoji;
var discord_$js_BaseManager = require("discord.js").BaseManager;
var discord_$js_BitField = require("discord.js").BitField;
var discord_$js_BroadcastDispatcher = require("discord.js").BroadcastDispatcher;
var discord_$js_Channel = require("discord.js").Channel;
var discord_$js_GuildChannel = require("discord.js").GuildChannel;
var discord_$js_CategoryChannel = require("discord.js").CategoryChannel;
var discord_$js_ChannelManager = require("discord.js").ChannelManager;
var discord_$js_Client = require("discord.js").Client;
var discord_$js_ClientApplication = require("discord.js").ClientApplication;
var discord_$js_User = require("discord.js").User;
var discord_$js_ClientUser = require("discord.js").ClientUser;
var discord_$js_ClientVoiceManager = require("discord.js").ClientVoiceManager;
var discordjs_collection_Collection = require("@discordjs/collection").Collection;
var discord_$js_Collection = require("discord.js").Collection;
var discord_$js_Collector = require("discord.js").Collector;
var discord_$js_DMChannel = require("discord.js").DMChannel;
var discord_$js_Guild = require("discord.js").Guild;
var discord_$js_GuildApplicationCommandManager = require("discord.js").GuildApplicationCommandManager;
var discord_$js_GuildAuditLogs = require("discord.js").GuildAuditLogs;
var discord_$js_GuildAuditLogsEntry = require("discord.js").GuildAuditLogsEntry;
var discord_$js_GuildChannelManager = require("discord.js").GuildChannelManager;
var discord_$js_GuildEmoji = require("discord.js").GuildEmoji;
var discord_$js_GuildEmojiManager = require("discord.js").GuildEmojiManager;
var discord_$js_GuildEmojiRoleManager = require("discord.js").GuildEmojiRoleManager;
var discord_$js_GuildManager = require("discord.js").GuildManager;
var discord_$js_GuildMember = require("discord.js").GuildMember;
var discord_$js_GuildMemberManager = require("discord.js").GuildMemberManager;
var discord_$js_OverridableManager = require("discord.js").OverridableManager;
var discord_$js_GuildMemberRoleManager = require("discord.js").GuildMemberRoleManager;
var discord_$js_GuildPreview = require("discord.js").GuildPreview;
var discord_$js_GuildPreviewEmoji = require("discord.js").GuildPreviewEmoji;
var discord_$js_GuildTemplate = require("discord.js").GuildTemplate;
var discord_$js_Integration = require("discord.js").Integration;
var discord_$js_IntegrationApplication = require("discord.js").IntegrationApplication;
var discord_$js_Invite = require("discord.js").Invite;
var discord_$js_Message = require("discord.js").Message;
var discord_$js_MessageAttachment = require("discord.js").MessageAttachment;
var discord_$js_MessageCollector = require("discord.js").MessageCollector;
var discord_$js_MessageEmbed = require("discord.js").MessageEmbed;
var discord_$js_MessageManager = require("discord.js").MessageManager;
var discord_$js_MessageMentions = require("discord.js").MessageMentions;
var discord_$js_MessageReaction = require("discord.js").MessageReaction;
var discord_$js_NewsChannel = require("discord.js").NewsChannel;
var discord_$js_PartialGroupDMChannel = require("discord.js").PartialGroupDMChannel;
var discord_$js_PermissionOverwrites = require("discord.js").PermissionOverwrites;
var discord_$js_Permissions = require("discord.js").Permissions;
var discord_$js_Presence = require("discord.js").Presence;
var discord_$js_PresenceManager = require("discord.js").PresenceManager;
var discord_$js_ReactionCollector = require("discord.js").ReactionCollector;
var discord_$js_ReactionEmoji = require("discord.js").ReactionEmoji;
var discord_$js_ReactionManager = require("discord.js").ReactionManager;
var discord_$js_ReactionUserManager = require("discord.js").ReactionUserManager;
var discord_$js_RichPresenceAssets = require("discord.js").RichPresenceAssets;
var discord_$js_Role = require("discord.js").Role;
var discord_$js_RoleManager = require("discord.js").RoleManager;
var discord_$js_Shard = require("discord.js").Shard;
var discord_$js_ShardClientUtil = require("discord.js").ShardClientUtil;
var discord_$js_ShardingManager = require("discord.js").ShardingManager;
var discord_$js_StreamDispatcher = require("discord.js").StreamDispatcher;
var discord_$js_Team = require("discord.js").Team;
var discord_$js_TeamMember = require("discord.js").TeamMember;
var discord_$js_TextChannel = require("discord.js").TextChannel;
var discord_$js_ThreadChannel = require("discord.js").ThreadChannel;
var discord_$js_ThreadManager = require("discord.js").ThreadManager;
var discord_$js_UserFlags = require("discord.js").UserFlags;
var discord_$js_UserManager = require("discord.js").UserManager;
var discord_$js_VoiceBroadcast = require("discord.js").VoiceBroadcast;
var discord_$js_VoiceChannel = require("discord.js").VoiceChannel;
var discord_$js_VoiceConnection = require("discord.js").VoiceConnection;
var discord_$js_VoiceReceiver = require("discord.js").VoiceReceiver;
var discord_$js_VoiceRegion = require("discord.js").VoiceRegion;
var discord_$js_VoiceState = require("discord.js").VoiceState;
var discord_$js_VoiceStateManager = require("discord.js").VoiceStateManager;
var discord_$js_WebSocketManager = require("discord.js").WebSocketManager;
var discord_$js_WebSocketShard = require("discord.js").WebSocketShard;
var discord_$js_Webhook = require("discord.js").Webhook;
var discord_$js_WebhookClient = require("discord.js").WebhookClient;
var discordjs_rest_CDN = require("@discordjs/rest").CDN;
var node_Events = require("events");
var discordjs_rest_REST = require("@discordjs/rest").REST;
var discordjs_rest_RequestManager = require("@discordjs/rest").RequestManager;
var ecs_Components = function(_size) {
	this.components = new Array(_size);
};
$hxClasses["ecs.Components"] = ecs_Components;
ecs_Components.__name__ = "ecs.Components";
ecs_Components.prototype = {
	components: null
	,set: function(_entity,_component) {
		this.components[ecs_Entity.id(_entity)] = _component;
	}
	,get: function(_entity) {
		return this.components[ecs_Entity.id(_entity)];
	}
	,__class__: ecs_Components
};
var ecs_Entity = {};
ecs_Entity._new = function(_id) {
	return _id;
};
ecs_Entity.id = function(this1) {
	return this1;
};
var ecs_Family = function(_id,_cmpMask,_resMask,_size) {
	this.id = _id;
	this.componentsMask = _cmpMask;
	this.resourcesMask = _resMask;
	this.onEntityAdded = new ecs_ds_Signal_$ecs_$Entity();
	this.onEntityRemoved = new ecs_ds_Signal_$ecs_$Entity();
	this.onActivated = new ecs_ds_Signal_$ecs_$ds_$Unit();
	this.onDeactivated = new ecs_ds_Signal_$ecs_$ds_$Unit();
	this.entities = new ecs_ds_SparseSet(_size);
	this.active = false;
};
$hxClasses["ecs.Family"] = ecs_Family;
ecs_Family.__name__ = "ecs.Family";
ecs_Family.prototype = {
	id: null
	,componentsMask: null
	,resourcesMask: null
	,onActivated: null
	,onDeactivated: null
	,onEntityAdded: null
	,onEntityRemoved: null
	,entities: null
	,active: null
	,add: function(_entity) {
		if(!this.entities.has(_entity)) {
			this.entities.insert(_entity);
			if(this.isActive()) {
				this.onEntityAdded.notify(_entity);
			}
		}
	}
	,remove: function(_entity) {
		if(this.entities.has(_entity)) {
			if(this.isActive()) {
				this.onEntityRemoved.notify(_entity);
			}
			this.entities.remove(_entity);
		}
	}
	,has: function(_entity) {
		return this.entities.has(_entity);
	}
	,activate: function() {
		if(!this.active) {
			this.active = true;
			this.onActivated.notify(ecs_ds_Unit.unit);
			var _g = 0;
			var _g1 = this.entities.size();
			while(_g < _g1) this.onEntityAdded.notify(this.entities.getDense(_g++));
		}
	}
	,deactivate: function() {
		if(this.active) {
			var _g = 0;
			var _g1 = this.entities.size();
			while(_g < _g1) this.onEntityRemoved.notify(this.entities.getDense(_g++));
			this.onDeactivated.notify(ecs_ds_Unit.unit);
			this.active = false;
		}
	}
	,size: function() {
		return this.entities.size();
	}
	,isActive: function() {
		return this.active;
	}
	,iterator: function() {
		return new ecs__$Family_FamilyIterator(this.entities,this.isActive());
	}
	,__class__: ecs_Family
};
var ecs__$Family_FamilyIterator = function(_set,_active) {
	this.set = _set;
	this.active = _active;
	this.idx = _set.size() - 1;
};
$hxClasses["ecs._Family.FamilyIterator"] = ecs__$Family_FamilyIterator;
ecs__$Family_FamilyIterator.__name__ = "ecs._Family.FamilyIterator";
ecs__$Family_FamilyIterator.prototype = {
	set: null
	,active: null
	,idx: null
	,hasNext: function() {
		if(this.active) {
			return this.idx >= 0;
		} else {
			return false;
		}
	}
	,next: function() {
		return this.set.getDense(this.idx--);
	}
	,__class__: ecs__$Family_FamilyIterator
};
var ecs_Phase = function(_enabled,_name,_systems,_enabledSystems) {
	this.enabled = _enabled;
	this.name = _name;
	this.systems = _systems;
	this.enabledSystems = _enabledSystems;
};
$hxClasses["ecs.Phase"] = ecs_Phase;
ecs_Phase.__name__ = "ecs.Phase";
ecs_Phase.prototype = {
	enabled: null
	,systems: null
	,enabledSystems: null
	,name: null
	,update: function(_dt) {
		if(!this.enabled) {
			return;
		}
		var _g = 0;
		var _g1 = this.systems.length;
		while(_g < _g1) {
			var idx = _g++;
			if(this.enabledSystems[idx]) {
				this.systems[idx].update(_dt);
			}
		}
	}
	,enable: function() {
		if(this.enabled) {
			return;
		}
		this.enabled = true;
		var _g = 0;
		var _g1 = this.systems.length;
		while(_g < _g1) {
			var idx = _g++;
			if(this.enabledSystems[idx]) {
				this.systems[idx].onEnabled();
			}
		}
	}
	,disable: function() {
		if(!this.enabled) {
			return;
		}
		this.enabled = false;
		var _g = 0;
		var _g1 = this.systems.length;
		while(_g < _g1) {
			var idx = _g++;
			if(this.enabledSystems[idx]) {
				this.systems[idx].onDisabled();
			}
		}
	}
	,__class__: ecs_Phase
};
var ecs_System = function(_universe) {
	this.universe = _universe;
};
$hxClasses["ecs.System"] = ecs_System;
ecs_System.__name__ = "ecs.System";
ecs_System.prototype = {
	universe: null
	,onEnabled: function() {
	}
	,update: function(_dt) {
	}
	,onDisabled: function() {
	}
	,__class__: ecs_System
};
var ecs_TableType = {};
ecs_TableType._new = function(value) {
	return value;
};
ecs_TableType.fromClass = function(input) {
	return ecs_TableType._new(input.__name__);
};
var ecs_Universe = function(_entities,_components,_resources,_families,_phases) {
	this.entities = _entities;
	this.components = _components;
	this.resources = _resources;
	this.families = _families;
	this.phases = _phases;
};
$hxClasses["ecs.Universe"] = ecs_Universe;
ecs_Universe.__name__ = "ecs.Universe";
ecs_Universe.prototype = {
	entities: null
	,components: null
	,resources: null
	,families: null
	,phases: null
	,update: function(_dt) {
		var _g = 0;
		var _g1 = this.phases;
		while(_g < _g1.length) _g1[_g++].update(_dt);
	}
	,createEntity: function() {
		return this.entities.create();
	}
	,deleteEntity: function(_entity) {
		this.families.whenEntityDestroyed(_entity);
		this.components.clear(_entity);
		this.entities.destroy(ecs_Entity.id(_entity));
	}
	,getPhase: function(_name) {
		var _g = 0;
		var _g1 = this.phases;
		while(_g < _g1.length) {
			var phase = _g1[_g];
			++_g;
			if(phase.name == _name) {
				return phase;
			}
		}
		throw new haxe_Exception("Unable to find a phase with the name " + _name);
	}
	,__class__: ecs_Universe
};
var ecs_core_ComponentManager = function(_entities,_components) {
	this.entities = _entities;
	this.components = _components;
	var v = new Array(_entities.capacity());
	var _g = 0;
	var _g1 = v.length;
	while(_g < _g1) v[_g++] = [0];
	this.flags = v;
};
$hxClasses["ecs.core.ComponentManager"] = ecs_core_ComponentManager;
ecs_core_ComponentManager.__name__ = "ecs.core.ComponentManager";
ecs_core_ComponentManager.prototype = {
	entities: null
	,components: null
	,flags: null
	,getTable: function(_compID) {
		return this.components[_compID];
	}
	,set: function(_entity,_id,_component) {
		this.components[_id].set(_entity,_component);
		bits_Bits.set(this.flags[ecs_Entity.id(_entity)],_id);
	}
	,remove: function(_entity,_id) {
		bits_Bits.unset(this.flags[ecs_Entity.id(_entity)],_id);
	}
	,clear: function(_entity) {
		var _g = 0;
		var _g1 = this.components;
		while(_g < _g1.length) _g1[_g++].set(_entity,null);
		bits_Bits.clear(this.flags[ecs_Entity.id(_entity)]);
	}
	,__class__: ecs_core_ComponentManager
};
var ecs_core_EntityManager = function(_max) {
	this.storage = new Array(_max);
	this.recycleBin = new Array(_max);
	this.nextID = 0;
	this.binSize = 0;
};
$hxClasses["ecs.core.EntityManager"] = ecs_core_EntityManager;
ecs_core_EntityManager.__name__ = "ecs.core.EntityManager";
ecs_core_EntityManager.prototype = {
	storage: null
	,recycleBin: null
	,nextID: null
	,binSize: null
	,create: function() {
		if(this.binSize > 0) {
			return this.storage[this.recycleBin[--this.binSize]];
		}
		var idx = this.nextID++;
		if(idx >= this.storage.length) {
			throw haxe_Exception.thrown("ECS entity limit exceeded");
		}
		var e = ecs_Entity._new(idx);
		this.storage[idx] = e;
		return e;
	}
	,destroy: function(_id) {
		this.recycleBin[this.binSize++] = _id;
	}
	,get: function(_id) {
		return this.storage[_id];
	}
	,capacity: function() {
		return this.storage.length;
	}
	,__class__: ecs_core_EntityManager
};
var ecs_core_FamilyManager = function(_components,_resources,_families) {
	this.components = _components;
	this.resources = _resources;
	this.families = _families;
	this.number = this.families.length;
};
$hxClasses["ecs.core.FamilyManager"] = ecs_core_FamilyManager;
ecs_core_FamilyManager.__name__ = "ecs.core.FamilyManager";
ecs_core_FamilyManager.prototype = {
	components: null
	,resources: null
	,families: null
	,number: null
	,get: function(_index) {
		return this.families[_index];
	}
	,tryActivate: function(_id) {
		if(!this.families[_id].isActive() && bits_Bits.areSet(this.resources.flags,this.families[_id].resourcesMask)) {
			this.families[_id].activate();
		}
	}
	,tryDeactivate: function(_id,resourceID) {
		if(!bits_Bits.isSet(this.resources.flags,resourceID)) {
			return;
		}
		if(!this.families[_id].isActive()) {
			return;
		}
		if(bits_Bits.isSet(this.families[_id].resourcesMask,resourceID)) {
			this.families[_id].deactivate();
		}
	}
	,whenEntityDestroyed: function(_entity) {
		var _g = 0;
		var _g1 = this.families;
		while(_g < _g1.length) _g1[_g++].remove(_entity);
	}
	,__class__: ecs_core_FamilyManager
};
var ecs_core_ResourceManager = function(_flags,_resources) {
	this.flags = _flags;
	this.resources = _resources;
};
$hxClasses["ecs.core.ResourceManager"] = ecs_core_ResourceManager;
ecs_core_ResourceManager.__name__ = "ecs.core.ResourceManager";
ecs_core_ResourceManager.prototype = {
	flags: null
	,resources: null
	,get: function(_id) {
		return this.resources[_id];
	}
	,insert: function(_id,_resource) {
		this.resources[_id] = _resource;
		bits_Bits.set(this.flags,_id);
	}
	,remove: function(_id) {
		bits_Bits.unset(this.flags,_id);
		this.resources[_id] = null;
	}
	,__class__: ecs_core_ResourceManager
};
var ecs_ds_Signal = function() {
	this.subscribers = [];
};
$hxClasses["ecs.ds.Signal"] = ecs_ds_Signal;
ecs_ds_Signal.__name__ = "ecs.ds.Signal";
ecs_ds_Signal.prototype = {
	subscribers: null
	,subscribe: function(_func) {
		if(this.subscribers.indexOf(_func) == -1) {
			this.subscribers.push(_func);
		}
	}
	,unsubscribe: function(_func) {
		HxOverrides.remove(this.subscribers,_func);
	}
	,notify: function(_data) {
		var _g = 0;
		var _g1 = this.subscribers;
		while(_g < _g1.length) _g1[_g++](_data);
	}
	,__class__: ecs_ds_Signal
};
var ecs_ds_Signal_$ecs_$Entity = function() {
	this.subscribers = [];
};
$hxClasses["ecs.ds.Signal_ecs_Entity"] = ecs_ds_Signal_$ecs_$Entity;
ecs_ds_Signal_$ecs_$Entity.__name__ = "ecs.ds.Signal_ecs_Entity";
ecs_ds_Signal_$ecs_$Entity.prototype = {
	subscribers: null
	,subscribe: function(_func) {
		if(this.subscribers.indexOf(_func) == -1) {
			this.subscribers.push(_func);
		}
	}
	,unsubscribe: function(_func) {
		HxOverrides.remove(this.subscribers,_func);
	}
	,notify: function(_data) {
		var _g = 0;
		var _g1 = this.subscribers;
		while(_g < _g1.length) _g1[_g++](_data);
	}
	,__class__: ecs_ds_Signal_$ecs_$Entity
};
var ecs_ds_Signal_$ecs_$ds_$Unit = function() {
	this.subscribers = [];
};
$hxClasses["ecs.ds.Signal_ecs_ds_Unit"] = ecs_ds_Signal_$ecs_$ds_$Unit;
ecs_ds_Signal_$ecs_$ds_$Unit.__name__ = "ecs.ds.Signal_ecs_ds_Unit";
ecs_ds_Signal_$ecs_$ds_$Unit.prototype = {
	subscribers: null
	,subscribe: function(_func) {
		if(this.subscribers.indexOf(_func) == -1) {
			this.subscribers.push(_func);
		}
	}
	,unsubscribe: function(_func) {
		HxOverrides.remove(this.subscribers,_func);
	}
	,notify: function(_data) {
		var _g = 0;
		var _g1 = this.subscribers;
		while(_g < _g1.length) _g1[_g++](_data);
	}
	,__class__: ecs_ds_Signal_$ecs_$ds_$Unit
};
var ecs_ds_SparseSet = function(_size) {
	this.sparse = new Array(_size);
	this.dense = new Array(_size);
	this.number = 0;
	var _g = 0;
	var _g1 = this.sparse.length;
	while(_g < _g1) this.sparse[_g++] = 0;
	var _g = 0;
	var _g1 = this.dense.length;
	while(_g < _g1) this.dense[_g++] = ecs_Entity.none;
};
$hxClasses["ecs.ds.SparseSet"] = ecs_ds_SparseSet;
ecs_ds_SparseSet.__name__ = "ecs.ds.SparseSet";
ecs_ds_SparseSet.prototype = {
	sparse: null
	,dense: null
	,number: null
	,has: function(_entity) {
		if(this.sparse[ecs_Entity.id(_entity)] < this.number) {
			return this.dense[this.sparse[ecs_Entity.id(_entity)]] == _entity;
		} else {
			return false;
		}
	}
	,insert: function(_entity) {
		this.dense[this.number] = _entity;
		this.sparse[ecs_Entity.id(_entity)] = this.number;
		this.number++;
	}
	,remove: function(_entity) {
		var temp = this.dense[this.number - 1];
		this.dense[this.sparse[ecs_Entity.id(_entity)]] = temp;
		this.sparse[ecs_Entity.id(temp)] = this.sparse[ecs_Entity.id(_entity)];
		this.number--;
	}
	,getDense: function(_idx) {
		return this.dense[_idx];
	}
	,getSparse: function(_entity) {
		return this.sparse[ecs_Entity.id(_entity)];
	}
	,size: function() {
		return this.number;
	}
	,__class__: ecs_ds_SparseSet
};
var ecs_ds_Unit = {};
ecs_ds_Unit._new = function() {
	return null;
};
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:"haxe.StackItem",__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
haxe_StackItem.__empty_constructs__ = [haxe_StackItem.CFunction];
var haxe_CallStack = {};
haxe_CallStack.__properties__ = {get_length:"get_length"};
haxe_CallStack.get_length = function(this1) {
	return this1.length;
};
haxe_CallStack.callStack = function() {
	return haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.callStack());
};
haxe_CallStack.exceptionStack = function(fullStack) {
	if(fullStack == null) {
		fullStack = false;
	}
	var eStack = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.exceptionStack());
	return fullStack ? eStack : haxe_CallStack.subtract(eStack,haxe_CallStack.callStack());
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	var _g1 = stack;
	while(_g < _g1.length) {
		var s = _g1[_g++];
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.subtract = function(this1,stack) {
	var startIndex = -1;
	var i = -1;
	while(++i < this1.length) {
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) if(haxe_CallStack.equalItems(this1[i],stack[_g++])) {
			if(startIndex < 0) {
				startIndex = i;
			}
			++i;
			if(i >= this1.length) {
				break;
			}
		} else {
			startIndex = -1;
		}
		if(startIndex >= 0) {
			break;
		}
	}
	if(startIndex >= 0) {
		return this1.slice(0,startIndex);
	} else {
		return this1;
	}
};
haxe_CallStack.copy = function(this1) {
	return this1.slice();
};
haxe_CallStack.get = function(this1,index) {
	return this1[index];
};
haxe_CallStack.asArray = function(this1) {
	return this1;
};
haxe_CallStack.equalItems = function(item1,item2) {
	if(item1 == null) {
		if(item2 == null) {
			return true;
		} else {
			return false;
		}
	} else {
		switch(item1._hx_index) {
		case 0:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 0) {
				return true;
			} else {
				return false;
			}
			break;
		case 1:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 1) {
				return item1.m == item2.m;
			} else {
				return false;
			}
			break;
		case 2:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 2) {
				if(item1.file == item2.file && item1.line == item2.line && item1.column == item2.column) {
					return haxe_CallStack.equalItems(item1.s,item2.s);
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 3:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 3) {
				if(item1.classname == item2.classname) {
					return item1.method == item2.method;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 4:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 4) {
				return item1.v == item2.v;
			} else {
				return false;
			}
			break;
		}
	}
};
haxe_CallStack.exceptionToString = function(e) {
	if(e.get_previous() == null) {
		var tmp = "Exception: " + e.toString();
		var tmp1 = e.get_stack();
		return tmp + (tmp1 == null ? "null" : haxe_CallStack.toString(tmp1));
	}
	var result = "";
	var e1 = e;
	var prev = null;
	while(e1 != null) {
		if(prev == null) {
			var result1 = "Exception: " + e1.get_message();
			var tmp = e1.get_stack();
			result = result1 + (tmp == null ? "null" : haxe_CallStack.toString(tmp)) + result;
		} else {
			var prevStack = haxe_CallStack.subtract(e1.get_stack(),prev.get_stack());
			result = "Exception: " + e1.get_message() + (prevStack == null ? "null" : haxe_CallStack.toString(prevStack)) + "\n\nNext " + result;
		}
		prev = e1;
		e1 = e1.get_previous();
	}
	return result;
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s._hx_index) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var _g = s.m;
		b.b = (b.b += "module ") + (_g == null ? "null" : "" + _g);
		break;
	case 2:
		var _g = s.s;
		var _g1 = s.file;
		var _g2 = s.line;
		var _g3 = s.column;
		if(_g != null) {
			haxe_CallStack.itemToString(b,_g);
			b.b += " (";
		}
		b.b = (b.b += _g1 == null ? "null" : "" + _g1) + " line ";
		b.b += _g2 == null ? "null" : "" + _g2;
		if(_g3 != null) {
			b.b = (b.b += " column ") + (_g3 == null ? "null" : "" + _g3);
		}
		if(_g != null) {
			b.b += ")";
		}
		break;
	case 3:
		var _g = s.classname;
		var _g1 = s.method;
		b.b = (b.b += Std.string(_g == null ? "<unknown>" : _g)) + ".";
		b.b += _g1 == null ? "null" : "" + _g1;
		break;
	case 4:
		var _g = s.v;
		b.b = (b.b += "local function #") + (_g == null ? "null" : "" + _g);
		break;
	}
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = "haxe.IMap";
haxe_IMap.__isInterface__ = true;
haxe_IMap.prototype = {
	get: null
	,set: null
	,exists: null
	,remove: null
	,keys: null
	,iterator: null
	,keyValueIterator: null
	,copy: null
	,toString: null
	,clear: null
	,__class__: haxe_IMap
};
var haxe_DynamicAccess = {};
haxe_DynamicAccess._new = function() {
	return { };
};
haxe_DynamicAccess.get = function(this1,key) {
	return this1[key];
};
haxe_DynamicAccess.set = function(this1,key,value) {
	return this1[key] = value;
};
haxe_DynamicAccess.exists = function(this1,key) {
	return Object.prototype.hasOwnProperty.call(this1,key);
};
haxe_DynamicAccess.remove = function(this1,key) {
	return Reflect.deleteField(this1,key);
};
haxe_DynamicAccess.keys = function(this1) {
	return Reflect.fields(this1);
};
haxe_DynamicAccess.copy = function(this1) {
	return Reflect.copy(this1);
};
haxe_DynamicAccess.iterator = function(this1) {
	return new haxe_iterators_DynamicAccessIterator(this1);
};
haxe_DynamicAccess.keyValueIterator = function(this1) {
	return new haxe_iterators_DynamicAccessKeyValueIterator(this1);
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
	this.__skipStack = 0;
	var old = Error.prepareStackTrace;
	Error.prepareStackTrace = function(e) { return e.stack; }
	if(((native) instanceof Error)) {
		this.stack = native.stack;
	} else {
		var e = null;
		if(Error.captureStackTrace) {
			Error.captureStackTrace(this,haxe_Exception);
			e = this;
		} else {
			e = new Error();
			if(typeof(e.stack) == "undefined") {
				try { throw e; } catch(_) {}
				this.__skipStack++;
			}
		}
		this.stack = e.stack;
	}
	Error.prepareStackTrace = old;
};
$hxClasses["haxe.Exception"] = haxe_Exception;
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		e.__skipStack++;
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,details: function() {
		if(this.get_previous() == null) {
			var tmp = "Exception: " + this.toString();
			var tmp1 = this.get_stack();
			return tmp + (tmp1 == null ? "null" : haxe_CallStack.toString(tmp1));
		} else {
			var result = "";
			var e = this;
			var prev = null;
			while(e != null) {
				if(prev == null) {
					var result1 = "Exception: " + e.get_message();
					var tmp = e.get_stack();
					result = result1 + (tmp == null ? "null" : haxe_CallStack.toString(tmp)) + result;
				} else {
					var prevStack = haxe_CallStack.subtract(e.get_stack(),prev.get_stack());
					result = "Exception: " + e.get_message() + (prevStack == null ? "null" : haxe_CallStack.toString(prevStack)) + "\n\nNext " + result;
				}
				prev = e;
				e = e.get_previous();
			}
			return result;
		}
	}
	,__shiftStack: function() {
		this.__skipStack++;
	}
	,get_message: function() {
		return this.message;
	}
	,get_previous: function() {
		return this.__previousException;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,get_stack: function() {
		var _g = this.__exceptionStack;
		if(_g == null) {
			var value = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.normalize(this.stack),this.__skipStack);
			this.setProperty("__exceptionStack",value);
			return value;
		} else {
			return _g;
		}
	}
	,setProperty: function(name,value) {
		try {
			Object.defineProperty(this,name,{ value : value});
		} catch( _g ) {
			this[name] = value;
		}
	}
	,get___exceptionStack: function() {
		return this.__exceptionStack;
	}
	,set___exceptionStack: function(value) {
		this.setProperty("__exceptionStack",value);
		return value;
	}
	,get___skipStack: function() {
		return this.__skipStack;
	}
	,set___skipStack: function(value) {
		this.setProperty("__skipStack",value);
		return value;
	}
	,get___nativeException: function() {
		return this.__nativeException;
	}
	,set___nativeException: function(value) {
		this.setProperty("__nativeException",value);
		return value;
	}
	,get___previousException: function() {
		return this.__previousException;
	}
	,set___previousException: function(value) {
		this.setProperty("__previousException",value);
		return value;
	}
	,__class__: haxe_Exception
	,__properties__: {set___exceptionStack:"set___exceptionStack",get___exceptionStack:"get___exceptionStack",get_native:"get_native",get_previous:"get_previous",get_stack:"get_stack",get_message:"get_message"}
});
var haxe_Int32 = {};
haxe_Int32.negate = function(this1) {
	return ~this1 + 1 | 0;
};
haxe_Int32.preIncrement = function(this1) {
	this1 = ++this1 | 0;
	return this1;
};
haxe_Int32.postIncrement = function(this1) {
	var ret = this1++;
	this1 |= 0;
	return ret;
};
haxe_Int32.preDecrement = function(this1) {
	this1 = --this1 | 0;
	return this1;
};
haxe_Int32.postDecrement = function(this1) {
	var ret = this1--;
	this1 |= 0;
	return ret;
};
haxe_Int32.add = function(a,b) {
	return a + b | 0;
};
haxe_Int32.addInt = function(a,b) {
	return a + b | 0;
};
haxe_Int32.sub = function(a,b) {
	return a - b | 0;
};
haxe_Int32.subInt = function(a,b) {
	return a - b | 0;
};
haxe_Int32.intSub = function(a,b) {
	return a - b | 0;
};
haxe_Int32.mul = function(a,b) {
	return haxe_Int32._mul(a,b);
};
haxe_Int32.mulInt = function(a,b) {
	return haxe_Int32._mul(a,b);
};
haxe_Int32.toFloat = function(this1) {
	return this1;
};
haxe_Int32.ucompare = function(a,b) {
	if(a < 0) {
		if(b < 0) {
			return ~b - ~a | 0;
		} else {
			return 1;
		}
	}
	if(b < 0) {
		return -1;
	} else {
		return a - b | 0;
	}
};
haxe_Int32.clamp = function(x) {
	return x | 0;
};
var haxe_Int64 = {};
haxe_Int64.__properties__ = {get_low:"get_low",get_high:"get_high"};
haxe_Int64._new = function(x) {
	return x;
};
haxe_Int64.copy = function(this1) {
	return new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
};
haxe_Int64.make = function(high,low) {
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.ofInt = function(x) {
	return new haxe__$Int64__$_$_$Int64(x >> 31,x);
};
haxe_Int64.toInt = function(x) {
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	return x.low;
};
haxe_Int64.is = function(val) {
	return ((val) instanceof haxe__$Int64__$_$_$Int64);
};
haxe_Int64.isInt64 = function(val) {
	return ((val) instanceof haxe__$Int64__$_$_$Int64);
};
haxe_Int64.getHigh = function(x) {
	return x.high;
};
haxe_Int64.getLow = function(x) {
	return x.low;
};
haxe_Int64.isNeg = function(x) {
	return x.high < 0;
};
haxe_Int64.isZero = function(x) {
	if(x.high == 0) {
		return x.low == 0;
	} else {
		return false;
	}
};
haxe_Int64.compare = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	if(a.high < 0) {
		if(b.high < 0) {
			return v;
		} else {
			return -1;
		}
	} else if(b.high >= 0) {
		return v;
	} else {
		return 1;
	}
};
haxe_Int64.ucompare = function(a,b) {
	var v = haxe_Int32.ucompare(a.high,b.high);
	if(v != 0) {
		return v;
	} else {
		return haxe_Int32.ucompare(a.low,b.low);
	}
};
haxe_Int64.toStr = function(x) {
	return haxe_Int64.toString(x);
};
haxe_Int64.toString = function(this1) {
	var i = this1;
	if(i.high == 0 && i.low == 0) {
		return "0";
	}
	var str = "";
	var neg = false;
	if(i.high < 0) {
		neg = true;
	}
	var ten = new haxe__$Int64__$_$_$Int64(0,10);
	while(i.high != 0 || i.low != 0) {
		var r = haxe_Int64.divMod(i,ten);
		if(r.modulus.high < 0) {
			str = (~r.modulus.low + 1 | 0) + str;
			var x = r.quotient;
			var high = ~x.high;
			var low = ~x.low + 1 | 0;
			if(low == 0) {
				++high;
				high = high | 0;
			}
			i = new haxe__$Int64__$_$_$Int64(high,low);
		} else {
			str = r.modulus.low + str;
			i = r.quotient;
		}
	}
	if(neg) {
		str = "-" + str;
	}
	return str;
};
haxe_Int64.parseString = function(sParam) {
	return haxe_Int64Helper.parseString(sParam);
};
haxe_Int64.fromFloat = function(f) {
	return haxe_Int64Helper.fromFloat(f);
};
haxe_Int64.divMod = function(dividend,divisor) {
	if(divisor.high == 0) {
		switch(divisor.low) {
		case 0:
			throw haxe_Exception.thrown("divide by zero");
		case 1:
			return { quotient : new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low), modulus : new haxe__$Int64__$_$_$Int64(0,0)};
		}
	}
	var divSign = dividend.high < 0 != divisor.high < 0;
	var modulus;
	if(dividend.high < 0) {
		var high = ~dividend.high;
		var low = ~dividend.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		modulus = new haxe__$Int64__$_$_$Int64(high,low);
	} else {
		modulus = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
	}
	if(divisor.high < 0) {
		var high = ~divisor.high;
		var low = ~divisor.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		divisor = new haxe__$Int64__$_$_$Int64(high,low);
	}
	var quotient = new haxe__$Int64__$_$_$Int64(0,0);
	var mask = new haxe__$Int64__$_$_$Int64(0,1);
	while(!(divisor.high < 0)) {
		var v = haxe_Int32.ucompare(divisor.high,modulus.high);
		var cmp = v != 0 ? v : haxe_Int32.ucompare(divisor.low,modulus.low);
		divisor = new haxe__$Int64__$_$_$Int64(divisor.high << 1 | divisor.low >>> 31,divisor.low << 1);
		mask = new haxe__$Int64__$_$_$Int64(mask.high << 1 | mask.low >>> 31,mask.low << 1);
		if(cmp >= 0) {
			break;
		}
	}
	while(mask.high != 0 || mask.low != 0) {
		var v = haxe_Int32.ucompare(modulus.high,divisor.high);
		if((v != 0 ? v : haxe_Int32.ucompare(modulus.low,divisor.low)) >= 0) {
			quotient = new haxe__$Int64__$_$_$Int64(quotient.high | mask.high,quotient.low | mask.low);
			var high = modulus.high - divisor.high | 0;
			if(haxe_Int32.ucompare(modulus.low,divisor.low) < 0) {
				--high;
				high = high | 0;
			}
			modulus = new haxe__$Int64__$_$_$Int64(high,modulus.low - divisor.low | 0);
		}
		mask = new haxe__$Int64__$_$_$Int64(mask.high >>> 1,mask.high << 31 | mask.low >>> 1);
		divisor = new haxe__$Int64__$_$_$Int64(divisor.high >>> 1,divisor.high << 31 | divisor.low >>> 1);
	}
	if(divSign) {
		var high = ~quotient.high;
		var low = ~quotient.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		quotient = new haxe__$Int64__$_$_$Int64(high,low);
	}
	if(dividend.high < 0) {
		var high = ~modulus.high;
		var low = ~modulus.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		modulus = new haxe__$Int64__$_$_$Int64(high,low);
	}
	return { quotient : quotient, modulus : modulus};
};
haxe_Int64.neg = function(x) {
	var high = ~x.high;
	var low = ~x.low + 1 | 0;
	if(low == 0) {
		++high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.preIncrement = function(this1) {
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	x.low++;
	x.low = x.low | 0;
	if(x.low == 0) {
		x.high++;
		x.high = x.high | 0;
	}
	return x;
};
haxe_Int64.postIncrement = function(this1) {
	var ret = this1;
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	x.low++;
	x.low = x.low | 0;
	if(x.low == 0) {
		x.high++;
		x.high = x.high | 0;
	}
	return ret;
};
haxe_Int64.preDecrement = function(this1) {
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	if(x.low == 0) {
		x.high--;
		x.high = x.high | 0;
	}
	x.low--;
	x.low = x.low | 0;
	return x;
};
haxe_Int64.postDecrement = function(this1) {
	var ret = this1;
	var x = new haxe__$Int64__$_$_$Int64(this1.high,this1.low);
	this1 = x;
	if(x.low == 0) {
		x.high--;
		x.high = x.high | 0;
	}
	x.low--;
	x.low = x.low | 0;
	return ret;
};
haxe_Int64.add = function(a,b) {
	var high = a.high + b.high | 0;
	var low = a.low + b.low | 0;
	if(haxe_Int32.ucompare(low,a.low) < 0) {
		++high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.addInt = function(a,b) {
	var high = a.high + (b >> 31) | 0;
	var low = a.low + b | 0;
	if(haxe_Int32.ucompare(low,a.low) < 0) {
		++high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.sub = function(a,b) {
	var high = a.high - b.high | 0;
	if(haxe_Int32.ucompare(a.low,b.low) < 0) {
		--high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,a.low - b.low | 0);
};
haxe_Int64.subInt = function(a,b) {
	var b_low = b;
	var high = a.high - (b >> 31) | 0;
	if(haxe_Int32.ucompare(a.low,b_low) < 0) {
		--high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,a.low - b_low | 0);
};
haxe_Int64.intSub = function(a,b) {
	var a_low = a;
	var high = (a >> 31) - b.high | 0;
	if(haxe_Int32.ucompare(a_low,b.low) < 0) {
		--high;
		high = high | 0;
	}
	return new haxe__$Int64__$_$_$Int64(high,a_low - b.low | 0);
};
haxe_Int64.mul = function(a,b) {
	var al = a.low & 65535;
	var ah = a.low >>> 16;
	var bl = b.low & 65535;
	var bh = b.low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var low = p00;
	var high = (haxe_Int32._mul(ah,bh) + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = p00 + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		++high;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		++high;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a.low,b.high) + haxe_Int32._mul(a.high,b.low) | 0) | 0;
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.mulInt = function(a,b) {
	var b_low = b;
	var al = a.low & 65535;
	var ah = a.low >>> 16;
	var bl = b_low & 65535;
	var bh = b_low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var low = p00;
	var high = (haxe_Int32._mul(ah,bh) + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = p00 + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		++high;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		++high;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a.low,b >> 31) + haxe_Int32._mul(a.high,b_low) | 0) | 0;
	return new haxe__$Int64__$_$_$Int64(high,low);
};
haxe_Int64.div = function(a,b) {
	return haxe_Int64.divMod(a,b).quotient;
};
haxe_Int64.divInt = function(a,b) {
	return haxe_Int64.divMod(a,new haxe__$Int64__$_$_$Int64(b >> 31,b)).quotient;
};
haxe_Int64.intDiv = function(a,b) {
	var x = haxe_Int64.divMod(new haxe__$Int64__$_$_$Int64(a >> 31,a),b).quotient;
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	var x1 = x.low;
	return new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
};
haxe_Int64.mod = function(a,b) {
	return haxe_Int64.divMod(a,b).modulus;
};
haxe_Int64.modInt = function(a,b) {
	var x = haxe_Int64.divMod(a,new haxe__$Int64__$_$_$Int64(b >> 31,b)).modulus;
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	var x1 = x.low;
	return new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
};
haxe_Int64.intMod = function(a,b) {
	var x = haxe_Int64.divMod(new haxe__$Int64__$_$_$Int64(a >> 31,a),b).modulus;
	if(x.high != x.low >> 31) {
		throw haxe_Exception.thrown("Overflow");
	}
	var x1 = x.low;
	return new haxe__$Int64__$_$_$Int64(x1 >> 31,x1);
};
haxe_Int64.eq = function(a,b) {
	if(a.high == b.high) {
		return a.low == b.low;
	} else {
		return false;
	}
};
haxe_Int64.eqInt = function(a,b) {
	if(a.high == b >> 31) {
		return a.low == b;
	} else {
		return false;
	}
};
haxe_Int64.neq = function(a,b) {
	if(a.high == b.high) {
		return a.low != b.low;
	} else {
		return true;
	}
};
haxe_Int64.neqInt = function(a,b) {
	if(a.high == b >> 31) {
		return a.low != b;
	} else {
		return true;
	}
};
haxe_Int64.lt = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
};
haxe_Int64.ltInt = function(a,b) {
	var b_high = b >> 31;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) < 0;
};
haxe_Int64.intLt = function(a,b) {
	var a_high = a >> 31;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) < 0;
};
haxe_Int64.lte = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
};
haxe_Int64.lteInt = function(a,b) {
	var b_high = b >> 31;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) <= 0;
};
haxe_Int64.intLte = function(a,b) {
	var a_high = a >> 31;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) <= 0;
};
haxe_Int64.gt = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
};
haxe_Int64.gtInt = function(a,b) {
	var b_high = b >> 31;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) > 0;
};
haxe_Int64.intGt = function(a,b) {
	var a_high = a >> 31;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) > 0;
};
haxe_Int64.gte = function(a,b) {
	var v = a.high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b.low);
	}
	return (a.high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
};
haxe_Int64.gteInt = function(a,b) {
	var b_high = b >> 31;
	var v = a.high - b_high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a.low,b);
	}
	return (a.high < 0 ? b_high < 0 ? v : -1 : b_high >= 0 ? v : 1) >= 0;
};
haxe_Int64.intGte = function(a,b) {
	var a_high = a >> 31;
	var v = a_high - b.high | 0;
	if(v == 0) {
		v = haxe_Int32.ucompare(a,b.low);
	}
	return (a_high < 0 ? b.high < 0 ? v : -1 : b.high >= 0 ? v : 1) >= 0;
};
haxe_Int64.complement = function(a) {
	return new haxe__$Int64__$_$_$Int64(~a.high,~a.low);
};
haxe_Int64.and = function(a,b) {
	return new haxe__$Int64__$_$_$Int64(a.high & b.high,a.low & b.low);
};
haxe_Int64.or = function(a,b) {
	return new haxe__$Int64__$_$_$Int64(a.high | b.high,a.low | b.low);
};
haxe_Int64.xor = function(a,b) {
	return new haxe__$Int64__$_$_$Int64(a.high ^ b.high,a.low ^ b.low);
};
haxe_Int64.shl = function(a,b) {
	b &= 63;
	if(b == 0) {
		return new haxe__$Int64__$_$_$Int64(a.high,a.low);
	} else if(b < 32) {
		return new haxe__$Int64__$_$_$Int64(a.high << b | a.low >>> 32 - b,a.low << b);
	} else {
		return new haxe__$Int64__$_$_$Int64(a.low << b - 32,0);
	}
};
haxe_Int64.shr = function(a,b) {
	b &= 63;
	if(b == 0) {
		return new haxe__$Int64__$_$_$Int64(a.high,a.low);
	} else if(b < 32) {
		return new haxe__$Int64__$_$_$Int64(a.high >> b,a.high << 32 - b | a.low >>> b);
	} else {
		return new haxe__$Int64__$_$_$Int64(a.high >> 31,a.high >> b - 32);
	}
};
haxe_Int64.ushr = function(a,b) {
	b &= 63;
	if(b == 0) {
		return new haxe__$Int64__$_$_$Int64(a.high,a.low);
	} else if(b < 32) {
		return new haxe__$Int64__$_$_$Int64(a.high >>> b,a.high << 32 - b | a.low >>> b);
	} else {
		return new haxe__$Int64__$_$_$Int64(0,a.high >>> b - 32);
	}
};
haxe_Int64.get_high = function(this1) {
	return this1.high;
};
haxe_Int64.set_high = function(this1,x) {
	return this1.high = x;
};
haxe_Int64.get_low = function(this1) {
	return this1.low;
};
haxe_Int64.set_low = function(this1,x) {
	return this1.low = x;
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = "haxe._Int64.___Int64";
haxe__$Int64__$_$_$Int64.prototype = {
	high: null
	,low: null
	,toString: function() {
		return haxe_Int64.toString(this);
	}
	,__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Int64Helper = function() { };
$hxClasses["haxe.Int64Helper"] = haxe_Int64Helper;
haxe_Int64Helper.__name__ = "haxe.Int64Helper";
haxe_Int64Helper.parseString = function(sParam) {
	var base_high = 0;
	var base_low = 10;
	var current = new haxe__$Int64__$_$_$Int64(0,0);
	var multiplier = new haxe__$Int64__$_$_$Int64(0,1);
	var sIsNegative = false;
	var s = StringTools.trim(sParam);
	if(s.charAt(0) == "-") {
		sIsNegative = true;
		s = s.substring(1,s.length);
	}
	var len = s.length;
	var _g = 0;
	while(_g < len) {
		var digitInt = HxOverrides.cca(s,len - 1 - _g++) - 48;
		if(digitInt < 0 || digitInt > 9) {
			throw haxe_Exception.thrown("NumberFormatError");
		}
		if(digitInt != 0) {
			var digit_high = digitInt >> 31;
			var digit_low = digitInt;
			if(sIsNegative) {
				var al = multiplier.low & 65535;
				var ah = multiplier.low >>> 16;
				var bl = digit_low & 65535;
				var bh = digit_low >>> 16;
				var p00 = haxe_Int32._mul(al,bl);
				var p10 = haxe_Int32._mul(ah,bl);
				var p01 = haxe_Int32._mul(al,bh);
				var low = p00;
				var high = (haxe_Int32._mul(ah,bh) + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
				p01 <<= 16;
				low = p00 + p01 | 0;
				if(haxe_Int32.ucompare(low,p01) < 0) {
					++high;
					high = high | 0;
				}
				p10 <<= 16;
				low = low + p10 | 0;
				if(haxe_Int32.ucompare(low,p10) < 0) {
					++high;
					high = high | 0;
				}
				high = high + (haxe_Int32._mul(multiplier.low,digit_high) + haxe_Int32._mul(multiplier.high,digit_low) | 0) | 0;
				var b_low = low;
				var high1 = current.high - high | 0;
				if(haxe_Int32.ucompare(current.low,b_low) < 0) {
					--high1;
					high1 = high1 | 0;
				}
				current = new haxe__$Int64__$_$_$Int64(high1,current.low - b_low | 0);
				if(!(current.high < 0)) {
					throw haxe_Exception.thrown("NumberFormatError: Underflow");
				}
			} else {
				var al1 = multiplier.low & 65535;
				var ah1 = multiplier.low >>> 16;
				var bl1 = digit_low & 65535;
				var bh1 = digit_low >>> 16;
				var p001 = haxe_Int32._mul(al1,bl1);
				var p101 = haxe_Int32._mul(ah1,bl1);
				var p011 = haxe_Int32._mul(al1,bh1);
				var low1 = p001;
				var high2 = (haxe_Int32._mul(ah1,bh1) + (p011 >>> 16) | 0) + (p101 >>> 16) | 0;
				p011 <<= 16;
				low1 = p001 + p011 | 0;
				if(haxe_Int32.ucompare(low1,p011) < 0) {
					++high2;
					high2 = high2 | 0;
				}
				p101 <<= 16;
				low1 = low1 + p101 | 0;
				if(haxe_Int32.ucompare(low1,p101) < 0) {
					++high2;
					high2 = high2 | 0;
				}
				high2 = high2 + (haxe_Int32._mul(multiplier.low,digit_high) + haxe_Int32._mul(multiplier.high,digit_low) | 0) | 0;
				var high3 = current.high + high2 | 0;
				var low2 = current.low + low1 | 0;
				if(haxe_Int32.ucompare(low2,current.low) < 0) {
					++high3;
					high3 = high3 | 0;
				}
				current = new haxe__$Int64__$_$_$Int64(high3,low2);
				if(current.high < 0) {
					throw haxe_Exception.thrown("NumberFormatError: Overflow");
				}
			}
		}
		var al2 = multiplier.low & 65535;
		var ah2 = multiplier.low >>> 16;
		var bl2 = base_low & 65535;
		var bh2 = base_low >>> 16;
		var p002 = haxe_Int32._mul(al2,bl2);
		var p102 = haxe_Int32._mul(ah2,bl2);
		var p012 = haxe_Int32._mul(al2,bh2);
		var low3 = p002;
		var high4 = (haxe_Int32._mul(ah2,bh2) + (p012 >>> 16) | 0) + (p102 >>> 16) | 0;
		p012 <<= 16;
		low3 = p002 + p012 | 0;
		if(haxe_Int32.ucompare(low3,p012) < 0) {
			++high4;
			high4 = high4 | 0;
		}
		p102 <<= 16;
		low3 = low3 + p102 | 0;
		if(haxe_Int32.ucompare(low3,p102) < 0) {
			++high4;
			high4 = high4 | 0;
		}
		high4 = high4 + (haxe_Int32._mul(multiplier.low,base_high) + haxe_Int32._mul(multiplier.high,base_low) | 0) | 0;
		multiplier = new haxe__$Int64__$_$_$Int64(high4,low3);
	}
	return current;
};
haxe_Int64Helper.fromFloat = function(f) {
	if(isNaN(f) || !isFinite(f)) {
		throw haxe_Exception.thrown("Number is NaN or Infinite");
	}
	var noFractions = f - f % 1;
	if(noFractions > 9007199254740991) {
		throw haxe_Exception.thrown("Conversion overflow");
	}
	if(noFractions < -9007199254740991) {
		throw haxe_Exception.thrown("Conversion underflow");
	}
	var result = new haxe__$Int64__$_$_$Int64(0,0);
	var neg = noFractions < 0;
	var rest = neg ? -noFractions : noFractions;
	var i = 0;
	while(rest >= 1) {
		var curr = rest % 2;
		rest /= 2;
		if(curr >= 1) {
			var a_high = 0;
			var a_low = 1;
			var b = i;
			b &= 63;
			var b1 = b == 0 ? new haxe__$Int64__$_$_$Int64(a_high,a_low) : b < 32 ? new haxe__$Int64__$_$_$Int64(a_high << b | a_low >>> 32 - b,a_low << b) : new haxe__$Int64__$_$_$Int64(a_low << b - 32,0);
			var high = result.high + b1.high | 0;
			var low = result.low + b1.low | 0;
			if(haxe_Int32.ucompare(low,result.low) < 0) {
				++high;
				high = high | 0;
			}
			result = new haxe__$Int64__$_$_$Int64(high,low);
		}
		++i;
	}
	if(neg) {
		var high = ~result.high;
		var low = ~result.low + 1 | 0;
		if(low == 0) {
			++high;
			high = high | 0;
		}
		result = new haxe__$Int64__$_$_$Int64(high,low);
	}
	return result;
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = "haxe.Log";
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) str += ", " + Std.string(_g1[_g++]);
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe_NativeStackTrace = function() { };
$hxClasses["haxe.NativeStackTrace"] = haxe_NativeStackTrace;
haxe_NativeStackTrace.__name__ = "haxe.NativeStackTrace";
haxe_NativeStackTrace.lastError = null;
haxe_NativeStackTrace.wrapCallSite = null;
haxe_NativeStackTrace.saveStack = function(e) {
	haxe_NativeStackTrace.lastError = e;
};
haxe_NativeStackTrace.callStack = function() {
	var e = new Error("");
	var stack = haxe_NativeStackTrace.tryHaxeStack(e);
	if(typeof(stack) == "undefined") {
		try {
			throw e;
		} catch( _g ) {
		}
		stack = e.stack;
	}
	return haxe_NativeStackTrace.normalize(stack,2);
};
haxe_NativeStackTrace.exceptionStack = function() {
	return haxe_NativeStackTrace.normalize(haxe_NativeStackTrace.tryHaxeStack(haxe_NativeStackTrace.lastError));
};
haxe_NativeStackTrace.toHaxe = function(s,skip) {
	if(skip == null) {
		skip = 0;
	}
	if(s == null) {
		return [];
	} else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") {
			stack.shift();
		}
		var m = [];
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) {
			var i = _g++;
			if(skip > i) {
				continue;
			}
			var line = stack[i];
			var matched = line.match(/^    at ([A-Za-z0-9_. ]+) \(([^)]+):([0-9]+):([0-9]+)\)$/);
			if(matched != null) {
				var path = matched[1].split(".");
				if(path[0] == "$hxClasses") {
					path.shift();
				}
				var meth = path.pop();
				var file = matched[2];
				var line1 = Std.parseInt(matched[3]);
				var column = Std.parseInt(matched[4]);
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function" ? haxe_StackItem.LocalFunction() : meth == "Global code" ? null : haxe_StackItem.Method(path.join("."),meth),file,line1,column));
			} else {
				m.push(haxe_StackItem.Module(StringTools.trim(line)));
			}
		}
		return m;
	} else if(skip > 0 && Array.isArray(s)) {
		return s.slice(skip);
	} else {
		return s;
	}
};
haxe_NativeStackTrace.tryHaxeStack = function(e) {
	if(e == null) {
		return [];
	}
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = haxe_NativeStackTrace.prepareHxStackTrace;
	Error.prepareStackTrace = oldValue;
	return e.stack;
};
haxe_NativeStackTrace.prepareHxStackTrace = function(e,callsites) {
	var stack = [];
	var _g = 0;
	while(_g < callsites.length) {
		var site = callsites[_g];
		++_g;
		if(haxe_NativeStackTrace.wrapCallSite != null) {
			site = haxe_NativeStackTrace.wrapCallSite(site);
		}
		var method = null;
		var fullName = site.getFunctionName();
		if(fullName != null) {
			var idx = fullName.lastIndexOf(".");
			if(idx >= 0) {
				method = haxe_StackItem.Method(fullName.substring(0,idx),fullName.substring(idx + 1));
			} else {
				method = haxe_StackItem.Method(null,fullName);
			}
		}
		var fileName = site.getFileName();
		var fileAddr = fileName == null ? -1 : fileName.indexOf("file:");
		if(haxe_NativeStackTrace.wrapCallSite != null && fileAddr > 0) {
			fileName = fileName.substring(fileAddr + 6);
		}
		stack.push(haxe_StackItem.FilePos(method,fileName,site.getLineNumber(),site.getColumnNumber()));
	}
	return stack;
};
haxe_NativeStackTrace.normalize = function(stack,skipItems) {
	if(skipItems == null) {
		skipItems = 0;
	}
	if(Array.isArray(stack) && skipItems > 0) {
		return stack.slice(skipItems);
	} else if(typeof(stack) == "string") {
		switch(stack.substring(0,6)) {
		case "Error\n":case "Error:":
			++skipItems;
			break;
		default:
		}
		return haxe_NativeStackTrace.skipLines(stack,skipItems);
	} else {
		return stack;
	}
};
haxe_NativeStackTrace.skipLines = function(stack,skip,pos) {
	if(pos == null) {
		pos = 0;
	}
	while(true) if(skip > 0) {
		pos = stack.indexOf("\n",pos);
		if(pos < 0) {
			return "";
		} else {
			skip = --skip;
			pos += 1;
			continue;
		}
	} else {
		return stack.substring(pos);
	}
};
var haxe_Rest = {};
haxe_Rest.__properties__ = {get_length:"get_length"};
haxe_Rest.get_length = function(this1) {
	return this1.length;
};
haxe_Rest.of = function(array) {
	return array;
};
haxe_Rest._new = function(array) {
	return array;
};
haxe_Rest.get = function(this1,index) {
	return this1[index];
};
haxe_Rest.toArray = function(this1) {
	return this1.slice();
};
haxe_Rest.iterator = function(this1) {
	return new haxe_iterators_RestIterator(this1);
};
haxe_Rest.keyValueIterator = function(this1) {
	return new haxe_iterators_RestKeyValueIterator(this1);
};
haxe_Rest.append = function(this1,item) {
	var result = this1.slice();
	result.push(item);
	return result;
};
haxe_Rest.prepend = function(this1,item) {
	var result = this1.slice();
	result.unshift(item);
	return result;
};
haxe_Rest.toString = function(this1) {
	return "[" + this1.toString() + "]";
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = "haxe.Timer";
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.measure = function(f,pos) {
	var hrtime = process.hrtime();
	var t0 = hrtime[0] + hrtime[1] / 1e9;
	var r = f();
	var tmp = haxe_Log.trace;
	var hrtime = process.hrtime();
	tmp(hrtime[0] + hrtime[1] / 1e9 - t0 + "s",pos);
	return r;
};
haxe_Timer.stamp = function() {
	var hrtime = process.hrtime();
	return hrtime[0] + hrtime[1] / 1e9;
};
haxe_Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
	this.__skipStack++;
};
$hxClasses["haxe.ValueException"] = haxe_ValueException;
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_ds_ReadOnlyArray = {};
haxe_ds_ReadOnlyArray.__properties__ = {get_length:"get_length"};
haxe_ds_ReadOnlyArray.get_length = function(this1) {
	return this1.length;
};
haxe_ds_ReadOnlyArray.get = function(this1,i) {
	return this1[i];
};
haxe_ds_ReadOnlyArray.concat = function(this1,a) {
	return this1.concat(a);
};
var haxe_ds_Vector = {};
haxe_ds_Vector.__properties__ = {get_length:"get_length"};
haxe_ds_Vector._new = function(length) {
	return new Array(length);
};
haxe_ds_Vector.get = function(this1,index) {
	return this1[index];
};
haxe_ds_Vector.set = function(this1,index,val) {
	return this1[index] = val;
};
haxe_ds_Vector.get_length = function(this1) {
	return this1.length;
};
haxe_ds_Vector.blit = function(src,srcPos,dest,destPos,len) {
	if(src == dest) {
		if(srcPos < destPos) {
			var i = srcPos + len;
			var j = destPos + len;
			var _g = 0;
			while(_g < len) {
				++_g;
				--i;
				--j;
				src[j] = src[i];
			}
		} else if(srcPos > destPos) {
			var i = srcPos;
			var j = destPos;
			var _g = 0;
			while(_g < len) {
				++_g;
				src[j] = src[i];
				++i;
				++j;
			}
		}
	} else {
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			dest[destPos + i] = src[srcPos + i];
		}
	}
};
haxe_ds_Vector.toArray = function(this1) {
	return this1.slice(0);
};
haxe_ds_Vector.toData = function(this1) {
	return this1;
};
haxe_ds_Vector.fromData = function(data) {
	return data;
};
haxe_ds_Vector.fromArrayCopy = function(array) {
	return array.slice(0);
};
haxe_ds_Vector.copy = function(this1) {
	var r = new Array(this1.length);
	haxe_ds_Vector.blit(this1,0,r,0,this1.length);
	return r;
};
haxe_ds_Vector.join = function(this1,sep) {
	var b_b = "";
	var len = this1.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		b_b += Std.string(Std.string(this1[i]));
		if(i < len - 1) {
			b_b += sep == null ? "null" : "" + sep;
		}
	}
	return b_b;
};
haxe_ds_Vector.map = function(this1,f) {
	var length = this1.length;
	var r = new Array(length);
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		r[i] = f(this1[i]);
	}
	return r;
};
haxe_ds_Vector.sort = function(this1,f) {
	this1.sort(f);
};
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.PosException"] = haxe_exceptions_PosException;
haxe_exceptions_PosException.__name__ = "haxe.exceptions.PosException";
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	posInfos: null
	,toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
	,__class__: haxe_exceptions_PosException
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
	this.__skipStack++;
};
$hxClasses["haxe.exceptions.NotImplementedException"] = haxe_exceptions_NotImplementedException;
haxe_exceptions_NotImplementedException.__name__ = "haxe.exceptions.NotImplementedException";
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
	__class__: haxe_exceptions_NotImplementedException
});
var haxe_io_ArrayBufferView = {};
haxe_io_ArrayBufferView.__properties__ = {get_byteLength:"get_byteLength",get_byteOffset:"get_byteOffset",get_buffer:"get_buffer"};
haxe_io_ArrayBufferView._new = function(size) {
	return new Uint8Array(size);
};
haxe_io_ArrayBufferView.get_byteOffset = function(this1) {
	return this1.byteOffset;
};
haxe_io_ArrayBufferView.get_byteLength = function(this1) {
	return this1.byteLength;
};
haxe_io_ArrayBufferView.get_buffer = function(this1) {
	return haxe_io_Bytes.ofData(this1.buffer);
};
haxe_io_ArrayBufferView.sub = function(this1,begin,length) {
	return new Uint8Array(this1.buffer,begin,length == null ? this1.buffer.byteLength - begin : length);
};
haxe_io_ArrayBufferView.getData = function(this1) {
	return this1;
};
haxe_io_ArrayBufferView.fromData = function(a) {
	return a;
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofData = function(b) {
	var hb = b.hxBytes;
	if(hb != null) {
		return hb;
	}
	return new haxe_io_Bytes(b);
};
haxe_io_Bytes.ofHex = function(s) {
	if((s.length & 1) != 0) {
		throw haxe_Exception.thrown("Not a hex string (odd number of digits)");
	}
	var a = [];
	var i = 0;
	var len = s.length >> 1;
	while(i < len) {
		var high = s.charCodeAt(i * 2);
		var low = s.charCodeAt(i * 2 + 1);
		high = (high & 15) + ((high & 64) >> 6) * 9;
		low = (low & 15) + ((low & 64) >> 6) * 9;
		a.push((high << 4 | low) & 255);
		++i;
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.fastGet = function(b,pos) {
	return b.bytes[pos];
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,data: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,fill: function(pos,len,value) {
		var _g = 0;
		while(_g < len) {
			++_g;
			this.b[pos++] = value;
		}
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		return new haxe_io_Bytes(this.b.buffer.slice(pos + this.b.byteOffset,pos + this.b.byteOffset + len));
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var _g = 0;
		var _g1 = this.length < other.length ? this.length : other.length;
		while(_g < _g1) {
			var i = _g++;
			if(b1[i] != b2[i]) {
				return b1[i] - b2[i];
			}
		}
		return this.length - other.length;
	}
	,initData: function() {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
	}
	,getDouble: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat64(pos,true);
	}
	,getFloat: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getFloat32(pos,true);
	}
	,setDouble: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat64(pos,v,true);
	}
	,setFloat: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setFloat32(pos,v,true);
	}
	,getUInt16: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getUint16(pos,true);
	}
	,setUInt16: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setUint16(pos,v,true);
	}
	,getInt32: function(pos) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		return this.data.getInt32(pos,true);
	}
	,setInt32: function(pos,v) {
		if(this.data == null) {
			this.data = new DataView(this.b.buffer,this.b.byteOffset,this.b.byteLength);
		}
		this.data.setInt32(pos,v,true);
	}
	,getInt64: function(pos) {
		return new haxe__$Int64__$_$_$Int64(this.getInt32(pos + 4),this.getInt32(pos));
	}
	,setInt64: function(pos,v) {
		this.setInt32(pos,v.low);
		this.setInt32(pos + 4,v.high);
	}
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var code1 = (c & 31) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var u = (c & 15) << 18 | (b[i++] & 127) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	,readString: function(pos,len) {
		return this.getString(pos,len);
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,toHex: function() {
		var s_b = "";
		var chars = [];
		var str = "0123456789abcdef";
		var _g = 0;
		var _g1 = str.length;
		while(_g < _g1) chars.push(HxOverrides.cca(str,_g++));
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var c = this.b[_g++];
			s_b += String.fromCodePoint(chars[c >> 4]);
			s_b += String.fromCodePoint(chars[c & 15]);
		}
		return s_b;
	}
	,getData: function() {
		return this.b.bufferValue;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_BytesBuffer = function() {
	this.pos = 0;
	this.size = 0;
};
$hxClasses["haxe.io.BytesBuffer"] = haxe_io_BytesBuffer;
haxe_io_BytesBuffer.__name__ = "haxe.io.BytesBuffer";
haxe_io_BytesBuffer.prototype = {
	buffer: null
	,view: null
	,u8: null
	,pos: null
	,size: null
	,get_length: function() {
		return this.pos;
	}
	,addByte: function(byte) {
		if(this.pos == this.size) {
			this.grow(1);
		}
		this.view.setUint8(this.pos++,byte);
	}
	,add: function(src) {
		if(this.pos + src.length > this.size) {
			this.grow(src.length);
		}
		if(this.size == 0) {
			return;
		}
		this.u8.set(new Uint8Array(src.b.buffer,src.b.byteOffset,src.length),this.pos);
		this.pos += src.length;
	}
	,addString: function(v,encoding) {
		this.add(haxe_io_Bytes.ofString(v,encoding));
	}
	,addInt32: function(v) {
		if(this.pos + 4 > this.size) {
			this.grow(4);
		}
		this.view.setInt32(this.pos,v,true);
		this.pos += 4;
	}
	,addInt64: function(v) {
		if(this.pos + 8 > this.size) {
			this.grow(8);
		}
		this.view.setInt32(this.pos,v.low,true);
		this.view.setInt32(this.pos + 4,v.high,true);
		this.pos += 8;
	}
	,addFloat: function(v) {
		if(this.pos + 4 > this.size) {
			this.grow(4);
		}
		this.view.setFloat32(this.pos,v,true);
		this.pos += 4;
	}
	,addDouble: function(v) {
		if(this.pos + 8 > this.size) {
			this.grow(8);
		}
		this.view.setFloat64(this.pos,v,true);
		this.pos += 8;
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.pos + len > this.size) {
			this.grow(len);
		}
		if(this.size == 0) {
			return;
		}
		this.u8.set(new Uint8Array(src.b.buffer,src.b.byteOffset + pos,len),this.pos);
		this.pos += len;
	}
	,grow: function(delta) {
		var req = this.pos + delta;
		var nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		var nbuf = new ArrayBuffer(nsize);
		var nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	,getBytes: function() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		var b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
	,__class__: haxe_io_BytesBuffer
	,__properties__: {get_length:"get_length"}
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:"haxe.io.Encoding",__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
haxe_io_Encoding.__empty_constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe_io_Eof;
haxe_io_Eof.__name__ = "haxe.io.Eof";
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe_io_Eof
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:"haxe.io.Error",__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
haxe_io_Error.__empty_constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds];
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = "haxe.io.FPHelper";
haxe_io_FPHelper._i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var e = i >> 23 & 255;
	if(e == 255) {
		if((i & 8388607) == 0) {
			if(sign > 0) {
				return Infinity;
			} else {
				return -Infinity;
			}
		} else {
			return NaN;
		}
	}
	return sign * (e == 0 ? (i & 8388607) << 1 : i & 8388607 | 8388608) * Math.pow(2,e - 150);
};
haxe_io_FPHelper._i64ToDouble = function(lo,hi) {
	var sign = 1 - (hi >>> 31 << 1);
	var e = hi >> 20 & 2047;
	if(e == 2047) {
		if(lo == 0 && (hi & 1048575) == 0) {
			if(sign > 0) {
				return Infinity;
			} else {
				return -Infinity;
			}
		} else {
			return NaN;
		}
	}
	var m = 2.220446049250313e-16 * ((hi & 1048575) * 4294967296. + (lo >>> 31) * 2147483648. + (lo & 2147483647));
	if(e == 0) {
		m *= 2.0;
	} else {
		m += 1.0;
	}
	return sign * m * Math.pow(2,e - 1023);
};
haxe_io_FPHelper._floatToI32 = function(f) {
	if(f == 0) {
		return 0;
	}
	var af = f < 0 ? -f : f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp > 127) {
		return 2139095040;
	} else {
		if(exp <= -127) {
			exp = -127;
			af *= 7.1362384635298e+44;
		} else {
			af = (af / Math.pow(2,exp) - 1.0) * 8388608;
		}
		return (f < 0 ? -2147483648 : 0) | exp + 127 << 23 | Math.round(af);
	}
};
haxe_io_FPHelper._doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else if(!isFinite(v)) {
		i64.low = 0;
		i64.high = v > 0 ? 2146435072 : -1048576;
	} else {
		var av = v < 0 ? -v : v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		if(exp > 1023) {
			i64.low = -1;
			i64.high = 2146435071;
		} else {
			if(exp <= -1023) {
				exp = -1023;
				av /= 2.2250738585072014e-308;
			} else {
				av = av / Math.pow(2,exp) - 1.0;
			}
			var sig = Math.round(av * 4503599627370496.);
			i64.low = sig | 0;
			i64.high = (v < 0 ? -2147483648 : 0) | exp + 1023 << 20 | (sig / 4294967296.0 | 0);
		}
	}
	return i64;
};
haxe_io_FPHelper.i32ToFloat = function(i) {
	haxe_io_FPHelper.helper.setInt32(0,i,true);
	return haxe_io_FPHelper.helper.getFloat32(0,true);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	haxe_io_FPHelper.helper.setFloat32(0,f,true);
	return haxe_io_FPHelper.helper.getInt32(0,true);
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	haxe_io_FPHelper.helper.setInt32(0,low,true);
	haxe_io_FPHelper.helper.setInt32(4,high,true);
	return haxe_io_FPHelper.helper.getFloat64(0,true);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	haxe_io_FPHelper.helper.setFloat64(0,v,true);
	i64.low = haxe_io_FPHelper.helper.getInt32(0,true);
	i64.high = haxe_io_FPHelper.helper.getInt32(4,true);
	return i64;
};
var haxe_io_Input = function() { };
$hxClasses["haxe.io.Input"] = haxe_io_Input;
haxe_io_Input.__name__ = "haxe.io.Input";
haxe_io_Input.prototype = {
	bigEndian: null
	,readByte: function() {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		try {
			while(k > 0) {
				b[pos] = this.readByte();
				++pos;
				--k;
			}
		} catch( _g ) {
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return len - k;
	}
	,close: function() {
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readAll: function(bufsize) {
		if(bufsize == null) {
			bufsize = 16384;
		}
		var buf = new haxe_io_Bytes(new ArrayBuffer(bufsize));
		var total = new haxe_io_BytesBuffer();
		try {
			while(true) {
				var len = this.readBytes(buf,0,bufsize);
				if(len == 0) {
					throw haxe_Exception.thrown(haxe_io_Error.Blocked);
				}
				total.addBytes(buf,0,len);
			}
		} catch( _g ) {
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return total.getBytes();
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = new haxe_io_Bytes(new ArrayBuffer(nbytes));
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readUntil: function(end) {
		var buf = new haxe_io_BytesBuffer();
		var last;
		while(true) {
			last = this.readByte();
			if(!(last != end)) {
				break;
			}
			buf.addByte(last);
		}
		return buf.getBytes().toString();
	}
	,readLine: function() {
		var buf = new haxe_io_BytesBuffer();
		var last;
		var s;
		try {
			while(true) {
				last = this.readByte();
				if(!(last != 10)) {
					break;
				}
				buf.addByte(last);
			}
			s = buf.getBytes().toString();
			if(HxOverrides.cca(s,s.length - 1) == 13) {
				s = HxOverrides.substr(s,0,-1);
			}
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(((_g1) instanceof haxe_io_Eof)) {
				s = buf.getBytes().toString();
				if(s.length == 0) {
					throw haxe_Exception.thrown(_g1);
				}
			} else {
				throw _g;
			}
		}
		return s;
	}
	,readFloat: function() {
		return haxe_io_FPHelper.i32ToFloat(this.readInt32());
	}
	,readDouble: function() {
		var i1 = this.readInt32();
		var i2 = this.readInt32();
		if(this.bigEndian) {
			return haxe_io_FPHelper.i64ToDouble(i2,i1);
		} else {
			return haxe_io_FPHelper.i64ToDouble(i1,i2);
		}
	}
	,readInt8: function() {
		var n = this.readByte();
		if(n >= 128) {
			return n - 256;
		}
		return n;
	}
	,readInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var n = this.bigEndian ? ch2 | ch1 << 8 : ch1 | ch2 << 8;
		if((n & 32768) != 0) {
			return n - 65536;
		}
		return n;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) {
			return ch2 | ch1 << 8;
		} else {
			return ch1 | ch2 << 8;
		}
	}
	,readInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var n = this.bigEndian ? ch3 | ch2 << 8 | ch1 << 16 : ch1 | ch2 << 8 | ch3 << 16;
		if((n & 8388608) != 0) {
			return n - 16777216;
		}
		return n;
	}
	,readUInt24: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		if(this.bigEndian) {
			return ch3 | ch2 << 8 | ch1 << 16;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16;
		}
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) {
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
		}
	}
	,readString: function(len,encoding) {
		var b = new haxe_io_Bytes(new ArrayBuffer(len));
		this.readFullBytes(b,0,len);
		return b.getString(0,len,encoding);
	}
	,getDoubleSig: function(bytes) {
		return ((bytes[1] & 15) << 16 | bytes[2] << 8 | bytes[3]) * 4294967296. + (bytes[4] >> 7) * 2147483648 + ((bytes[4] & 127) << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7]);
	}
	,__class__: haxe_io_Input
	,__properties__: {set_bigEndian:"set_bigEndian"}
};
var haxe_io_Output = function() { };
$hxClasses["haxe.io.Output"] = haxe_io_Output;
haxe_io_Output.__name__ = "haxe.io.Output";
haxe_io_Output.prototype = {
	bigEndian: null
	,writeByte: function(c) {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Output.hx", lineNumber : 47, className : "haxe.io.Output", methodName : "writeByte"});
	}
	,writeBytes: function(s,pos,len) {
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		var b = s.b;
		var k = len;
		while(k > 0) {
			this.writeByte(b[pos]);
			++pos;
			--k;
		}
		return len;
	}
	,flush: function() {
	}
	,close: function() {
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,write: function(s) {
		var l = s.length;
		var p = 0;
		while(l > 0) {
			var k = this.writeBytes(s,p,l);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			l -= k;
		}
	}
	,writeFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.writeBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,writeFloat: function(x) {
		this.writeInt32(haxe_io_FPHelper.floatToI32(x));
	}
	,writeDouble: function(x) {
		var i64 = haxe_io_FPHelper.doubleToI64(x);
		if(this.bigEndian) {
			this.writeInt32(i64.high);
			this.writeInt32(i64.low);
		} else {
			this.writeInt32(i64.low);
			this.writeInt32(i64.high);
		}
	}
	,writeInt8: function(x) {
		if(x < -128 || x >= 128) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		this.writeByte(x & 255);
	}
	,writeInt16: function(x) {
		if(x < -32768 || x >= 32768) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		this.writeUInt16(x & 65535);
	}
	,writeUInt16: function(x) {
		if(x < 0 || x >= 65536) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		if(this.bigEndian) {
			this.writeByte(x >> 8);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8);
		}
	}
	,writeInt24: function(x) {
		if(x < -8388608 || x >= 8388608) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		this.writeUInt24(x & 16777215);
	}
	,writeUInt24: function(x) {
		if(x < 0 || x >= 16777216) {
			throw haxe_Exception.thrown(haxe_io_Error.Overflow);
		}
		if(this.bigEndian) {
			this.writeByte(x >> 16);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16);
		}
	}
	,writeInt32: function(x) {
		if(this.bigEndian) {
			this.writeByte(x >>> 24);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x & 255);
		} else {
			this.writeByte(x & 255);
			this.writeByte(x >> 8 & 255);
			this.writeByte(x >> 16 & 255);
			this.writeByte(x >>> 24);
		}
	}
	,prepare: function(nbytes) {
	}
	,writeInput: function(i,bufsize) {
		if(bufsize == null) {
			bufsize = 4096;
		}
		var buf = new haxe_io_Bytes(new ArrayBuffer(bufsize));
		try {
			while(true) {
				var len = i.readBytes(buf,0,bufsize);
				if(len == 0) {
					throw haxe_Exception.thrown(haxe_io_Error.Blocked);
				}
				var p = 0;
				while(len > 0) {
					var k = this.writeBytes(buf,p,len);
					if(k == 0) {
						throw haxe_Exception.thrown(haxe_io_Error.Blocked);
					}
					p += k;
					len -= k;
				}
			}
		} catch( _g ) {
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
	}
	,writeString: function(s,encoding) {
		var b = haxe_io_Bytes.ofString(s,encoding);
		this.writeFullBytes(b,0,b.length);
	}
	,__class__: haxe_io_Output
	,__properties__: {set_bigEndian:"set_bigEndian"}
};
var haxe_io_UInt8Array = {};
haxe_io_UInt8Array.__properties__ = {get_view:"get_view",get_length:"get_length"};
haxe_io_UInt8Array._new = function(elements) {
	return new Uint8Array(elements);
};
haxe_io_UInt8Array.get_length = function(this1) {
	return this1.length;
};
haxe_io_UInt8Array.get_view = function(this1) {
	return this1;
};
haxe_io_UInt8Array.get = function(this1,index) {
	return this1[index];
};
haxe_io_UInt8Array.set = function(this1,index,value) {
	return this1[index] = value;
};
haxe_io_UInt8Array.sub = function(this1,begin,length) {
	return this1.subarray(begin,length == null ? this1.length : begin + length);
};
haxe_io_UInt8Array.subarray = function(this1,begin,end) {
	return this1.subarray(begin,end);
};
haxe_io_UInt8Array.getData = function(this1) {
	return this1;
};
haxe_io_UInt8Array.fromData = function(d) {
	return d;
};
haxe_io_UInt8Array.fromArray = function(a,pos,length) {
	if(pos == null) {
		pos = 0;
	}
	if(length == null) {
		length = a.length - pos;
	}
	if(pos < 0 || length < 0 || pos + length > a.length) {
		throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
	}
	if(pos == 0 && length == a.length) {
		return new Uint8Array(a);
	}
	var i = new Uint8Array(a.length);
	var _g = 0;
	var _g1 = length;
	while(_g < _g1) {
		var idx = _g++;
		i[idx] = a[idx + pos];
	}
	return i;
};
haxe_io_UInt8Array.fromBytes = function(bytes,bytePos,length) {
	if(bytePos == null) {
		bytePos = 0;
	}
	if(length == null) {
		length = bytes.length - bytePos;
	}
	return new Uint8Array(bytes.b.bufferValue,bytePos,length);
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayIterator"] = haxe_iterators_ArrayIterator;
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_iterators_ArrayKeyValueIterator = function(array) {
	this.current = 0;
	this.array = array;
};
$hxClasses["haxe.iterators.ArrayKeyValueIterator"] = haxe_iterators_ArrayKeyValueIterator;
haxe_iterators_ArrayKeyValueIterator.__name__ = "haxe.iterators.ArrayKeyValueIterator";
haxe_iterators_ArrayKeyValueIterator.prototype = {
	current: null
	,array: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return { value : this.array[this.current], key : this.current++};
	}
	,__class__: haxe_iterators_ArrayKeyValueIterator
};
var haxe_iterators_DynamicAccessIterator = function(access) {
	this.access = access;
	this.keys = Reflect.fields(access);
	this.index = 0;
};
$hxClasses["haxe.iterators.DynamicAccessIterator"] = haxe_iterators_DynamicAccessIterator;
haxe_iterators_DynamicAccessIterator.__name__ = "haxe.iterators.DynamicAccessIterator";
haxe_iterators_DynamicAccessIterator.prototype = {
	access: null
	,keys: null
	,index: null
	,hasNext: function() {
		return this.index < this.keys.length;
	}
	,next: function() {
		return this.access[this.keys[this.index++]];
	}
	,__class__: haxe_iterators_DynamicAccessIterator
};
var haxe_iterators_DynamicAccessKeyValueIterator = function(access) {
	this.access = access;
	this.keys = Reflect.fields(access);
	this.index = 0;
};
$hxClasses["haxe.iterators.DynamicAccessKeyValueIterator"] = haxe_iterators_DynamicAccessKeyValueIterator;
haxe_iterators_DynamicAccessKeyValueIterator.__name__ = "haxe.iterators.DynamicAccessKeyValueIterator";
haxe_iterators_DynamicAccessKeyValueIterator.prototype = {
	access: null
	,keys: null
	,index: null
	,hasNext: function() {
		return this.index < this.keys.length;
	}
	,next: function() {
		var key = this.keys[this.index++];
		return { value : this.access[key], key : key};
	}
	,__class__: haxe_iterators_DynamicAccessKeyValueIterator
};
var haxe_iterators_RestIterator = function(args) {
	this.current = 0;
	this.args = args;
};
$hxClasses["haxe.iterators.RestIterator"] = haxe_iterators_RestIterator;
haxe_iterators_RestIterator.__name__ = "haxe.iterators.RestIterator";
haxe_iterators_RestIterator.prototype = {
	args: null
	,current: null
	,hasNext: function() {
		return this.current < this.args.length;
	}
	,next: function() {
		return this.args[this.current++];
	}
	,__class__: haxe_iterators_RestIterator
};
var haxe_iterators_RestKeyValueIterator = function(args) {
	this.current = 0;
	this.args = args;
};
$hxClasses["haxe.iterators.RestKeyValueIterator"] = haxe_iterators_RestKeyValueIterator;
haxe_iterators_RestKeyValueIterator.__name__ = "haxe.iterators.RestKeyValueIterator";
haxe_iterators_RestKeyValueIterator.prototype = {
	args: null
	,current: null
	,hasNext: function() {
		return this.current < this.args.length;
	}
	,next: function() {
		return { key : this.current, value : this.args[this.current++]};
	}
	,__class__: haxe_iterators_RestKeyValueIterator
};
var haxe_iterators_StringIterator = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringIterator"] = haxe_iterators_StringIterator;
haxe_iterators_StringIterator.__name__ = "haxe.iterators.StringIterator";
haxe_iterators_StringIterator.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		return this.s.charCodeAt(this.offset++);
	}
	,__class__: haxe_iterators_StringIterator
};
var haxe_iterators_StringIteratorUnicode = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringIteratorUnicode"] = haxe_iterators_StringIteratorUnicode;
haxe_iterators_StringIteratorUnicode.__name__ = "haxe.iterators.StringIteratorUnicode";
haxe_iterators_StringIteratorUnicode.unicodeIterator = function(s) {
	return new haxe_iterators_StringIteratorUnicode(s);
};
haxe_iterators_StringIteratorUnicode.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		var s = this.s;
		var index = this.offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			this.offset++;
		}
		return c1;
	}
	,__class__: haxe_iterators_StringIteratorUnicode
};
var haxe_iterators_StringKeyValueIterator = function(s) {
	this.offset = 0;
	this.s = s;
};
$hxClasses["haxe.iterators.StringKeyValueIterator"] = haxe_iterators_StringKeyValueIterator;
haxe_iterators_StringKeyValueIterator.__name__ = "haxe.iterators.StringKeyValueIterator";
haxe_iterators_StringKeyValueIterator.prototype = {
	offset: null
	,s: null
	,hasNext: function() {
		return this.offset < this.s.length;
	}
	,next: function() {
		return { key : this.offset, value : this.s.charCodeAt(this.offset++)};
	}
	,__class__: haxe_iterators_StringKeyValueIterator
};
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = "js.Boot";
js_Boot.isClass = function(o) {
	return o.__name__;
};
js_Boot.isInterface = function(o) {
	return o.__isInterface__;
};
js_Boot.isEnum = function(e) {
	return e.__ename__;
};
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	while(true) {
		if(cc == null) {
			return false;
		}
		if(cc == cl) {
			return true;
		}
		var intf = cc.__interfaces__;
		if(intf != null) {
			var _g = 0;
			var _g1 = intf.length;
			while(_g < _g1) {
				var i = intf[_g++];
				if(i == cl || js_Boot.__interfLoop(i,cl)) {
					return true;
				}
			}
		}
		cc = cc.__super__;
	}
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__implements = function(o,iface) {
	return js_Boot.__interfLoop(js_Boot.getClass(o),iface);
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__toStr = null;
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Lib = function() { };
$hxClasses["js.Lib"] = js_Lib;
js_Lib.__name__ = "js.Lib";
js_Lib.__properties__ = {get_undefined:"get_undefined"};
js_Lib.debug = function() {
	debugger;
};
js_Lib.alert = function(v) {
	alert(js_Boot.__string_rec(v,""));
};
js_Lib.eval = function(code) {
	return eval(code);
};
js_Lib.get_undefined = function() {
	return undefined;
};
js_Lib.rethrow = function() {
};
js_Lib.getOriginalException = function() {
	return null;
};
js_Lib.getNextHaxeUID = function() {
	return $global.$haxeUID++;
};
var js_lib__$ArrayBuffer_ArrayBufferCompat = function() { };
$hxClasses["js.lib._ArrayBuffer.ArrayBufferCompat"] = js_lib__$ArrayBuffer_ArrayBufferCompat;
js_lib__$ArrayBuffer_ArrayBufferCompat.__name__ = "js.lib._ArrayBuffer.ArrayBufferCompat";
js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null ? null : end - begin);
	var resultArray = new Uint8Array(u.byteLength);
	resultArray.set(u);
	return resultArray.buffer;
};
var js_lib_HaxeIterator = function(jsIterator) {
	this.jsIterator = jsIterator;
	this.lastStep = jsIterator.next();
};
$hxClasses["js.lib.HaxeIterator"] = js_lib_HaxeIterator;
js_lib_HaxeIterator.__name__ = "js.lib.HaxeIterator";
js_lib_HaxeIterator.iterator = function(jsIterator) {
	return new js_lib_HaxeIterator(jsIterator);
};
js_lib_HaxeIterator.prototype = {
	jsIterator: null
	,lastStep: null
	,hasNext: function() {
		return !this.lastStep.done;
	}
	,next: function() {
		var v = this.lastStep.value;
		this.lastStep = this.jsIterator.next();
		return v;
	}
	,__class__: js_lib_HaxeIterator
};
var js_lib_KeyValue = {};
js_lib_KeyValue.__properties__ = {get_value:"get_value",get_key:"get_key"};
js_lib_KeyValue.get_key = function(this1) {
	return this1[0];
};
js_lib_KeyValue.get_value = function(this1) {
	return this1[1];
};
var js_lib_ObjectEntry = {};
js_lib_ObjectEntry.__properties__ = {get_value:"get_value",get_key:"get_key"};
js_lib_ObjectEntry.get_key = function(this1) {
	return this1[0];
};
js_lib_ObjectEntry.get_value = function(this1) {
	return this1[1];
};
var js_lib_SetKeyValueIterator = function(set) {
	this.index = 0;
	this.set = set;
	this.values = new js_lib_HaxeIterator(set.values());
};
$hxClasses["js.lib.SetKeyValueIterator"] = js_lib_SetKeyValueIterator;
js_lib_SetKeyValueIterator.__name__ = "js.lib.SetKeyValueIterator";
js_lib_SetKeyValueIterator.prototype = {
	set: null
	,values: null
	,index: null
	,hasNext: function() {
		return !this.values.lastStep.done;
	}
	,next: function() {
		var tmp = this.index++;
		var _this = this.values;
		var v = _this.lastStep.value;
		_this.lastStep = _this.jsIterator.next();
		return { key : tmp, value : v};
	}
	,__class__: js_lib_SetKeyValueIterator
};
var js_node_Fs = require("fs");
var js_node_KeyValue = {};
js_node_KeyValue.__properties__ = {get_value:"get_value",get_key:"get_key"};
js_node_KeyValue.get_key = function(this1) {
	return this1[0];
};
js_node_KeyValue.get_value = function(this1) {
	return this1[1];
};
var js_node_events_EventEmitter = require("events").EventEmitter;
var js_node_Stream = require("stream");
var js_node_buffer_Buffer = require("buffer").Buffer;
var js_node_buffer__$Buffer_Helper = function() { };
$hxClasses["js.node.buffer._Buffer.Helper"] = js_node_buffer__$Buffer_Helper;
js_node_buffer__$Buffer_Helper.__name__ = "js.node.buffer._Buffer.Helper";
js_node_buffer__$Buffer_Helper.bytesOfBuffer = function(b) {
	var o = Object.create(haxe_io_Bytes.prototype);
	o.length = b.byteLength;
	o.b = b;
	b.bufferValue = b;
	b.hxBytes = o;
	b.bytes = b;
	return o;
};
var js_node_buffer__$Buffer_BufferModule = require("buffer");
var js_node_stream_Readable = require("stream").Readable;
var js_node_stream_Writable = require("stream").Writable;
var js_node_stream_WritableNewOptionsAdapter = {};
js_node_stream_WritableNewOptionsAdapter.from = function(options) {
	if(!Object.prototype.hasOwnProperty.call(options,"final")) {
		Object.defineProperty(options,"final",{ get : function() {
			return options.final_;
		}});
	}
	return options;
};
var safety_SafetyException = function(message,previous,native) {
	haxe_Exception.call(this,message,previous,native);
	this.__skipStack++;
};
$hxClasses["safety.SafetyException"] = safety_SafetyException;
safety_SafetyException.__name__ = "safety.SafetyException";
safety_SafetyException.__super__ = haxe_Exception;
safety_SafetyException.prototype = $extend(haxe_Exception.prototype,{
	__class__: safety_SafetyException
});
var safety_NullPointerException = function(message,previous,native) {
	safety_SafetyException.call(this,message,previous,native);
	this.__skipStack++;
};
$hxClasses["safety.NullPointerException"] = safety_NullPointerException;
safety_NullPointerException.__name__ = "safety.NullPointerException";
safety_NullPointerException.__super__ = safety_SafetyException;
safety_NullPointerException.prototype = $extend(safety_SafetyException.prototype,{
	__class__: safety_NullPointerException
});
var sys_io_File = function() { };
$hxClasses["sys.io.File"] = sys_io_File;
sys_io_File.__name__ = "sys.io.File";
sys_io_File.append = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return new sys_io_FileOutput(js_node_Fs.openSync(path,"a"));
};
sys_io_File.write = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return new sys_io_FileOutput(js_node_Fs.openSync(path,"w"));
};
sys_io_File.read = function(path,binary) {
	if(binary == null) {
		binary = true;
	}
	return new sys_io_FileInput(js_node_Fs.openSync(path,"r"));
};
sys_io_File.getContent = function(path) {
	return js_node_Fs.readFileSync(path,{ encoding : "utf8"});
};
sys_io_File.saveContent = function(path,content) {
	js_node_Fs.writeFileSync(path,content);
};
sys_io_File.getBytes = function(path) {
	return js_node_buffer__$Buffer_Helper.bytesOfBuffer(js_node_Fs.readFileSync(path));
};
sys_io_File.saveBytes = function(path,bytes) {
	var data = bytes.b;
	js_node_Fs.writeFileSync(path,js_node_buffer_Buffer.from(data.buffer,data.byteOffset,bytes.length));
};
sys_io_File.copy = function(srcPath,dstPath) {
	var src = js_node_Fs.openSync(srcPath,"r");
	var dst = js_node_Fs.openSync(dstPath,"w",js_node_Fs.fstatSync(src).mode);
	var bytesRead;
	var pos = 0;
	while(true) {
		bytesRead = js_node_Fs.readSync(src,sys_io_File.copyBuf,0,65536,pos);
		if(!(bytesRead > 0)) {
			break;
		}
		js_node_Fs.writeSync(dst,sys_io_File.copyBuf,0,bytesRead);
		pos += bytesRead;
	}
	js_node_Fs.closeSync(src);
	js_node_Fs.closeSync(dst);
};
var sys_io_FileInput = function(fd) {
	this.fd = fd;
	this.pos = 0;
};
$hxClasses["sys.io.FileInput"] = sys_io_FileInput;
sys_io_FileInput.__name__ = "sys.io.FileInput";
sys_io_FileInput.__super__ = haxe_io_Input;
sys_io_FileInput.prototype = $extend(haxe_io_Input.prototype,{
	fd: null
	,pos: null
	,readByte: function() {
		var buf = js_node_buffer_Buffer.alloc(1);
		var bytesRead;
		try {
			bytesRead = js_node_Fs.readSync(this.fd,buf,0,1,this.pos);
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(_g1.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(_g1));
			}
		}
		if(bytesRead == 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.pos++;
		return buf[0];
	}
	,readBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		var bytesRead;
		try {
			bytesRead = js_node_Fs.readSync(this.fd,buf,pos,len,this.pos);
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			if(_g1.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(_g1));
			}
		}
		if(bytesRead == 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.pos += bytesRead;
		return bytesRead;
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
	,seek: function(p,pos) {
		switch(pos._hx_index) {
		case 0:
			this.pos = p;
			break;
		case 1:
			this.pos += p;
			break;
		case 2:
			this.pos = js_node_Fs.fstatSync(this.fd).size + p;
			break;
		}
	}
	,tell: function() {
		return this.pos;
	}
	,eof: function() {
		return this.pos >= js_node_Fs.fstatSync(this.fd).size;
	}
	,__class__: sys_io_FileInput
});
var sys_io_FileOutput = function(fd) {
	this.fd = fd;
	this.pos = 0;
};
$hxClasses["sys.io.FileOutput"] = sys_io_FileOutput;
sys_io_FileOutput.__name__ = "sys.io.FileOutput";
sys_io_FileOutput.__super__ = haxe_io_Output;
sys_io_FileOutput.prototype = $extend(haxe_io_Output.prototype,{
	fd: null
	,pos: null
	,writeByte: function(b) {
		var buf = js_node_buffer_Buffer.alloc(1);
		buf[0] = b;
		js_node_Fs.writeSync(this.fd,buf,0,1,this.pos);
		this.pos++;
	}
	,writeBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		var wrote = js_node_Fs.writeSync(this.fd,buf,pos,len,this.pos);
		this.pos += wrote;
		return wrote;
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
	,seek: function(p,pos) {
		switch(pos._hx_index) {
		case 0:
			this.pos = p;
			break;
		case 1:
			this.pos += p;
			break;
		case 2:
			this.pos = js_node_Fs.fstatSync(this.fd).size + p;
			break;
		}
	}
	,tell: function() {
		return this.pos;
	}
	,__class__: sys_io_FileOutput
});
var sys_io_FileSeek = $hxEnums["sys.io.FileSeek"] = { __ename__:"sys.io.FileSeek",__constructs__:null
	,SeekBegin: {_hx_name:"SeekBegin",_hx_index:0,__enum__:"sys.io.FileSeek",toString:$estr}
	,SeekCur: {_hx_name:"SeekCur",_hx_index:1,__enum__:"sys.io.FileSeek",toString:$estr}
	,SeekEnd: {_hx_name:"SeekEnd",_hx_index:2,__enum__:"sys.io.FileSeek",toString:$estr}
};
sys_io_FileSeek.__constructs__ = [sys_io_FileSeek.SeekBegin,sys_io_FileSeek.SeekCur,sys_io_FileSeek.SeekEnd];
sys_io_FileSeek.__empty_constructs__ = [sys_io_FileSeek.SeekBegin,sys_io_FileSeek.SeekCur,sys_io_FileSeek.SeekEnd];
var systems_CommandBase = function(_universe) {
	ecs_System.call(this,_universe);
	this.commands = this.universe.families.get(0);
	this.table5d38588a6ddd880f90fc8234bccb893f = this.universe.components.getTable(1);
	this.tablefa61f37a15ee60bbc1601eb42174bd3d = this.universe.components.getTable(0);
};
$hxClasses["systems.CommandBase"] = systems_CommandBase;
systems_CommandBase.__name__ = "systems.CommandBase";
systems_CommandBase.__super__ = ecs_System;
systems_CommandBase.prototype = $extend(ecs_System.prototype,{
	update: function(_) {
		if(!Main.connected) {
			return;
		}
		var _this = this.commands;
		var _set = _this.entities;
		var _active = _this.isActive();
		var _g_idx = _set.size() - 1;
		while(_active && _g_idx >= 0) {
			var entity = _set.getDense(_g_idx--);
			var interaction = this.table5d38588a6ddd880f90fc8234bccb893f.get(entity);
			var command = this.tablefa61f37a15ee60bbc1601eb42174bd3d.get(entity);
			if(command.name == this.get_name()) {
				this.run(command,interaction);
				this.commands.remove(entity);
			}
		}
	}
	,run: null
	,get_name: null
	,err: function(err) {
		haxe_Log.trace(err,{ fileName : "src/systems/CommandBase.hx", lineNumber : 29, className : "systems.CommandBase", methodName : "err"});
	}
	,commands: null
	,table5d38588a6ddd880f90fc8234bccb893f: null
	,tablefa61f37a15ee60bbc1601eb42174bd3d: null
	,__class__: systems_CommandBase
	,__properties__: {get_name:"get_name"}
});
var systems_commands_Boop = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["systems.commands.Boop"] = systems_commands_Boop;
systems_commands_Boop.__name__ = "systems.commands.Boop";
systems_commands_Boop.__super__ = systems_CommandBase;
systems_commands_Boop.prototype = $extend(systems_CommandBase.prototype,{
	run: function(command,interaction) {
		var _g = command.content;
		if(_g._hx_index == 2) {
			interaction.reply("Boop! <@" + _g.user.id + ">");
		}
	}
	,get_name: function() {
		return "boop";
	}
	,__class__: systems_commands_Boop
});
var systems_commands_Hi = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["systems.commands.Hi"] = systems_commands_Hi;
systems_commands_Hi.__name__ = "systems.commands.Hi";
systems_commands_Hi.__super__ = systems_CommandBase;
systems_commands_Hi.prototype = $extend(systems_CommandBase.prototype,{
	run: function(command,interaction) {
		interaction.reply("Hey there");
	}
	,get_name: function() {
		return "hi";
	}
	,__class__: systems_commands_Hi
});
var systems_commands_ServerLink = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["systems.commands.ServerLink"] = systems_commands_ServerLink;
systems_commands_ServerLink.__name__ = "systems.commands.ServerLink";
systems_commands_ServerLink.__super__ = systems_CommandBase;
systems_commands_ServerLink.prototype = $extend(systems_CommandBase.prototype,{
	run: function(command,interaction) {
		interaction.reply("This is the server invite!\nhttps://discord.gg/t7pQqs47Aa");
	}
	,get_name: function() {
		return "serverlink";
	}
	,__class__: systems_commands_ServerLink
});
var systems_commands_Test = function(_universe) {
	systems_CommandBase.call(this,_universe);
};
$hxClasses["systems.commands.Test"] = systems_commands_Test;
systems_commands_Test.__name__ = "systems.commands.Test";
systems_commands_Test.__super__ = systems_CommandBase;
systems_commands_Test.prototype = $extend(systems_CommandBase.prototype,{
	run: function(command,interaction) {
		var _g = command.content;
		if(_g._hx_index == 1) {
			var _g1 = _g.data;
			switch(_g.category) {
			case 0:
				if(_g1 == null) {
					interaction.reply("No data");
				} else {
					interaction.reply("Hey you sent stuff: " + _g1);
				}
				break;
			case 1:
				interaction.reply("VIP member");
				break;
			default:
				interaction.reply("No category");
			}
		}
	}
	,get_name: function() {
		return "test";
	}
	,__class__: systems_commands_Test
});
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
$hxClasses["Math"] = Math;
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = $hxClasses["String"] = String;
String.__name__ = "String";
$hxClasses["Array"] = Array;
Array.__name__ = "Array";
Date.prototype.__class__ = $hxClasses["Date"] = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
if(ArrayBuffer.prototype.slice == null) {
	ArrayBuffer.prototype.slice = js_lib__$ArrayBuffer_ArrayBufferCompat.sliceImpl;
}
EReg.escapeRe = new RegExp("[.*+?^${}()|[\\]\\\\]","g");
Main.connected = false;
haxe_SysTools.winMetaCharacters = [32,40,41,37,33,94,34,60,62,38,124,10,13,44,59];
StringTools.winMetaCharacters = haxe_SysTools.winMetaCharacters;
StringTools.MIN_SURROGATE_CODE_POINT = 65536;
bits_BitsData.CELL_SIZE = 32;
ecs_Entity.none = ecs_Entity._new(-1);
ecs_ds_Unit.unit = ecs_ds_Unit._new();
haxe_Int32._mul = Math.imul != null ? Math.imul : function(a,b) {
	return a * (b & 65535) + (a * (b >>> 16) << 16 | 0) | 0;
};
haxe_io_FPHelper.i64tmp = new haxe__$Int64__$_$_$Int64(0,0);
haxe_io_FPHelper.LN2 = 0.6931471805599453;
haxe_io_FPHelper.helper = new DataView(new ArrayBuffer(8));
haxe_io_UInt8Array.BYTES_PER_ELEMENT = 1;
sys_io_File.copyBufLen = 65536;
sys_io_File.copyBuf = js_node_buffer_Buffer.alloc(65536);
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

//# sourceMappingURL=main.js.map