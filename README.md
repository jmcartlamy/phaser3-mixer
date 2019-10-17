# Phaser 3 Mixer Game

A Phaser 3 game with ES6 support & Typescript support
that includes hot-reloading for development and production-ready builds.


## Installation

Login to your Mixer account and register an OAuth application on your [OAuth Clients page](https://mixer.com/lab/oauth).

After getting a Client ID & Client Secret there, create a `.env` file with this template:

```
API_URI_AUTHORIZATION=https://mixer.com/oauth/authorize
API_URI_TOKEN=https://mixer.com/api/v1/oauth/token
API_CLIENT_ID=YOUR_CLIENT_ID
API_CLIENT_SECRET=YOUR_CLIENT_SECRET
```

Install (`yarn install`), start the game (`yarn start`) and give the permissions for the app. 


## Available Commands

| Command | Description |
|---------|-------------|
| `yarn install` | Install project dependencies |
| `yarn start` | Build project and open web server running project |
