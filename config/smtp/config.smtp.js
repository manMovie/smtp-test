const SMTPServer = require("smtp-server").SMTPServer;
const simpleParser = require("mailparser").simpleParser;

const server = new SMTPServer({
    allowInsecureAuth:true,
    authOptional:true,
  onConnect(session, cb) {
    console.log("SMTP server connected - Session ID:", session.id);
    cb();
  },

  onMailFrom(address, session, cb) {
    console.log("MAIL FROM:", address.address, "- Session ID:", session.id);
    cb();
  },

  onRcptTo(address, session, cb) {
    console.log("RCPT TO:", address.address, "- Session ID:", session.id);
    cb();
  },

  onData(stream, session, cb) {
    let mailStream = "";

    stream.on("data", (data) => {
      mailStream += data.toString();
    });

    stream.on("end", async () => {
      try {
        // Parse the email using mailparser
        const message = await simpleParser(mailStream);
        console.log("Parsed Email:", {
          from: message.from,
          to: message.to,
          subject: message.subject,
          text: message.text,
          html: message.html,
        });
        cb();
      } catch (error) {
        console.error("Error parsing email:", error);
        cb(new Error("Failed to process email")); // Reject the email
      }
    });
  },

  onError(err) {
    console.error("SMTP Server Error:", err);
  },
});

module.exports = { smtpServer: server };
