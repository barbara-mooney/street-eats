# Street Eatz

A react native mobile application and loopback web server to help customers locate great food trucks.

# Deploying

Since we are [only deploying the server folder](https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f) on Heroku the following command will be used:

```
git subtree push --prefix server heroku master
```

# Getting Started
###### Minimum System Requirements
###### Note: Older Macs (2015 or below) may potentially have trouble using XCode and/or getting the app to run smoothly. Please be mindful of the minimum system requirements listed below:
   * Requires MacOS 10.14.4 or later 
   * 7GB of Hard Drive Space
   * Memory: at least 4GB (8GB for optimal performance)
 **************************************************************************************************************************





1. Clone from Github repository 
```
git@github.com:SanDiegoCodeSchool/street-eatz.git
```
2. Run ```npm install -g expo-cli```
3. Navigate to Mobile folder and type ```npm install``` in the terminal
4. Navigate to Server folder and type  ```npm install``` in the terminal
5. In Mobile folder, add a .env file that contains:

    - HOST=<http://route-to-your-local-host:3000>
    - EXAMPLE: HOST=’http://192.168.1.132:3000’
 
  *To find your IP address on a Mac:
    - Open System Preferences
    - Go to Network settings
    - IP is located below Status
  
 Note: If you cannot connect to the app, try replacing all instances of '${HOST}' with your ip address             'http://your.ip.address:3000'
  
  
6. Options for Running Street Eatz App (Both Recommended)

   #### Expo App(iphone or android): 
    - Install [Expo Client](https://expo.io/tools) app on your phone from the app store.
    - Make sure your phone and computer are connected on the same Wi-fi network.
    - Run ```npm start``` in mobile folder to begin running app.
    - To launch the Street Eatz app, Scan QR code (using phone camera) from the terminal or from the Expo Dev Tools window located in the browser
   
   Note: If you get a metro bundler error, try running ```expo start -c``` to clear expo cache
      
    #### Xcode iOS Simulator(Mac only):
    - Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) from the app store
    - Run ```npm start``` in mobile folder then press ```i``` to open the Street Eatz app in the iOS Simulator
    - Note: If you get a metro bundler error, try running ```expo start -c``` to clear expo cache 
      
   Note: Once the app opens, be sure to start the server to implement data


# Server

7. Install MongoDB on your local computer.
  - https://docs.mongodb.com/manual/installation/
  - Follow instructions to install community version
  - Run ```brew services start mongodb-community@4.2```and ``` mongo ``` to start mongodb server
  - Run ```npm start``` in server folder
  - Follow the http://localhost:3000/explorer link to go to loopback page
  
  IMPORTANT: In order to run the app properly, you must run ```npm start``` in both the Mobile and Server folders.**

# Web-App

  - You must run ```npm start``` in the web-app directory in the root of the folder to connect to the web app that hosts the password reset form.
  
# Using Loopback

8. Owners and businesses must be added in loopback.
   - Customers can be created through Loopback or the register page.
  
  #### Adding Owners:
   
   - Email, password, business fields are required.
   - Make note of your password, it won't be saved.
   - Owners can be associated with one or more businesses.
    
  #### Adding Businesses:

   Businesses should be added with the following Model format:
  
  ```
  {
    "name": ""
    "number": "",
    "food style": "",
    "price range":"",
    "menu": [
          {
            "item": "",
            "category": "",
            "image": "",
            "desc": "",
            "price": ""
          }
        ],
        "image": "",
        "url": "",
        "ownerId": ""
   } 
```
    
  Note: The "food style" and "price range" section is used with the filter to find food trucks.
  "Price Range" can range between "$" and "$$$".
  - The password reset form is located in the web-app folder. The form requires the user token and userId to open and submits the new password to Loopback.
    
    
 #### Adding Reviews:
  
  Reviews should be added with the following Model format:
  
  ```
    {
      "text": "string",
      "response text": "string",
      "timeStamp": "2020-04-03T22:19:40.664Z",
      "username": "string",
      "rating": 0,
      "isHidden": false,
      "businessId": "string",
      "publisherId": "string"
    } 
   ```
   
  Note:
   - "text": Used to store the review text.
   - "response text": Used to store a response from a truck owner.
   - "timeStamp": Should be populated with an ISO time format.
   - "businessId": Should store the buisnessId for the specific truck that is being reviewed.
   - "publisherId": Should store the customer Id that is leaving the review.

# Authentication

First create User model in Loopback Explorer. (Be sure to a include password)
Then uncomment the following code in server/boot/authentication.js:
```
//    server.enableAuth();
```
This will restrict access to all models in Loopback.
Login (in Loopback Explorer) as the User you created and you will regain access.



# Detox: End-to-End Testing 

 - [Here](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md) is a great document on getting started with Detox. 

 - Click [here](https://docs.expo.io/distribution/building-standalone-apps/?redirected) for more information about Building Standalone Apps through Expo. 
 
**Note: Detox is currently set up along with Mocha as the test runner (Jest can also be used as another alternative)**

1. To run it on your iOS Simulator, first build your expo project with the simulator flag by running ```expo build:ios -t simulator``` in the mobile folder. This will create an ios build for the app to get it ready for deployment to the app store. Once complete, your build should show up in your personal Expo App Account. 
 
 2. In order to run the tests, Go To the [Expo Tools](https://expo.io/tools) website and download the IPA 2.15.4 file. This file will include an Exponent folder filled with other files that will be used to run the Detox test.  
 3. Create a new bin folder inside the street-eatz project
 4. Next, rename the Exponent folder to "Exponent.app" and drag the Exponent.app folder into the bin folder. Your file path should now be as follows "bin/Exponent.App"
 
 
 **IMPORTANT: Please keep in mind that the Exponent.App file is TOO LARGE to push to github. For the time being, the .app file will either need to be referenced as a file to ignore in the ".gitignore" file, OR removed prior to making your commits to GitHub.**
 
 
 #### To Run Detox e2e Tests: 
 
 5. Your Detox test file can be found in the following folder ```e2e/firstTest.spec.js```
 6. The test will need to be ran using two seperate terminals. First, Run ```npm start``` or ```expo start -c``` in mobile folder to start the application in the ios simulator. 
 7. Next, open up a second terminal, and inside the mobile folder, run ```"npm run e2e"``` or ```"detox test"``` to run the detox test. This will automatically prompt the ios simulator to restart, load, and begin running your detox e2e tests for the street-eatz app.  









-------------------------------------------------------------------------------------
NOTE ON MAP ICONS
If this app is pushed to production, please make sure that a custom icon is used on maps. If the present icon is used ("food-truck.png"), attribute must be given to icon author (Good Ware). See https://www.flaticon.com/free-icon/food-truck_2676380?term=food%20truck&page=1&position=35 for instructions on giving attribute.
-------------------------------------------------------------------------------------
NOTE ON SHARE FEATURE
Once app is pushed into production. Please add a link to the app download page in the share button message (./mobile/ShareFeature).
