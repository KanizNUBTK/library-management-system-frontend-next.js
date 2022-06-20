import "../styles/globals.css";
import "antd/dist/antd.css";
import "metismenujs/dist/metismenujs.css";
import Fragment from "react";
import { UserContextProvider } from '../context/userContext'
import SearchInputContext from "../context/SearchInputContext";

function MyApp({ Component, pageProps }) {

	return (
		<UserContextProvider>
			<SearchInputContext>
				<Component {...pageProps} />
			</SearchInputContext>
		</UserContextProvider>
	);
}

export default MyApp;
