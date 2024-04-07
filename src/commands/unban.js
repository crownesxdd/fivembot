const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "unban",
  description: "Etiketlenen kullanıcının uzaklaştırmasını kaldırır.",
  options: [
    {
      type: 3,
      name: "kullanıcı-id",
      description: "Uzaklaştırmasını kaldırmak istediğin kullanıcının id'si?",
      required: true
    }
  ],
  
  async execute(client, interaction, config, db) {
    await interaction.deferReply();
    
    const { user, options, guild } = interaction;
    
    const member = interaction.options.getString("kullanıcı-id");
    
    if(interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      
      const embed = new EmbedBuilder()
        .setColor(0x2F3136)
        .setAuthor({ name: `Bir kullanıcının banı açıldı.`, iconURL: `${guild.iconURL()} ` })
        .addFields([
          {
            name: "Banı Açılan:",
            value: "```"+member+"```",
            inline: true
          },
          {
            name: "Açan:",
            value: "```"+user.tag+"```",
            inline: true
          },
        ])
        .setTimestamp()
        .setFooter({ text: `${user.tag} tarafından banı açıldı.`, iconURL: `${user.displayAvatarURL()} ` })
      
      guild.members.unban(member);
      return interaction.followUp({ content: "<@"+member+">",embeds: [embed] })
      
    } else {
      return interaction.followUp({ embeds: [
        new EmbedBuilder().setColor(0x2F3136).setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()} ` }).setDescription("<:carpi:1040649840394260510> **|** Bu komut sadece `Üyeleri Yasakla` yetkisine sahip kullanıclarına özel kullanımdadır.")
     ] }) 
    }
  }
}