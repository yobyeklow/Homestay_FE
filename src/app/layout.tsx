import "./global.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ReactQueryProvider from "./ReactQueryProvider";
import ReduxProvider from "../store/Redux/ReduxProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Homestay cho thuê",
  description: "Booking homestay",
};
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <ReduxProvider>
        <html lang="en">
          <head>
            <link
              href="https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
              rel="stylesheet"
            />
          </head>
          <body className={`${roboto.className} `}>
            {children}
            <ToastContainer />
          </body>
        </html>
      </ReduxProvider>
    </ReactQueryProvider>
  );
}
