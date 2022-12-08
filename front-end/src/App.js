import { useState } from "react";
import AllNotes from "./component/AllNotes";
import Note from "./component/Note";

export default function App() {

	const [menu, switchMenu] = useState(true)

	return (
		menu ? <Note switchMenu={switchMenu} />
			: <AllNotes switchMenu={switchMenu} />
	);
}