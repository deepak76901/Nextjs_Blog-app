import { Sidebar, SidebarItem } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiArrowSmRight,
  HiUser,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import Link from "next/link";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

export default function DashSidebar() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [dispatch, searchParams]);

  const handleSignOut = async (e) => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full sm:w-56 sm:fixed sm:left-0 z-50">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link href="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "user"}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link href="/dashboard?tab=dashboard">
              <SidebarItem
                active={tab === "dashboard" || !tab}
                as="div"
                icon={HiChartPie}
              >
                Dashboard 
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link href="/dashboard?tab=posts">
              <SidebarItem
                active={tab === "posts"}
                as="div"
                icon={HiDocumentText}
              >
                Posts
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link href="/dashboard?tab=users">
              <SidebarItem
                active={tab === "users"}
                as="div"
                icon={HiOutlineUserGroup}
              >
                Users
              </SidebarItem>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link href="/dashboard?tab=comments">
              <SidebarItem
                active={tab === "comments"}
                as="div"
                icon={HiAnnotation}
              >
                Comments
              </SidebarItem>
            </Link>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
