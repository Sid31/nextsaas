import '../app/globals.css';
import UserProvider from "../../context/user";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
    
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
