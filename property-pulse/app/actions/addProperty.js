"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData){

    await connectDB()
    const sessionUser = await getSessionUser()

    if(!sessionUser || !sessionUser.userId){
        throw new Error("User id is required!")
    } 

    const {userId} = sessionUser

    // console.log(formData.get('name')) // single value get chayyan 
    // console.log(formData.getAll('amenities')) // ith multiple value get cheyyan, result will be in the form of an array
    const amenities = formData.getAll('amenities')
    const images = formData.getAll('images').filter((image)=>image.name !== "")

    const propertyData = { 
        owner : userId,
        type : formData.get('type'),
        name : formData.get('name'),
        description : formData.get('description'),
        location : {
            street : formData.get('location.street'),
            city : formData.get('location.city'),
            state : formData.get('location.state'),
            zipcode : formData.get('location.zipcode')
        },
        beds : formData.get('beds'),
        baths : formData.get('baths'),
        square_feet : formData.get('square_feet'),
        amenities,
        rates : {
            nightly : formData.get('rates.nightly'),
            weekly : formData.get('rates.weekly'),
            monthly : formData.get('rates.monthly')
        },
        seller_info : {
            name : formData.get('seller_info.name'),
            email : formData.get('seller_info.email'),
            phone : formData.get('seller_info.phone')
        },
    }

    const imageUrls = []
    
    for(const imageFile of images){
        const imageBuffer = await imageFile.arrayBuffer()
        
    }

    const newProperty = new Property(propertyData)
    await newProperty.save()

    revalidatePath('/', 'layout')
    redirect(`/properties/${newProperty._id}`)
}

export default addProperty   
