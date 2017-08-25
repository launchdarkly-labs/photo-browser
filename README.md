# Unsplash browser
This is a demo showcasing an example full stack isometric app utilizing LaunchDarkly, Unsplash, React, and Node.

## Prerequisites
Make sure you have the following software installed:
[node](https://nodejs.org/en/download/package-manager/)
[yarn](https://yarnpkg.com/lang/en/docs/install/)

Also, make sure you are signed up for the following services:
[LaunchDarkly](https://launchdarkly.com/#signup)
[Unsplash](https://unsplash.com/developers)

## Installation
1. git clone this repo
```git clone https://github.com/launchdarkly/photo-browser```
2. navigate to the photo-browser folder
3. install dependancies using Yarn
```yarn```

## Setup
Duplicate or rename .env.example to .env and fill out each of the environmental variables

```UNSPLASH_APP_ID``` can be found in your Unspash dashboard

```LAUNCHDARKLY_SDK_KEY``` and ```LAUNCHDARKLY_CLIENTSIDE_ID``` can be found [in your LaunchDarkly account settings](https://app.launchdarkly.com/settings#/projects).

```EXAMPLE_USER_KEY``` is the test users key


```EXAMPLE_USER_CUSTOM_JSON``` is an optional json object containing custom attributes for experimenting with targeting. If the json is malformed the server will output a warning, but will still start.

## Running
And start the application:
```yarn start```