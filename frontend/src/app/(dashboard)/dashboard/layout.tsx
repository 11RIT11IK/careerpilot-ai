
"use client";

import GridBackground from "@/components/effects/GridBackground";
import LightBeam from "@/components/effects/LightBeam";
import Spotlight from "@/components/effects/Spotlight";
import { promises } from "dns";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FullPageLoader from "@/components/common/FullPageLoader";
import { DashboardProvider } from "@/context/DashboardContext";
import DashboardSidebar from "@/components/dash/DashboardSidebar";
import DashBoardNavbar from "@/components/layout/dashboard/dashboardNavbar";
import DashboardFooter from "@/components/layout/dashboard/dashboardFooter";


export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;

}) {

interface User {
id: number;
fullName: string;
email: string;
}


const router = useRouter();
const [loading,setLoading] = useState(true)
const [user, setUser] = useState<User | null>(null);

const fetchCurrentUser = async (): Promise<void> => {
  try {
		 const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          withCredentials: true,
          timeout: 10000,
        }
      );
		  setUser(response.data.user);


	} catch (error) {
		 if (axios.isAxiosError(error)) {

        if (error.response?.status === 401) {
        router.replace("/login");
        return;
        }

      }

  console.error(error);
		
	} finally {
   setLoading(false)
	}

}

	useEffect(() => {
	fetchCurrentUser()
	}, [])

	return(
   <main className="relative min-h-screen overflow-hidden bg-[#171717] px-6 pt-28">

      <Spotlight />

      <GridBackground />

      <LightBeam />

			{
			loading ? (
      <FullPageLoader />
      ) : (

			<DashboardProvider user={user}>
			<DashBoardNavbar />
			<div className="flex">

				<DashboardSidebar />

				<div className="flex-1 overflow-y-auto">
					{children}
				</div>

			</div>
			<DashboardFooter />
		  </DashboardProvider>

			   	)
			
			}


    </main>
	)
}