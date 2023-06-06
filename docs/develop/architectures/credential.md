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

### createdAt

Credential create time (YYYY-MM-DD)

### updateAt

**Optional**, Credential update time (YYYY-MM-DD)

### dataId

The data id of the credential.

### pluginId

the plugin of this credential.

## plugin

Credential can have match domain plugin, it used to help create credential.


plugin exposed:

- get
  - `async (browser: Browser) => Promise<CredentialPluginGetValue>`

- apply
  - `async (page: Page, data: any) => Promise<boolean>`

- clear
  - `(page: Page) => Promise<boolean>`





