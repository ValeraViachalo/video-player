import React, { useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { AnimatePresence } from "framer-motion";

import { ScrollProvider } from "./helpers/scrollProvider";
import { Header } from "@C/Header/Header"
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Blog from "./pages/Blog/Blog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Footer from "./components/Footer/Footer";
import { Loader } from "./components/Loader/Loader";
import classNames from "classnames";

const queryC = new QueryClient();

function App() {
  const [loaderFinished, setLoaderFinished] = useState(false);

  const element = useRoutes([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'blog',
          element: <Blog />,
        },
        {
          path: 'blogs',
          children: [
            {
              path: ":blogId?",
              element: <BlogDetails />,
            },
          ],
        }
      ],
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  const location = useLocation();

  return (
    <QueryClientProvider client={queryC}>
      <main className={classNames("main", {
        "main--loading": !loaderFinished
      })}>
          <ScrollProvider>
            {!loaderFinished && (<Loader setLoaderFinished={setLoaderFinished}/>)}
            <Header />
            <AnimatePresence mode="wait" initial={false}>
                {React.cloneElement(element, { key: location.pathname })}
            </AnimatePresence>
            <Footer />
          </ScrollProvider>
      </main>
    </QueryClientProvider>
  )
}

export default App
