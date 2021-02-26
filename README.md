# strapi-provider-email-gmail-2lo
This package is an email provider for the headless CMS [Strapi](https://github.com/strapi/strapi).
You can use this provider to send mail programmatically with `strapi-plugin-email`. 

This provider enables you to send email with the [Gmail API](https://developers.google.com/gmail/api) using a 2-legged OAuth configuration, when using G Workspace.

Supported versions:

- v3.5.x (recommended)
- v3.x

_**Not having Google Workspace** (previously G suite) will not work with this provider._

## Installation

```bash
# using yarn
yarn add strapi-provider-email-gmail-2lo

# using npm
npm install strapi-provider-email-gmail-2lo --save
```

## Setup

1) [Enable the Gmail API](https://console.developers.google.com/apis/library/gmail.googleapis.com)
2) [Configure the OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)
3) [Create a service account](https://console.cloud.google.com/iam-admin/serviceaccounts/)
4) Create a new Private key for your service account 
5) Configure the provider in `config/plugins`

| Variable                  | Type                    | Description                                                                                                                         | Required | Default   |
| ------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| provider                  | string                  | The name of the provider you use                                                                                                    | yes      |           |
| providerOptions           | object                  | Provider options                                                                                                                    | yes      |           |
| providerOptions.username  | string                  | An existing email address within your domain/project                                                                                         | yes      |           |
| providerOptions.clientId  | number                  | Service account API Client id                                                                                                       | yes      |           |
| providerOptions.privateKey| string                  | Service account private key                                                                                                         | yes      |           |
| settings                  | object                  | Settings                                                                                                                            | no       | {}        |
| settings.defaultFrom      | string                  | Default sender mail address, exist in domain                                                                                                        | no       | undefined |
| settings.defaultReplyTo   | string \| array<string> | Default address or addresses the receiver is asked to reply to                                                                      | no       | undefined |

### Enable the scope in G Workspace (required)
The following steps will authorize the right scope, to allow sending email with G Workspace:
1) Go to G Workspace admin dashboard > Security > API controls > [Manage domain-wide delegation](https://admin.google.com/ac/owl/domainwidedelegation)
2) Add an authorized client
- Client name: `client_id`
- Scopes: https://mail.google.com/
3) Authorize

### Example

**Path -** `config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'gmail-2lo',
    providerOptions: {
      username: 'myemail@example.com',
      clientId: env('EMAIL_CLIENT_ID'),
      privateKey: env('EMAIL_PRIVATE_KEY').replace(/\\n/g, '\n'),
    },
    settings: {
      defaultFrom: 'myemail@example.com',
      defaultReplyTo: 'myemail@example.com',
    },
  },
  // ...
});
```

**TIP:** When using environment variables for your privateKey, as in the example above, include all the `\n` in you .env file, like so:
```..env
EMAIL_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nAbC...xYz\n-----END PRIVATE KEY-----\n"
```

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
