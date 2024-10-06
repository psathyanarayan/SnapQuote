"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
const MyProfile = () => {
  const [dataByProfile, setDataByProfile] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchDataByProfile = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/quotes`, {
        method: "GET",
      });
      const data = await res.json();
      setDataByProfile(data);
    };
    if (session?.user.id) {
      fetchDataByProfile();
    }
  }, [session?.user.id]);
  const handleEdit = (quote) => {
    router.push(`/update-quote?id=${quote._id}`);
  };
  const handleDelete = async (quote) => {};
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={dataByProfile}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
