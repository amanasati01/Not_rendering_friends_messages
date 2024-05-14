"use server"
import {PrismaClient } from "@prisma/client"
const client = new PrismaClient()
export default async function getAllTweet() {
    const tweets = client.tweet.findMany()
    return tweets
}