// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// export const currentProfile = async () => {
//   const { userId } = auth();

//   if (!userId) {
//     return null;
//   }

//   const profile = await db.profile.findUnique({
//     where: {
//       userId,
//     },
//   });

//   return profile;
// };
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";

export const currentProfilePages = async (req:NextApiRequest) => {
  const {userId} = await getAuth(req);

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId
    },
  });

  console.log("file run current-profile-pages");

  return profile;
};
