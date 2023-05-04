# Credential

There are many websites which have anti-robot means, it is hard for **crawler** to login or get certified.

So, we need the **credential**: user login or get certified once, and the app will save it and used it in workflows.

## structure (CredentialDetail)

### domain

**Credential** should have the belonging **domain**

### id

Auto generated **id**

### title

Title of the credential

### icon

**Optional**, icon of the website, it can be:

- url
- local file

### data

The data of the credential.

### plugin

**Optional**, the plugin of this credential.

Default: `cookie` as `data`, user manual stop the action

## plugin

Credential can have match domain plugin, it used to help create credential.

plugin execution context:

- start
  - `(page: Page) => void`

- finish (finish the task of get credential)
  - `(detail: Omit<CredentialDetail,'id'>) => void`

plugin exposed:

- use
  - `(page: Page, data: any) => void`
- clear
  - `(page: Page) => void`





