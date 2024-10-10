import AdminSidebar from "@/components/layout/AdminSidebar";
import UserSidebar from "@/components/layout/UserSideBar";
import React, { ReactNode } from "react";

interface Props  {
	children: ReactNode
}

const AdminLayout = ({ children }: Props) => {
	return(
		<div>
			<div className="mt-2 mb-4 bg-light py-4">
				<h2 className="text-secondary text-center">Admin Dashboard</h2>
			</div>

			<div className="container">
				<div className="row justify-content-around">
					<div className="col-12 col-md-2">
						<AdminSidebar />
					</div>
					<div className="col-12 col-md-10 user-dashboard">
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminLayout;