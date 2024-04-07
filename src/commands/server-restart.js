const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "sunucu-restart",
    description: "Sunucu restart verir.",
    options: [],
    
    async execute(client, interaction, config, db) {
      await interaction.deferReply();
      
      const { user, options, guild } = interaction;
      const serverip = config.server.ip
      const ts3ip = config.server.ts3ip
      const cfxtiklabaglanip = config.server.cfxtiklabaglanip
      const servername = config.server.servername
  

  if (!interaction.member.permissions.has("Administrator")) return interaction.followUp("Bu komutu kullanabilecek yetkiye sahip değilsin!");
  const embed = new EmbedBuilder()
      .setTitle("Sunucu Yeniden Başlatılıyor!")
      .setDescription(`> **Sunucumuz şu anda RESTART durumuna geçmiştir.**

      **• Server:
        \`connect ${serverip}\` | [Tıkla Bağlan](${cfxtiklabaglanip})
        
        • TS3 IP:
        \`${ts3ip}\`**
        
        > **___En yakın zamanda aktif verilecektir!___**`)
      .setTimestamp()
      .setColor('#0000ff')
      .setImage("https://cdn.discordapp.com/attachments/1047143056668901425/1085934771160490014/sunucu-restart-iqo.gif")
      .setFooter({ text: `${servername} • ${user.tag} tarafından istendi.`, iconURL: `${user.displayAvatarURL()} ` })
     
      return interaction.channel.send("@everyone"), await interaction.followUp({embeds: [embed]})


  }
}