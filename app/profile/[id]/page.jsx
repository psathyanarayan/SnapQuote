"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const OtherProfile = ({ params }) => {
  const [dataByProfile, setDataByProfile] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContent session={session} params={params} router={router} />
    </Suspense>
  );
};

const ProfileContent = ({ session, params, router }) => {
  const [dataByProfile, setDataByProfile] = useState([]);
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  useEffect(() => {
    const fetchDataByProfile = async () => {
      const res = await fetch(`/api/users/${params.id}/quotes`, {
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
    const hasConfirmed = confirm("Are you sure you want to delete?");
    if (hasConfirmed) {
      try {
        const updatedData = await fetch(`/api/quote/${quote._id}`, {
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
    <>
      {session?.user.id === params.id ? (
        <Profile
          name="My"
          desc="Welcome to your personalized profile page"
          data={dataByProfile}
          handleEdit={handleEdit}
          noClick={true}
          handleDelete={handleDelete}
        />
      ) : (
        <Profile
          name=""
          desc={`Welcome to ${userName}'s profile page`}
          data={dataByProfile}
          noClick={true}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default OtherProfile;
