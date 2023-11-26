import { AppContextProvider } from "./context/AppContext";
import Static from "./common/Static";
import Chatbox from "./components/Chatbox";
import Nav from "./components/Navbar";


function App() {
  return (
    <AppContextProvider>
      <Static>
        <Nav />
        <Chatbox />
      </Static>
    </AppContextProvider>
  );
}

export default App;
