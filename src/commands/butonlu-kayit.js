const { ActionRowBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "butonlu",
  description: "Butonlu kayıt sistemini oluşturur.",
  options: [
    {
      type: 1,
      name: "kayıt",
      description: "Butonlu, bildirimli kayıt sistemini oluşturur."
    }
  ],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    
    if(interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {

    const row = new ActionRowBuilder()
			.addComponents(
        new ButtonBuilder()
					.setCustomId('iqomulakat')
          .setEmoji("💠")
					.setLabel('Mülakat Beklemedeyim')
					.setStyle(ButtonStyle.Primary),
			);

    const embed = new EmbedBuilder()
      .setColor(config.color || 0x2F3136)
      .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL()} ` })
      .setDescription(`**Selamlar, Hoşgeldin :3 💓\n\nKayıt hakkında bilgi:**\nKayıt şartlarımız:\n+${config.sunucusartlari.minimumfivemsaat} Saat ve +${config.sunucusartlari.minimumyas} Yaş (insiyatif gösterilebilir.)\n\n**Aşağıda bulunan butondan yetkililere haber gönderebilirsin!**`)
      .setTimestamp()
      .setFooter({ text: `${guild.name} Kayıt Sistemi | ${user.tag} tarafından oluşturuldu.`, iconURL: `${user.displayAvatarURL()} ` })
      
    interaction.followUp({ embeds: [embed], components: [row] })
  } else {
    return interaction.followUp({ embeds: [
      new EmbedBuilder().setColor(0x2F3136).setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()} ` }).setDescription("<:carpi:1040649840394260510> **|** Bu komut sadece `Üyeleri Yasakla` yetkisine sahip kullanıclarına özel kullanımdadır.")
   ] }) 
  }
}}