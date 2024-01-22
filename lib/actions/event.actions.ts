'use server';

import { CreateEventParams } from "@/types";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";

// models
import Category from "../database/models/category.model";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";


//! CREATE
export const createEvent = async ({ userId, event, path }: CreateEventParams) => {
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

//! GET populate _id, firstName, lastName
export const populateEvent = async (query: any) => { 
  return query
    .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
    .populate({ path: 'category', model: Category, select: '_id name'})   
};

//! GET by ID
export const getEventById = async (eventId: string ) =>{
  try {
    await connectToDatabase();
    
    const event = await populateEvent(Event.findById(eventId));
    
    if (!event) {
      throw new Error("Error not found");
    }
    
    return JSON.parse(JSON.stringify(event));
    
  } catch (error) {
    handleError(error);
  }
};
