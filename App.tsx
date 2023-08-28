import { AppRegistry } from "react-native";
import i18n from "./src/i18n/i18n";
import App from "./src/index";
const initI18n = i18n;
AppRegistry.registerComponent("be safe", () => App);
export default App;