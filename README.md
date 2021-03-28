# Montessori Bells with React Native

React Bells is a mobile app of activities based on the Montessori bells, for children ages 3-9
years to use under adult supervision.


## Usage
The app is still in development; it has not yet been deployed. The app has only been tested for use
on a Xiaomi Mi A2 Android One phone running Android 10. To use the app at the current time:

1. Open a terminal and enter the following command to install [Expo](https://docs.expo.io/) if not
   already installed:
   ```bash
   npm install --global expo-cli
   ```
1. Download the React Bells project source code.
1. In a terminal, change to the project directory and enter the commands:
   ```bash
   npm ic
   expo start
   ```
   A large QR code will be displayed in the terminal.
1. On an Android device, install and open the Expo app.
1. In the Expo app, scan the QR code displayed in the terminal.


## License
[MIT](https://choosealicense.com/licenses/mit/)


## Acknowledgements

The sound files that play when the bells are tapped are files made available by the [University of
Iowa](http://theremin.music.uiowa.edu/MISpiano.html).

React Bells' login page makes use of some of the code in the article [Google Sign-In with React
Native and Expo: IOS &
Android](https://medium.com/@inaguirre/react-native-login-with-google-quick-guide-fe351e464752) by
Ignacio Nicolas Aguirre.

React Bells' use of the Google Drive API makes use of some of the code in the article
[Google Drive in React Native](https://cmichel.io/google-drive-in-react-native) by Christoph Michel.
