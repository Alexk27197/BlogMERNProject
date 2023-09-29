import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, desc }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>

      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-grow max-w-screen-xl mx-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
