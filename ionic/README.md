http://ionicframework.com/docs/v2/setup/installation/?

$ npm install -g ionic cordova

$ ionic start cutePuppyPics --v2

$ cd cutePuppyPics
$ ionic serve

$ npm install --proxy http://127.0.0.1:8087

## .npmrc file content
sass_binary_path=C:\Users\lf\Downloads\win32-x64-48_binding.node

https://github.com/driftyco/ionic-cli/wiki/Migrating-to-NPM-from-bower


ionic g provider NewProvider

ionic plugin add cordova-plugin-image-picker  

安卓定位：
1.ionic plugin add cordova-plugin-geolocation  （安装后貌似会自动在AndroidManifest.xml中加入<uses-feature android:name="android.hardware.location.gps" />）
2.AndroidManifest.xml中加入：
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.ACCESS_LOCATION_EXTRA_COMMANDS" />
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />