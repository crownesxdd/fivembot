const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "kayıt",
    description: "Yetkililere haber verir.",
    options: [],
    
    async execute(client, interaction, config, db) {
      await interaction.deferReply();
      
      const { user, options, guild } = interaction;
      const yetkili = config.yetkili
      const servername = config.server.servername
      const teyitses = config.teyitses
  const embed = new EmbedBuilder()
      .setTitle("Kayıt Çağrısı!")
      .setDescription(`• **Yetkililere haber verildi <#${teyitses}> kanalına giriş yapabilirsin.**\n\n\`🫶 Otur yorulma hocam.\``)
      .setTimestamp()
      .setColor('#7FFF00')
      .setImage("https://cdn.discordapp.com/attachments/1047143056668901425/1086684536110321725/63b858-StarHome.png")
      .setFooter({ text: `${servername} • ${user.tag} tarafından istendi.`, iconURL: `${user.displayAvatarURL()} ` })
     
     return interaction.channel.send(`<@&${yetkili}>`), interaction.followUp({ content: `${interaction.member}`, embeds: [embed]})


  }
}