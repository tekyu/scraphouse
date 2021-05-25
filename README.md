# WIP

# Tech stack

## Frontend

- React
- Redux
- Styled-components
- Reselect
- Immer
- Dotenv
- Socket.io
- Axios
- Formik

### Changing aliases

Currently there are couple of aliases baked in, such as

- assets
- store
- components
- containers
- utils
- theme
- i18n
- mocks

To change aliases them you need to change

- `jsconfig.json` - for letting **vscode** know the paths
- `.eslintrc.js` - for letting **eslint** know the imports
- `config-overrides.js` - for letting **webpack** know the imports

Project contains following babel plugins

```
"plugins": [
  "@babel/plugin-proposal-export-namespace-from",
  "@babel/plugin-proposal-nullish-coalescing-operator",
  "@babel/plugin-proposal-optional-chaining",
  "babel-plugin-styled-components"
]
```

**ESLint** is used with airbnb config with additional rules

**Formatting on save** is used inside project

Frontend .env file
```
REACT_APP_SOCKET_ADDRESS = 'http://localhost:3012'
```

### Backend

- Node.js
- Typescript
- Socket.io
- Express
- Axios
- MongoDB
- Passport
- Nodemon
- Mongoose

Backend .env file
```

# Port
PORT = '3010'
SOCKET_PORT = '3012'

# Debug
LOG_LEVEL = 'debug'

# Front domain
FRONT_DOMAIN = 'http://localhost:3000'


# Mongo
DB_ADDRESS = 'http://localhost:27017';
DEVDB_CONN = mongodb://localhost:27017/merntemplate 
DB_SESSION_SECRET = 'templatesecret'

# Socket
## 5 seconds
SOCKET_PING_TIMEOUT = 5000
## 5 minutes
SOCKET_PING_INTERVAL = 300000
```
