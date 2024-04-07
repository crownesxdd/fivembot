const Discord = require("discord.js");

module.exports = {
    name: "say",
    description: "Discord sunucusu hakkında bilgi verir.",
    options: [],

    async execute(client, interaction, config, db) {
        await interaction.deferReply();

  const voiceChannels = interaction.guild.channels.cache.filter(c => c.type === "GUILD_VOICE");
  let count = 0;

  const wl = config.server.wl
  const unwl = config.server.unwl

  for (const [id, voiceChannel] of voiceChannels)
  count += voiceChannel.members.size;
  const embed = new Discord.EmbedBuilder()
  .setColor("#000000")
  .setDescription(
    `**Ses kanallarında \`${count}\` kişi bulunmaktadır!**
    \n**Sunucuda \`${interaction.guild.memberCount}\` kişi bulunmaktadır!**
    \n**Sunucudaki Online (İnsan)Sayısı:** \`${interaction.guild.members.cache.filter(x => x.user.presence?.status === 'online').size}\`
    \n**Sunucudaki DND (İnsan)Sayısı:** \`${interaction.guild.members.cache.filter(x => x.user.presence?.status === 'dnd').size}\`
    \n**Sunucudaki Idle (İnsan)Sayısı:** \`${interaction.guild.members.cache.filter(x => x.user.presence?.status === 'idle').size}\`
    \n**Sunucudaki Offline Sayısı:** \`${interaction.guild.members.cache.filter(x => x.user.presence?.status === 'offline').size}\`
    \n**Sunucudaki Bot Sayısı:** \`${interaction.guild.members.cache.filter(m => m.user.bot).size}\``) 
    .setThumbnail(interaction.guild.iconURL())
    .setTimestamp()
    .setFooter({ text: `${interaction.guild.name} • ${interaction.user.tag} tarafından istendi.`, iconURL: `${interaction.user.displayAvatarURL({dynamic : true})}` });
    return interaction.followUp({embeds:  [embed]});

}}