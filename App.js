import React from "react";
import { SafeAreaView, Text, View, Platform } from "react-native";
import StaticServer from "react-native-static-server";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";

class App extends React.Component {
  state = {
    url: null
  };

  webView = null;

  async componentDidMount() {
    moveAndroidFiles();
    let path = getPath();
    this.server = new StaticServer(8080, path);
    this.server.start().then(url => {
      this.setState({ url });
    });
  }

  componentWillUnmount() {
    if (this.server && this.server.isRunning()) {
      this.server.stop();
    }
  }

  render() {
    if (!this.state.url) {
      return (
        <SafeAreaView>
          <Text>Hello World</Text>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView>
        <Text>{this.state.url}</Text>
        <View style={{ backgroundColor: "red", height: "100%", width: "100%" }}>
          <WebView
            ref={webView => (this.webView = webView)}
            style={{ flex: 1, marginBottom: 20 }}
            source={{ uri: this.state.url }}
            onMessage={event => {
              const { data } = event.nativeEvent;
              const clientResponseCode = `
                window.postMessage(${JSON.stringify(data)}, "*");
                true;
              `;

              if (this.webView) {
                this.webView.injectJavaScript(clientResponseCode);
              }
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

function getPath() {
  return Platform.OS === "android"
    ? RNFS.DocumentDirectoryPath + "/www"
    : RNFS.MainBundlePath + "/www";
}

async function moveAndroidFiles() {
  if (Platform.OS === "android") {
    await RNFS.mkdir(RNFS.DocumentDirectoryPath + "/www");
    const files = ["www/index.html", "www/index.css", "www/index.js"];
    await files.forEach(async file => {
      await RNFS.copyFileAssets(file, RNFS.DocumentDirectoryPath + "/" + file);
    });
  }
}

export default App;
