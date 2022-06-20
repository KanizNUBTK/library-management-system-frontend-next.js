import React from "react";
import logo1 from "../../public/images/logo1.png";
import Image from "next/image";
import SidebarNav from "../sidebarMenu/SidebarNav";
import {
	adminSidebarData,
	LibrarianSidebarData,
	TeacherSidebarData,
	MemberSidebarData
} from "../sidebarMenu/sideNavData.js";
import { useUser } from "../../context/userContext";
import { useRouter } from 'next/router'
const SideMenu = () => {
	const router = useRouter()
	const { user } = useUser();

	const homePageHandle = () => {

		if (user.role === 'admin') {
			router.push('/admin')

		} else if (user.role === 'librarian') {
			router.push('/librarian')

		} else if (user.role === 'teacher') {
			router.push('/teacher')

		} else if (user.role === 'member') {
			router.push('/member')
		}
	}
	return (
		<section className="flex flex-col items-center justify-center">
			{/* sidebar header (logo) section, conditionally toggle */}
			{/* Admin logo section */}
			{
				user?.role === 'admin' &&
				<div className="w-56 flex flex-col items-center justify-center rounded-full relative border-b-2">
					<Image className="shrink-0 cursor-pointer" src={logo1} alt="logo" onClick={homePageHandle} />
					<p className="mt-0 pt-0 absolute bottom-2 text-md font-semibold text-gray-600">
						Library Management
					</p>
				</div>
			}
			{/* library / librarian logo section */}
			{
				user?.role === 'librarian' &&
				<div className="w-52 flex items-center justify-center relative logo-img mt-5 border-b-2 border-gray-400 pb-5">
					<Image className="shrink cursor-pointer" src={logo1} alt="logo" onClick={homePageHandle} width={150} height={150} />
				</div>
			}
			{/* teacher logo section */}
			{
				user?.role === 'teacher' &&
				<div className="w-52 flex items-center justify-center relative logo-img mt-5 border-b-2 border-gray-400 pb-5">
					<Image className="shrink cursor-pointer" src={logo1} alt="logo" onClick={homePageHandle} width={150} height={150} />
				</div>
			}
			{/* student logo section */}
			{
				user?.role === 'member' &&
				<div className="w-52 flex items-center justify-center relative logo-img mt-5 border-b-2 border-gray-400 pb-5">
					<Image className="shrink cursor-pointer" src={logo1} alt="logo" onClick={homePageHandle} width={150} height={150} />
				</div>
			}
			<div className="mt-8 w-60 h-auto px-6">
				{/* Admin Nav Menu section */}
				{
					user?.role === 'admin' &&
					adminSidebarData?.map((info, i, a) => <SidebarNav key={i} data={info} />)
				}
				{/* school/headmaster Nav Menu section */}
				{
					user?.role === 'librarian' &&
					LibrarianSidebarData?.map((info, i, a) => <SidebarNav key={i} data={info} />)
				}
				{/* teacher Nav Menu section */}
				{
					user?.role === 'teacher' &&
					TeacherSidebarData?.map((info, i, a) => <SidebarNav key={i} data={info} />)
				}
				{/* student Nav Menu section */}
				{
					user?.role === 'member' &&
					MemberSidebarData?.map((info, i, a) => <SidebarNav key={i} data={info} />)
				}
			</div>
		</section>
	);
};

export default SideMenu;
