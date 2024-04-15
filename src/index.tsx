import React from "react";
import ReactDOM from "react-dom/client";

// Screens
import Main from "./screens/Main";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>,
);
