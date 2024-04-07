const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    name:"whitelist-al",
    description: 'Kullanıcıdan Whitelist rolünü alırsın!',
    type:1,
    options: [
        {
            name:"user",
            description:"Whitelist alınacak kullanıcıyı seçin!",
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
        const unwlisim = config.unwlisim
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)&& !interaction.member.roles.cache.has(yetkili)) return interaction.followUp({content: "Bu komutu kullanabilecek yetkiye sahip değilsin!", ephemeral: true})

    const kullanıcı = interaction.options.getMember('user')

    return kullanıcı.roles.remove(wl),
    kullanıcı.roles.remove(wl),
    kullanıcı.roles.add(unwl),
    kullanıcı.roles.add(unwl),
    kullanıcı.setNickname(unwlisim),
    interaction.followUp({ embeds: [
        new EmbedBuilder().setThumbnail(kullanıcı.displayAvatarURL()).setColor(0x2F3136).setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()} ` }).setDescription(`Başarıyla ${kullanıcı} Kullanıcısından Whitelist Rolünü Aldım.`).setTimestamp().setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: `${interaction.user.displayAvatarURL()}` })
     ]})
}}