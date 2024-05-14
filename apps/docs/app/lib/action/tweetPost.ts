"use server"
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "../auth";

// Create a single instance of the Prisma client
const prisma = new PrismaClient();

export default async function TweetPost( newTweet :string ): Promise<void> {
    try {
        const date = new Date().toISOString();
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            throw new Error("User session not found");
        }
        console.log("new tweet " + newTweet);
        
        const tweetInfo = await prisma.tweet.create({
            data: {
                authorId: session.user.id,
                tweet: newTweet,
                date : date
            }
        });

        console.log("Tweet created:", tweetInfo);
    } catch (error) {
        console.error("Error creating tweet:", error);
    }
        // Handle the error appropriately, such as returning an error response
        // throw new Error("Failed to create tweet");
    // } finally {
    //     // Disconnect the Prisma client after each request to release resources
    //     await prisma.$disconnect();
    // }
}
