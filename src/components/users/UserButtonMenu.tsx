import { useAuth, UserButton } from "@clerk/nextjs";
import Terms from "./Terms";
import React, { useEffect } from "react";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

export default function UserButtonMenu() {
  const { userId } = useAuth();

  useEffect;

  return (
    <div>
      <UserButton>
        {/* You can pass the content as a component */}

        {/* You can also pass the content as direct children */}
        <UserButton.UserProfilePage
          label="Terms"
          labelIcon={<DotIcon />}
          url="terms"
        >
          <Terms />
        </UserButton.UserProfilePage>
      </UserButton>
    </div>
  );
}
