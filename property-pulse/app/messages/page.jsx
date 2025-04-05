import connectDB from "@/config/database"
import Message from "@/models/Mesage"
import '@/models/Property'
import { convertToSerializableObject } from "@/components/convertToObject"
import { getSessionUser } from "@/utils/getSessionUser"
import MessageCard from "@/components/MessageCard"

export default async function MessagesPage() {
  connectDB()

  const sessionUser = await getSessionUser()
  const { userId } = sessionUser

  const readMessages = await Message.find({recipient : userId, read : true}).sort({createdAt : -1})
    .populate('sender', 'username').populate('property', 'name').lean()

  const unReadMessages = await Message.find({recipient : userId, read : false}).sort({createdAt : -1})
    .populate('sender', 'username').populate('property', 'name').lean()

  const messages = [...readMessages, ...unReadMessages].map((messageDoc)=>{
    const message = convertToSerializableObject(messageDoc)
    message.sender = convertToSerializableObject(messageDoc.sender)
    message.property = convertToSerializableObject(messageDoc.property)
    return message
  })

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">
                Your messages 
            </h1>
            <div className="space-y-4">
                { messages.length === 0 ? (
                    <p>You have no messages</p>
                ) : (
                    messages.map((message)=>{
                        return <MessageCard key={message._id} message={message} />
                    })
                )}
            </div>
        </div>
      </div>
    </section>
  )
}
