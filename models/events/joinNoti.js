module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "CatalizCS", //fixing ken gusler
  description: "Notify bot or group member with random gif/photo/video",
  dependencies: {
    "fs-extra": "",
    "path": "",
    "pidusage": ""
  }
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

  const path = join(__dirname, "cache", "joinGif","randomgif");
  if (existsSync(path)) mkdirSync(path, { recursive: true });	

  const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
  const { join } = global.nodemodule["path"];
  const { threadID } = event;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    const fs = require("fs");
    return api.sendMessage("", event.threadID, () => api.sendMessage({body:`আসসালামুআলাইকুম🥀
😈🥀😈
____________________________________
🤖
BOT CONNECTED!!! 
adding in the group chat successfully!!!
🙈 হায় বাবুরা সোহেল বট কে অ্যাড করা হলো শয়তানি করার জন্য এড দিছত তাই না 🐒
____________________________________\n\nযেকোনো কমান্ড দেখতে. help ব্যবহার করুন\n\n BOT ADMIN: JOY AHMED

____________________________________
আর যেকোনো অভিযোগ অথবা হেল্প এর জন্য আমার বস সোহেল কে নক করতে পারেন 
👉facebook link: https://www.facebook.com/mi.m.bhmdrm.me
-
`, attachment: fs.createReadStream(__dirname + "/JOY/sohel.jpg")} ,threadID));
  }
  else {
    try {
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);

      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      const path = join(__dirname, "cache", "joinGif");
      const pathGif = join(path, `${threadID}.gif`);

      var mentions = [], nameArray = [], memLength = [], i = 0;

      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id });
        memLength.push(participantIDs.length - i++);
      }
      memLength.sort((a, b) => a - b);

      (typeof threadData.customJoin == "undefined") ? msg = "▣✾⑅⃝ আসসালা❥᭄  আলাইকুমꕥ⑅⃝»̶̶͓͓̽̽̽\n                               •═<<❁✿ওঁয়েঁলঁকাঁমঁ✿❁>>═• \n\n                                  ⑅⃝»̶̶͓͓͓̽̽̽  [   {name} ] ꕥ⑅⃝»̶̶͓͓̽̽̽\n\n  {threadName}\n\n　　 ┊┊┊┊┊গ্রুপে ⑅⃝»̶̶͓͓͓̽̽̽»̶̶͓͓͓̽̽̽ \n\nআসার জন্য❥᭄আপনাকে অনেক ধন্যবাদ \n　 　 ┊┊┊┊💝  \n　　 ┊┊┊💝      \n　　 ┊┊💝            \n　　 ┊💝 ⑅⃝»̶̶͓͓͓̽̽̽»̶̶͓͓͓̽̽̽⑅⃝✺আশা করি❥᭄ গ্রুপে টাইম দিয়ে আমাদের গ্রুপটা এগিয়ে নেওয়ার জন্য সাহায্য করবেন_🥰\n\n   ♣♣👇♣♣\n♣♣C.E.O.♣♣\n⑅⃝»̶̶͓͓͓̽̽̽»̶̶͓͓͓̽̽̽๓𝐒𝐎𝐇𝐄𝐋 𝐑𝐀𝐍𝐀♥⃪⃝☬" : msg = threadData.customJoin;
      msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{type}/g, (memLength.length > 1) ?  'You' : 'Friend')
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);

      if (existsSync(path)) mkdirSync(path, { recursive: true });

      const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

      if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
      else if (randomPath.length != 0) {
        const pathRandom = join(__dirname, "cache", "joinGif", "randomgif",`${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
        formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
      }
      else formPush = { body: msg, mentions }

      return api.sendMessage(formPush, threadID);
    } catch (e) { return console.log(e) };
  }
}
