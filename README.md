# preon

A free url shortener

# Contributing

## Installation

```
yarn # Please use yarn
```

## Running

If you've noticed we have a bash script called `app` in the root of the project.
We use this script to run our app. The reasoning behind this is the script is too long
and i don't want it to put it on our `package.json`

`Make sure that you are in the root of the project when running the app`

```
# Start scripts
yarn start # Runs both server and client start script
yarn server:start
yarn client:build
yarn client:start

# Dev scripts
yarn dev # Runs both server and client dev script
yarn server:dev
yarn client:dev

## Envs

You will see `.env.example` on both `client` and `server` workspaces
```

# LICENSE

<a href="https://github.com/qxb3/quark/tree/main">MIT</a>
