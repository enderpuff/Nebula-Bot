package systems.commands;

import discord_builder.BaseCommandInteraction;
import components.Command;

class ServerLink extends CommandBase {
	function run(command:Command, interaction:BaseCommandInteraction) {
		interaction.reply('This is the server invite!\nhttps://discord.gg/t7pQqs47Aa');
	}

	function get_name():String {
		return 'serverlink';
	}
}