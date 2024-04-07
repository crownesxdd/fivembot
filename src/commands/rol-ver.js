const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    name:"rolver",
    description: 'Birine Rol Verirsin!',
    type:1,
    options: [
        {
            name:"user",
            description:"Rol verilicek kullanıcıyı seçin!",
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
    return interaction.guild.members.cache.get(iqo.id).roles.add(rol), interaction.followUp({ embeds: [
        new EmbedBuilder().setThumbnail(iqo.displayAvatarURL()).setColor(0x2F3136).setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()} ` }).setDescription("Başarıyla <@"+iqo+"> Kullanıcısına <@&"+rol.id+"> Rolü Verildi.").setTimestamp().setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: `${interaction.user.displayAvatarURL()}` })
     ]})
}

};
