import {UserProvider} from "./UserContext";
import App from "./App";

function Root() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

export default Root;
