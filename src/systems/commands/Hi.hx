package systems.commands;

import discord_builder.BaseCommandInteraction;
import components.Command;

class Hi extends CommandBase {
	function run(command:Command, interaction:BaseCommandInteraction) {
		interaction.reply('Hey there');
	}

	function get_name():String {
		return 'hi';
	}
}