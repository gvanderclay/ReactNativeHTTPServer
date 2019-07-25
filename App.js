import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import StaticServer from "react-native-static-server";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";

class App extends React.Component {
  state = {
    url: null
  };
  async componentWillMount() {
    const result = await RNFS.readDirAssets("index.html");
    console.log(result);
    // let path = RNFS.MainBundlePath + "/www";
    // this.server = new StaticServer(8080, path);
    // this.server.start().then(url => {
    //   this.setState({ url });
    // });
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
            style={{ flex: 1, marginBottom: 20 }}
            source={{ uri: this.state.url }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
