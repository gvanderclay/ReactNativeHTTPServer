android: uninstall_android
	react-native run-android
ios: uninstall_ios
	react-native run-ios
uninstall_ios:
	xcrun simctl uninstall booted org.reactjs.native.example.ReactNativeHTTPServer || exit 0
uninstall_android:
	adb uninstall com.reactnativehttpserver
