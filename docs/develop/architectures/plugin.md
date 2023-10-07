# Plugin

## type define (PluginDetail)

### id

random generate id
 
### localDevPath

**optional**, in dev mode, plugin can use local file directly

### isDefault

**optional**, is default plugin, default plugin can not be removed

### importedDate

YYYY/MM/DD

## type define (PluginDetailWithConfig)

### config

## file struct

zip file, import to app will be auto extracted. 

- config.json
- icon.svg
- index.js

### config.json

base

- `identifier`
- `version`
- `type`: 'credential'、'node' 
- `tags`: \['bilibili', 'tx-mail'\](string[], for search)
- `title`
- `description`