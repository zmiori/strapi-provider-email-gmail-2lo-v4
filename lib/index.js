'use strict';

/**
 * Module dependencies
 */
const nodemailer = require("nodemailer");
const { removeUndefined } = require('strapi-utils');

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: providerOptions.username,
        serviceClient: providerOptions.clientId,
        privateKey: providerOptions.privateKey,
      },
    });

    return {
      send: options => {
        return new Promise((resolve, reject) => {
          if (typeof options !== 'object') reject(new Error('Email options aren't provided'));

          options.from = options.from || settings.defaultFrom;
          options.replyTo = options.replyTo || settings.defaultReplyTo;
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

          transporter.sendMail(removeUndefined(msg))
            .then(resolve)
            .catch((error) => {
              strapi.log.error(`Error while sending email: ${error}`);
              reject([{
                messages: [
                  { id: 'Auth.form.error.email.invalid' },
                  { mailer_error: error.message },
                ]
              }]);
            });
        });
      }
    };
  }
};
