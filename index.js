const { Client, GatewayIntentBits, Partials, EmbedBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
const db = require("croxydb");

const config = require("./config.json");


const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");

const client = new Client({
  intents: 32769,
  partials: Object.values(Partials),
  allowedMentions: {
    parse: ["users", "roles", "everyone"]
  },
  retyLimit: 3
});

global.client = client;
client.commands = (global.commands = []);


/*                         SLASH COMMANDS                               */

console.log(`[-] ${fs.readdirSync("./src/commands").length} komut algılandı.`)

for(let commandName of fs.readdirSync("./src/commands")) {
	if(!commandName.endsWith(".js")) break;

	const command = require(`./src/commands/${commandName}`);	
	client.commands.push({
		name: command.name.toLowerCase(),
		description: command.description,
		options: command.options,
		dm_permission: false,
		type: 1
	});

	console.log(`[+] ${commandName} komutu başarıyla yüklendi.`)
}

/*                         EVENTS                                    */

console.log(`[-] ${fs.readdirSync("./src/events").length} olay algılandı.`)

for(let eventName of fs.readdirSync("./src/events")) {
	if(!eventName.endsWith(".js")) break;

	const event = require(`./src/events/${eventName}`);	
  
  if(event.once) {
     client.once(event.name, (...args) => {
		  event.execute(client, config, ...args)
	  }); 
  } else {
    client.on(event.name, (...args) => {
		  event.execute(client, config, ...args)
	  }); 
  }

	console.log(`[+] ${eventName} olayı başarıyla yüklendi.`)
}



/*                     LOADING SLASH COMMANDS                     */

client.once("ready", async() => {
	const rest = new REST({ version: "10" }).setToken(config.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    throw error;
  }
});

client.login(config.token).then(() => {
	console.log(`[-] Discord API'ye istek gönderiliyor.`);
	eval("console.clear()")
}).catch(() => {
	console.log(`[x] Discord API'ye istek gönderimi başarısız.`);
});

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception: " + err);
});
  
process.on("unhandledRejection", (reason, promise) => {
    console.log("[DİKKAT] Kırmızı Alarm!, Şurada kritik bir hata var:", promise, " Açıklama: ", reason.message);
});

const { joinVoiceChannel } = require('@discordjs/voice');
const botungirecegises = config.botungirecegises
const sunucid = config.sunucid
global.client.on('ready', () => { 
joinVoiceChannel({
channelId: botungirecegises,
guildId: sunucid,       
adapterCreator: global.client.guilds.cache.get(sunucid).voiceAdapterCreator
    });
});

client.on("interactionCreate", async interaction => {
if (interaction.customId == "iqomulakat") {
  const iqologChannel = await interaction.guild.channels.cache.get(config.butonlumulakatlogkanalid);
      
      const embed2 = new EmbedBuilder()
      .setColor(config.color || 0x2F3136)
      .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()} ` })
      .setDescription(`**__KALK KALK KALK!!!__\n\n<@${interaction.user.id}> | \`${interaction.user.username}\` | \`${interaction.user.id}\`;\nkayıt bekliyor!\n\n_Müsait bir yetkilini ilgilenebilir._**`)
      .setTimestamp()
      .setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: `${interaction.user.displayAvatarURL({dynamic : true})} ` })


      const iqoembed = new EmbedBuilder()
      .setColor(config.color || 0x2F3136)
      .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()} ` })
      .setDescription(`**Merhaba <@${interaction.user.id}>\nGerekli kişilere bildirim gönderdim.\n__Mülakat Bekleme odasında bekleyin lütfen!__**`)

      interaction.reply({ embeds: [iqoembed], ephemeral: true })
      iqologChannel.send({ embeds: [embed2], content: `<@&${config.yetkili}>` })
    }})