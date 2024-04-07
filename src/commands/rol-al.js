const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    name:"rolal",
    description: 'Birinden Rol Alırsın!',
    type:1,
    options: [
        {
            name:"user",
            description:"Rolü alınacak kullanıcıyı seçin!",
            type:6,
            required:true
        },
        {
            name:"rol",
            description:"Lütfen bir rol etiketle!",
            type:8,
            required:true
        },
       
       
    ],

    async execute(client, interaction, config, db) {
        await interaction.deferReply();
        
        const { user, options, guild } = interaction;

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.followUp({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const rol = interaction.options.getRole('rol')
    const iqo = interaction.options.getMember('user')
    return interaction.guild.members.cache.get(iqo.id).roles.remove(rol), interaction.followUp({ embeds: [
        new EmbedBuilder().setThumbnail(iqo.displayAvatarURL()).setColor(0x2F3136).setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()} ` }).setDescription("Başarıyla <@"+iqo+"> Kullanıcısından <@&"+rol.id+"> Rolü Alındı.").setTimestamp().setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: `${interaction.user.displayAvatarURL()}` })
     ]})
}

};
