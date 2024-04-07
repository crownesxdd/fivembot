const { Events, Discord } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  
  async execute(client, config) {
    console.log(`${client.user.tag} HAZIR.`)
      

      client.user.setPresence({ activities: [{ name: `${config.server.servername}` }], status: "dnd"});
    }
  }