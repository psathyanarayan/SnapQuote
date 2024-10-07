import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import ErrorBoundary from "@components/ErrorBoundary";
export const metadata = {
  title: "SnapQuote",
  description: "Unleash and Share",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </ErrorBoundary>
    </body>
  </html>
);

export default RootLayout;
