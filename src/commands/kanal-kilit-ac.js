const Discord = require('discord.js')
const { PermissionsBitField } = Discord

module.exports = {
    slash: true,
    name: "kanal-kilit-aç",
    description: 'Kilitlediğiniz Kanalı Kullanıma Tekrar Açın',
    option: [
        {
            name: 'kanal',
            description: 'Kilidini Açmak İstediğin Kanalı Seç',
            type: 'channel',
            require: false
        }
    ],
    async execute(client, interaction, config) {
        const yetkili = config.yetkili
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels) && !interaction.member.roles.cache.has(yetkili)) return interaction.followUp({content: "Bu komutu kullanabilecek yetkiye sahip değilsin!", ephemeral: true})

        const channel = interaction.options.getChannel('kanal') || interaction.channel

        let everyone = interaction.guild.roles.cache.find(a => a.name === '@everyone')
        channel.permissionOverwrites.edit(everyone, { 'SendMessages': true }, interaction.user.tag + ' Tarafından Açıldı');

        const başarılı = new Discord.EmbedBuilder()
        .setDescription(`
        ✅ Kanalın Kilidi **Açıldı**
        
        ${channel} Kanalı <@${interaction.user.id}> Tarafından Açıldı`)
        .setColor('Green')
        await interaction.reply({ embeds: [başarılı] })
   
    }
}