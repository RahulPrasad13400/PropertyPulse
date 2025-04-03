import PropertyCard from "@/components/PropertyCard"
import connectDB from "@/config/database"
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"

export default async function SavedPropertiesPage() {
  const { userId } = await getSessionUser()
  const { bookmarks } = await User.findById(userId).populate('bookmarks')
  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">
            Saved Properties
        </h1>
        {bookmarks.length === 0 ? ( <p>No Saved Properties</p> ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                { bookmarks.map((property)=>{
                    return <PropertyCard key={property._id} property={property} />
                })}
            </div>
        )}
      </div>
    </section>
  )
}
