package systems;

import components.Command;
import discord_builder.BaseCommandInteraction;
import ecs.System;

abstract class CommandBase extends System {
	@:fastFamily var commands:{command:Command, interaction:BaseCommandInteraction};

	override function update(_) {
		if (!Main.connected) {
			return;
		}
		iterate(commands, entity -> {
			if (command.name == this.name) {
				this.run(command, interaction);
				this.commands.remove(entity);
			}
		});
	}

	abstract function run(command:Command, interaction:BaseCommandInteraction):Void;

	var name(get, never):String;

	abstract function get_name():String;

	inline function err(err) {
		trace(err);
	}
}

