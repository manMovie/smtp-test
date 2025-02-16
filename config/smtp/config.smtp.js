const SMTPServer = require("smtp-server").SMTPServer;
const { simpleParser } = require("mailparser");
const MAIL = require("../../model/mails.models");
const EMAIL = require("../../model/email.model");

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  
  // Called when a client connects
  onConnect(session, callback) {
    console.log("SMTP server connected - Session ID:", session.id);
    callback();
  },

  // Called for the MAIL FROM command
  onMailFrom(address, session, callback) {
    console.log("MAIL FROM:", address.address, "- Session ID:", session.id);
    callback();
  },

  // Called for the RCPT TO command
  onRcptTo(address, session, callback) {
    console.log("RCPT TO:", address.address, "- Session ID:", session.id);
    callback();
  },

  // Called when the email data is sent
  onData(stream, session, callback) {
    let mailStream = "";

    // Collect the stream data into a string
    stream.on("data", (chunk) => {
      mailStream += chunk.toString();
    });

    // When the stream ends, process the email
    stream.on("end", async () => {
      try {
        // Parse the email message
        const message = await simpleParser(mailStream);

        // Safely extract the recipient email address
        const emailToCheck = message.to?.value?.[0]?.address?.toLowerCase().trim();
        if (!emailToCheck) {
          console.error("Recipient email not found in message.to");
          return callback();
        }

        // Find the email record in our Email model
        const isEmail = await EMAIL.findOne({ email: emailToCheck });
        if (!isEmail) {
          console.log("No email record found for:", emailToCheck);
          return callback(); // Stop processing if no record exists
        }

        // Safely extract the sender email address and prepare data
        const fromEmail = message.from?.value?.[0]?.address?.toLowerCase().trim() || "";
        
        // Create the mail document using our schema
        const newMail = await MAIL.create({
          emailId: isEmail._id,
          from: fromEmail,
          to: emailToCheck,
          subject: message.subject || "",
          text: message.text || "",
          html: message.html || ""
        });

        // Add the new mail to the email's list of mails and save
        isEmail.allMails.push(newMail._id);
        await isEmail.save();

        console.log("Mail saved:", newMail);
        callback(); // Successfully finish processing
      } catch (error) {
        console.error("Error parsing email:", error);
        callback(new Error("Failed to process email"));
      }
    });
  },

  onError(err) {
    console.error("SMTP Server Error:", err);
  }
});

module.exports = { smtpServer: server };
