const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const db = require('croxydb');
const moment = require("moment");
const limit = new Map();
moment.locale("tr");
module.exports = {
    name:"kullanıcı-bilgi",
    description: 'Kullanıcı Hakkında Bilgi Alırsın',
    type:1,
    options: [
        {
            name:"user",
            description:"Kullanıcıyı seçin!",
            type:6,
            required:false
        },
    ],

async execute(client, interaction, iqo_embed) {
const member = interaction.options.getMember('user') || interaction.member;
  interaction.reply({ embeds: [new EmbedBuilder().setColor("#0000ff").setDescription(`**
• Kullanıcı: (<@${member.id}> - \`${member.id}\`) (${member.roles.highest})
• Hesap Kurulum Tarihi: <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)
• Sunucuya Katılma Tarihi: <t:${Math.floor(member.joinedAt / 1000)}> (<t:${Math.floor(member.joinedAt / 1000)}:R>)
• Rolleri: ${(member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Üzerinde Hiç Rol Bulunmamakta!')}
• Avatar: [Tıkla](${member.user.avatarURL({dynamic:true})})**
`).setThumbnail(member.user.avatarURL({dynamic:true})).setTitle(`${member.user.tag} Kullanıcı Bilgileri`).setImage(interaction.guild.bannerURL({dynamic:true,size: 4096})).setURL(`https://linktr.ee/luixsa`)] });

    }
}