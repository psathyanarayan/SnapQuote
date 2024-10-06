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
  const handleDelete = async (quote) => {
    const hasConfirmed = confirm("Are you sure you want to delete ?");
    if (hasConfirmed) {
      try {
        const updatedData = await fetch(`api/quote/${quote._id}`, {
          method: "DELETE",
        });
        const filteredQuotes = dataByProfile.filter(
          (post) => post._id !== quote._id
        );
        setDataByProfile(filteredQuotes);
      } catch (error) {
        console.log(error);
      }
    }
  };
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
