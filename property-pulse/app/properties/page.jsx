// import properties from '@/properties.json'
import PropertyCard from '@/components/PropertyCard'
import connectDB from '@/config/database'
import Property from '@/models/Property'

export default async function PropertiesPage() {

  await connectDB() 
  const properties = await Property.find().lean() // lean help in optimizing performance

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.lemgth === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'> 
            {properties.map((property)=>{
              return <PropertyCard property={property} key={property._id}  />
            })}
          </div>
        )}
      </div>
    </section>
  )
}
