const Discord = require('discord.js')
const { PermissionsBitField } = Discord

module.exports = {
    slash: true,
    name: "kanal-kilit",
    description: 'Kanalı Kullanıcıların Mesaj Yazamayacak Hale Getirin',
    type:1,
    option: [
        {
            name: 'kanal',
            description: 'Kilitlemek İstediğin Kanalı Seç',
            type: 'channel',
            require: false
        }
    ],
    
    async execute(client, interaction, config) {
        const yetkili = config.yetkili
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels) && !interaction.member.roles.cache.has(yetkili)) return interaction.followUp({content: "Bu komutu kullanabilecek yetkiye sahip değilsin!", ephemeral: true})

        const channel = interaction.options.getChannel('kanal') || interaction.channel

        let everyone = interaction.guild.roles.cache.find(a => a.name === '@everyone')
        channel.permissionOverwrites.edit(everyone, { 'SendMessages': false }, interaction.user.tag + ' Tarafından Kilitlendi');

        const başarılı = new Discord.EmbedBuilder()
        .setDescription(`
        ✅ Kanal **Kilitlendi**
        
        ${channel} Kanalı <@${interaction.user.id}> Tarafından Kilitlendi`)
        .setColor('Green')
        await interaction.reply({ embeds: [başarılı] })
   
    }
}