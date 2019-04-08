'use strict';

const Command = require('../structures/Command');
const LavalinkFunctions = require('../utils/helpers/lavalink');

class Leave extends Command {
    constructor() {
        super();
        this.help = {
            name: 'leave',
            description: 'Sortir le bot du salon vocal',
            category: 'Music',
            usage: 'leave',
            aliases: []
        };
    }

    // eslint-disable-next-line no-unused-vars
    async run(client, message, _args) {
        let queue = LavalinkFunctions.getCurrentQueue(client.config.LAVALINK.QUEUES, message.guild.id);
        if (!client.player.get(message.guild.id)) { return message.channel.send('❌ Le bot n\'est actuellement pas connecté dans un salon vocal.'); }
        if (queue.length > 0) { queue.splice(0, queue.length); }
            try {
                await client.player.leave(message.guild.id);
                return message.channel.send('Le bot a bien quitté le salon vocal. 👌');
            } catch (exception) {
                if (exception) { return message.channel.send('❌ Une erreur est survenue, nous sommes désolé. Essayez plus tard.\n```JS\n' + exception.message + '```'); }
            }
    }
}

module.exports = Leave;
