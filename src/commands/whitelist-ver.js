const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    name:"whitelist-ver",
    description: 'Kullanıcıya Whitelist rolü verirsin!',
    type:1,
    options: [
        {
            name:"user",
            description:"Whitelist verilecek kullanıcıyı seçin!",
            type:6,
            required:true
        },
    ],

    async execute(client, interaction, config, db) {
        await interaction.deferReply();
        
        const { user, options, guild } = interaction;
        const yetkili = config.yetkili
        const wl = config.wl
        const unwl = config.unwl
        const wlisim = config.wlisim
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)&& !interaction.member.roles.cache.has(yetkili)) return interaction.followUp({content: "Bu komutu kullanabilecek yetkiye sahip değilsin!", ephemeral: true})

    const kullanıcı = interaction.options.getMember('user')

    return kullanıcı.roles.remove(unwl),
    kullanıcı.roles.remove(unwl),
    kullanıcı.roles.add(wl),
    kullanıcı.roles.add(wl),
    kullanıcı.setNickname(wlisim),
    interaction.followUp({ embeds: [
        new EmbedBuilder().setThumbnail(kullanıcı.displayAvatarURL()).setColor(0x2F3136).setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()} ` }).setDescription(`Başarıyla ${kullanıcı} Kullanıcısına Whitelist Rolü Verdim.`).setTimestamp().setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: `${interaction.user.displayAvatarURL()}` })
     ]})
}}