const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "sunucu-aktif",
    description: "Sunucu aktif verir.",
    options: [],
    
    async execute(client, interaction, config, db) {
      await interaction.deferReply();
      
      const { user, options, guild } = interaction;
      const serverip = config.server.ip
      const ts3ip = config.server.ts3ip
      const cfxtiklabaglanip = config.server.cfxtiklabaglanip
      const servername = config.server.servername
  

  if (!interaction.member.permissions.has("Administrator")) return interaction.followUp("Bu komutu kullanabilecek yetkiye sahip değilsin!");

  const row = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
					.setURL(cfxtiklabaglanip)
          .setEmoji("💠")
					.setLabel('Tıkla Bağlan')
					.setStyle(ButtonStyle.Link),
			);

  const embed = new EmbedBuilder()
      .setTitle("Sunucu Aktif!")
      .setDescription(`> **Sunucumuz şu anda AKTIF duruma geçmiştir.**

        **• Server:
        \`connect ${serverip}\` | [Tıkla Bağlan](${cfxtiklabaglanip})
        
        • TS3 IP:
        \`${ts3ip}\`**
        
        > **___Hepinize iyi roller dileriz!___**`)
      .setTimestamp()
      .setColor('#7FFF00')
      .setImage("https://cdn.discordapp.com/attachments/1047143056668901425/1085934413361188974/sunucu-aktif-iqo.gif")
      .setFooter({ text: `${servername} • ${user.tag} tarafından istendi.`, iconURL: `${user.displayAvatarURL()}` })
     
     return interaction.channel.send("@everyone"), await interaction.followUp({embeds: [embed], components: [row]})


  }
}