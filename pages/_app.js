import "../styles/globals.css";

function Application({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default Application;
