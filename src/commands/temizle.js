const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"sil",
    description: 'Sohbette istediğin kadar mesajı silersin!',
    type:1,
    options: [
        {
            name:"sayı",
            description:"Temizlencek Mesaj Sayısını Girin.",
            type:3,
            required:true
        },
       
    ],
    async execute(client, interaction, config) {
    await interaction.deferReply();

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.followUp({content: "Mesajları Yönet Yetkin Yok!", ephemeral: true})
    const sayi = interaction.options.getString('sayı')
    interaction.channel.bulkDelete(sayi),
    await interaction.followUp({content: `**⌛ Mesajlar siliniyor...**`})
     await interaction.followUp({content: `${interaction.user}`, embeds: [
        new EmbedBuilder().setColor("#008000").setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({dynamic:true,size: 4096})} ` }).setDescription(`**🚀 Başarıyla \`${sayi}\` adet mesajı sildim.**`).setTimestamp().setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: `${interaction.user.displayAvatarURL()}` })
     ]})
}

};