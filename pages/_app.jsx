import '../styles/globals.css';
import NavbarBottom from '../components/navigation/NavbarBottom';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavbarBottom></NavbarBottom>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
