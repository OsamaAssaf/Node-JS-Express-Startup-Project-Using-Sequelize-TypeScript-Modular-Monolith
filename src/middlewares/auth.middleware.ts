import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

import { prisma } from "../lib/prisma";
import { verifyToken } from "../services/jwt-token-service";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = verifyToken(token) as JwtPayload;

    console.log("decoded: ", decoded);

    const userId = decoded.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
