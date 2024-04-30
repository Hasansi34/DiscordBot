exports.run = (client, message, args) => {
  let toSay = args.join(" ")
  if(!toSay) return message.channel.send({content: "You need say a word dummy😑"})
  message.channel.send({content: toSay})
}