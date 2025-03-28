import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/config/database'
import User from '@/models/User'

export const authOptions = {
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
            authorization : {
                params : {
                    prompt : 'consent',
                    access_type : 'offline',
                    response_type : 'code'
                }
            }
        })
    ],
    callbacks : {
        // invoked on successfull sign in
        async signIn({profile}){
            // 1. connect to the data base 
            await connectDB()
            // 2. check if user exist
            const userExists = await User.findOne({email : profile.email})
            // 3. if not create new user 
            if(!userExists){
                // shorten the username if too long
                const username = profile.name.slice(0,20)
                
                // saving the new user to the dataBase
                await User.create({
                    email : profile.email,
                    username,
                    image : profile.picture
                })
            }
            // 4. return true to allow sign in
            return true
        },
        // session callback function that modifies the session object
        async session({ session }){
            // 1. Get User from database
            const user = await User.findOne({email : session.user.email})
            // 2. Assign user id from the session
            session.user.id = user._id.toString()
            // 3. Return session
            return session 
        } 
    }
}