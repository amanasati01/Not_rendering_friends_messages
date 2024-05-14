"use server"
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { Session, getServerSession } from "next-auth";
import authOptions from "../auth";
const client = new PrismaClient();
export async function NoOfTweets() {
    const session: Session | null =  await getServerSession(authOptions);
    if (!session || !session.user) {
      return;
    }
    const user = await client.user.findUnique({
      where :{
        email : session?.user.email as string
      }
    });
    if (!user) {
      return;
    }
    const noOfPost = await client.tweet.count({
      where :{
        authorId : user.id
      }
    });
    await client.$disconnect();
    return noOfPost.toString();
}
