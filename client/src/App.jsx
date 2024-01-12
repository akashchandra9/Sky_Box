import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Detail from './components/detail';
import Forget from "./components/forget";
import Pass from "./components/pass"
import Updo from "./components/updo"
import Down from "./components/down"
import Index from "./components/index"
import Navbar from "./components/Navbar/Navbar2";
import { UserContextProvider } from "./components/UserContext";
function App() {
	
return (
	<>
	<BrowserRouter>
	<UserContextProvider>
	<Navbar/>
	<Routes>
		
		<Route exact path="/" element={<Index/>}/>
		<Route exact path="/login" element={<Login/>}/>
		<Route exact path="/register" element={<Register/>}/>
		<Route exact path="/detail" element={<Detail/>}/>
		<Route path="/forget" element={<Forget/>}/>
		<Route path="/pass" element={<Pass/>}/>
		<Route path="/updo" element={<Updo/>}/>
		<Route path="/down" element={<Down/>}/>
	</Routes>
	</UserContextProvider>
	</BrowserRouter>
	</>
);
}

export default App;
