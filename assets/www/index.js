window.ReactNativeWebView.postMessage("Hello React Native!");
document.getElementById("newStuff").innerHTML = "The javascript works?";
window.addEventListener("message", message => {
  document.getElementById("newStuff").innerHTML += `</br>${message.data}`;
});
