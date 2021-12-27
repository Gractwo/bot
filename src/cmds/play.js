module.exports = {
    name: 'play',
    execute(cl, msg, args) {
        const ytdl = require('ytdl-core');
        const ytsr = require('ytsr');
        const path = require('path');
        const discord = require('discord.js');
        const fs = require('fs')
        const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
        let connection;
        let aplay;
        let queue;

        async function link(msg) {
            let request = msg.content.slice(path.basename(__filename).length + cl.cfg.prefix.length - 3);
            if (request.trim() == "") {
                msg.reply("Dej link albo tagi albo weź i spierdalaj");
            } else if (request.trim().startsWith("https")) {
                request = request.trim()
                if (ytdl.validateURL(request)) {
                    msg.reply("Poprawny link");
                    link = './sound/' + msg.member.voice.channel.id + '.mp3'
                    await ytdl(request).pipe(fs.createWriteStream(link));
                    return link;
                } else {
                    msg.reply("Kurwo wenecka daj prawdziwy link a nie jaja sobie robisz");
                }
            } else {
                msg.reply("Szukasz:" + request);

            }
        }
        if (!connection) {
            let vChannel = msg.member.voice.channel;
            connection = joinVoiceChannel({
                channelId: vChannel.id,
                guildId: vChannel.guild.id,
                adapterCreator: vChannel.guild.voiceAdapterCreator,
            })
        }
        aplay = createAudioPlayer();
        let song = createAudioResource(link(msg));
        aplay.play(song);
        connection.subscribe(aplay);
        aplay.on('error', error => {
            console.error(error);
        });
    }
}