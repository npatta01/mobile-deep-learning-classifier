# About

Screenhots

[Youtube Link](https://www.youtube.com/watch?v=7d2qFLeYvRc&t=1s)






# Customizing

## Setup
To develop locally, you will [Node]() and [Expo]() installed

1) Install Node (Mac/Windows)
We will install node using [NVM](https://github.com/creationix/nvm)
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
# comment
nvm install node 
nvm use node
```


2) Install Expo
```
npm install -g expo-cli
```

3) Install packages for project
```
npm install
```

4) Expo Setup
Download [Android] or IOS App from the respective stores
Login to the expo app.

5) Launch App
```
expo login
# you will be asked for your credentials
expo start
```

You should see this project your listed on the app


6) Customizing message
Modify [config.json]()
Modify "title", to change the cop listed on the "Home" screen
Modify "description" to change the copy on the "About" screen

Description takes markdown

Modify "host" to point to a deployed version of your model

Refer to section to see endpoints needed by your app.

7) Deploying to the store (optional)
If you are interested in deploying to Google, and Apple you can run the below commands

Android build
```
expo build:android
expo url:apk
```

Ios build
```
expo build:ios
expo url:ipa
```




If you want to use this project as a template for your own model, here are the changes to be made.

Modify "title","host","description" in [conifg.js](confi.js).
Host should be a service that can listen to these type of requests.

/api/classify   Takes image data as binary and returns classes
/api/classes    Return a list of classes


# Links
[Privacy Policy](docs/appstore/privacy_policy.md)       
