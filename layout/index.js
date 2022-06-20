import SideMenu from "../components/sidebar";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { Spin, Space } from 'antd';
import { useContext } from "react";

const Layout = (props) => {
	const [user, setUser] = useState({});
	const toggleHandler = () => {
		const sidebar = document.querySelector("#sideToggle");
		const navbar = document.querySelector("#navbarToggle");
		const mainT = document.querySelector("#mainToggle");

		navbar.getAttribute('layout') === 'navBarToggle'
			? navbar.removeAttribute('layout')
			: navbar.setAttribute('layout', 'navBarToggle')

		sidebar.getAttribute('layout') === 'sidebarToggle'
			? sidebar.removeAttribute('layout')
			: sidebar.setAttribute('layout', 'sidebarToggle')

		mainT.getAttribute('layout') === 'mainToggle'
			? mainT.removeAttribute('layout')
			: mainT.setAttribute('layout', 'mainToggle')

	}
	if (!user) {
		return (<Space size="middle"><Spin size="large" /></Space>)
	}

	return (
		<>
			<div className="relative">
				<div id='sideToggle' className={`h-screen md:w-64 fixed mt-0 left-0 top-0`}>
					<div className="m-4 h-screen rounded-lg bg-gray-100 shadow">
						<SideMenu />
					</div>
				</div>

				<main id="mainToggle" className={`ml-0 md:ml-64 mt-20 px-4 rounded-lg `}>
					{props.children}
				</main>

				<div id="navbarToggle" className={`h-16 fixed left-0 md:left-64 top-0 right-0 rounded-lg bg-slate-100`}>
					<Navbar toggleChange={toggleHandler} />
				</div>
			</div>
		</>
	);
};
export default Layout;
