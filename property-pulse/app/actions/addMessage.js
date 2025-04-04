"use server";
import connectDB from "@/config/database";
import Message from "@/models/Mesage";
import { getSessionUser } from "@/utils/getSessionUser";

async function addMessage(previousState, formData){

    try {
        await connectDB()
        const sessionUser = await getSessionUser()
    
        if(!sessionUser || !sessionUser.userId){
            throw new Error("User id is required!")
        } 
    
        const {userId} = sessionUser
    
        const recipient = formData.get('recipient')
    
        if(userId === recipient){
            return { error : "You cannot sent a message to yourself"}
        }
    
        const newMessage = new Message({
            sender : userId,
            recipient,
            property : formData.get('property'),
            name : formData.get('name'),
            email : formData.get('email'),
            phone : formData.get('phone'),
            body : formData.get('body')
        })
    
        await newMessage.save()
    
        return { submitted : true }
    } catch (error) {
        console.error("Error adding message:", error);
        return { error: "An error occurred while sending the message." };
    }

}

export default addMessage   
