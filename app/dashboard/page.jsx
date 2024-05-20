"use client";
import React, { useEffect, useState } from "react";
import DashSidebar from "@/components/DashSidebar";
import DashProfile from "@/components/DashProfile";
import DashPosts from "@/components/DashPosts";
import DashUsers from "@/components/DashUsers";
import DashComments from "@/components/DashComments";
import DashboardComp from "@/components/DashboardComp";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);

  return (
    <>
      {currentUser ? (
        <div className="min-h-screen flex flex-col sm:flex-row divide-x-2 dark:divide-x-0">
          {/* SideBar */}
          <div className="sm:w-56">
            <DashSidebar />
          </div>
          {/* Profile */}
          <div className="w-full">
            {tab === "profile" && <DashProfile />}
            {tab === "posts" && <DashPosts />}
            {tab === "users" && <DashUsers />}
            {tab === "comments" && <DashComments />}
            {tab === "dashboard" && <DashboardComp />}
          </div>
        </div>
      ) : (
        redirect("/sign-in")
      )}
    </>
  );
}
