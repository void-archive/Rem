const { Command } = require('../../../core');

module.exports = class Cat extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            desc: 'Gets a random cat photograph.',
            usage: '{prefix}cat',
            category: 'Animals',
            examples: [
                'cat'
            ],
            aliases: [
                'kitty',
                'kitten'
            ]
        });
    }

    async execute(ctx) {
        try {
            const { body } = await this.client.snek
                .get('https://nekos.life/api/v2/img/meow');

            if (body.url === null) {
                return ctx.send({
                    description: `**${ctx.author.username}**: S-sorry, I c-couldn't fetch it...`,
                    color: ctx.client.utils.color
                });
            } else {
                return ctx.send({
                    title: "Click me if the image hasn't been cached.",
                    description: `**${ctx.author.username}**: Here is y-your cat as r-requested:`,
                    url: body.url,
                    image: {
                        url: body.url
                    },
                    footer: {
                        icon_url: ctx.author.avatarURL,
                        text: `Powered by nekos.life | Triggered by ${ctx.author.username}~`
                    },
                    color: ctx.client.utils.color
                });
            }
        } catch(err) {
            ctx.send({
                description: [
                    'Sorry, an error has occured while fetching it:',
                    `\`${err.title}: ${err.message}\``,
                    'Try again later~'
                ].join('\n'),
                color: ctx.client.utils.color
            });
        }
    }
};