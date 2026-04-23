import NavBar from "./components/NavBar"; 
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <>
   <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <main className="container flex-grow-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
