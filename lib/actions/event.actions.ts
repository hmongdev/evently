'use server';

import { CreateEventParams } from "@/types";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";

// models
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";


//! CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase()

    const organizer = await User.findById(userId)
    if (!organizer) throw new Error('Organizer not found')

    const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
  }
}