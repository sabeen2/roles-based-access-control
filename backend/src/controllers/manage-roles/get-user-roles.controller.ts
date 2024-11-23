import express, { Request, Response } from "express";
import prisma from "../../../prisma/prismaClient";

interface CustomRequest extends Request {
  user: { email: string };
}

export const getUserRoles = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.user;

    // Fetch the user, their role, and associated permissions
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: {
          select: {
            id: true,
            name: true,
            permissions: {
              select: {
                id: true,
                sideBarItem: true,
                canCreate: true,
                canRead: true,
                canUpdate: true,
                canDelete: true,
              },
            },
          },
        },
      },
    });

    // Handle case if user is not found
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Send the user role and permissions as a response
    res.status(200).json({
      success: true,
      data: {
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// import express, { Request, Response } from "express";
// import prisma from "../../../prisma/prismaClient";

// export const getRoles = async (_req: Request, res: Response) => {
//   try {
//     // Fetch roles and their permissions, excluding unwanted fields
//     const roles = await prisma.role.findMany({
//       where: { isDeleted: false }, // Filter out deleted roles
//       select: {
//         id: true,
//         name: true,
//         permissions: {
//           select: {
//             id: true,
//             sideBarItem: true,
//             canCreate: true,
//             canRead: true,
//             canUpdate: true,
//             canDelete: true,
//             roleId: true,
//           }, // Select only the fields needed for permissions
//         },
//       },
//     });

//     if (!roles.length) {
//       return res
//         .status(404)
//         .json({ success: false, message: "No roles found" });
//     }

//     // Send response with filtered data
//     res.status(200).json({ success: true, data: roles });
//   } catch (error) {
//     console.error("Error fetching roles:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };
