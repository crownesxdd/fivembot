const {Discord, PermissionsBitField, EmbedBuilder} = require('discord.js');

module.exports = {
    name: "isim",
    description: "Etiketlenen kullanıcının adını değiştirir.",
    options: [
      {
        type: 6,
        name: "kullanıcı",
        description: "Hangi kullanıcının adını değiştirmek istiyorsun?",
        required: true
      },
      {
        type: 3,
        name: "isim",
        description: "İsim giriniz.",
        required: false
      }
    ],

async execute(client, interaction, config) {
  await interaction.deferReply();
  const { user, options, guild } = interaction;

    if(interaction.member.permissions.has(PermissionsBitField.Flags.MANAGE_NICKNAMES)) {

        const kisi = options.getMember("kullanıcı");
        const iqoname = options.getString("isim") || ' ';

kisi.setNickname(iqoname)

interaction.followUp({ embeds: [
  new EmbedBuilder().setThumbnail(kisi.displayAvatarURL()).setColor(0x2F3136).setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()} ` }).setDescription("Başarıyla <@"+kisi+"> Kullanıcısının Adı \`"+iqoname+"\` Olarak Değiştirildi.").setTimestamp().setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: `${interaction.user.displayAvatarURL()}` })
]})

} else {
    return interaction.followUp({ embeds: [
      new EmbedBuilder().setColor(0x2F3136).setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()} ` }).setDescription("<:carpi:1040649840394260510> **|** Bu komut sadece `İsimleri Yönet` yetkisine sahip kullanıclarına özel kullanımdadır.")
   ] })}}}
