"use strict";

/**
 * Module dependencies
 */
const nodemailer = require("nodemailer");

module.exports = {
  provider: "gmail-2lo",
  name: "Gmail 2lo (service account)",
  auth: {
    defaultFrom: {
      label: "Default From",
      type: "text"
    },
    defaultReplyTo: {
      label: "Default Reply-To",
      type: "text"
    },
    username: {
      label: "Username",
      type: "email"
    },
    clientId: {
      label: "Client Id",
      type: "text"
    },
    privateKey: {
      label: "Private Key",
      type: "password"
    }
  },
  init: config => {

    // For transforming a html input, where '\n' isn't possible as value, to a correct Private Key
    config.privateKey = config.privateKey.replace(/\\n/g, '\n');

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.username,
        serviceClient: config.clientId,
        privateKey: config.privateKey,
      },
    });

    console.log(config);

    return {
      send: options => {
        return new Promise((resolve, reject) => {
          // Default values.
          options = typeof options === 'object' ? options : {};
          options.from = options.from || config.defaultFrom;
          options.replyTo = options.replyTo || config.defaultReplyTo;
          options.text = options.text || options.html;
          options.html = options.html || options.text;

          let msg = {
            from: options.from,
            to: options.to,
            replyTo: options.replyTo,
            subject: options.subject,
            text: options.text,
            html: options.html
          };

          transporter
            .sendMail(msg)
            .then(resolve)
            .catch(error => console.log(error));
        });
      }
    };
  }
};
