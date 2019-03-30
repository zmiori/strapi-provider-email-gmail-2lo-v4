"use strict";

/**
 * Module dependencies
 */

/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-template */
// Public node modules.
const _ = require("lodash");
const nodemailer = require("nodemailer");

/* eslint-disable no-unused-vars */
module.exports = {
  provider: "nodemailer-gmail-oauth2",
  name: "Nodemailer Gmail OAuth2",
  auth: {
    nodemailer_default_from: {
      label: "Nodemailer Default From",
      type: "text"
    },
    nodemailer_default_replyto: {
      label: "Nodemailer Default Reply-To",
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

    /**
     * For transforming a html input, where '\n' isn't possible as value, to a correct Private Key
     */
    const privateKeyArray = config.privateKey.split(' ');
    let privatekey = '';

    for (let i = 0; i < privateKeyArray.length; i++) {
      if (i > 1 && i < privateKeyArray.length - 3) {
        // Add newline
        privatekey += privateKeyArray[i] + '\n';
      } else {
        // Add space on BEGIN & END headers
        privatekey += privateKeyArray[i] + ' ';
      }
    }

    // Add last newline
    config.privateKey = privatekey + '\n';

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.username,
        serviceClient: config.clientId,
        privateKey: config.privateKey,
      },
    });

    return {
      send: options => {
        return new Promise((resolve, reject) => {
          // Default values.
          options = _.isObject(options) ? options : {};
          options.from = options.from || config.nodemailer_default_from;
          options.replyTo = options.replyTo || config.nodemailer_default_replyto;
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
            .catch(error => reject(error));
        });
      }
    };
  }
};
