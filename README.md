# strapi-provider-email-gmail-2lo

## Usage

1) [Create a service account](https://console.cloud.google.com/iam-admin/serviceaccounts/)
2) Use your Client (Unique) id and a (new) Private key 
3) Use an exiting gmail username (within your domain/project)
4) Use your username as 'From' and 'Reply-To'

- Optional: Use an alias as 'From' or 'Reply-To'


### G suite
If using G suite follow these steps to add the right scopes:
1) Go to G suite admin dashboard > Security > Advanced settings > Manage API client access
2) Add an authorized client
    - Client name: client_id
    - Scopes: https://mail.google.com/ 
3) Authorize

Also make sure Gmail api access is enabled. Security > API permissions

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Installation

```bash
npm i strapi-provider-email-gmail-2lo
```
