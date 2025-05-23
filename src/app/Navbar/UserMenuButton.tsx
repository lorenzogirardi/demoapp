"use client";

import Image from "next/image";
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";

interface UserMenuButtonProps {
  session?: any;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  // Always show the user as logged in
  const user = { name: "User", image: profilePicPlaceholder };
  
  return (
    <div className="dropdown dropdown-end">
      <label className="btn btn-ghost btn-circle" tabIndex={0}>
        <Image
          unoptimized
          src={profilePicPlaceholder}
          alt="profilePic"
          width={40}
          height={40}
          className="w-10 rounded-full"
        />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <button>User Profile</button>
        </li>
      </ul>
    </div>
  );
}
