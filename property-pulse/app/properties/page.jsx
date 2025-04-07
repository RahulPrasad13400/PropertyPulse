// import properties from '@/properties.json'
import PropertyCard from '@/components/PropertyCard'
import connectDB from '@/config/database'
import Property from '@/models/Property'
import Pagination from '@/components/Pagination'

// searchparams to get the ?page=1 from the url for pagination
export default async function PropertiesPage({searchParams : { page = 1, pageSize = 9}}) {
  await connectDB() 

  const skip = (page-1)*pageSize
  const total = await Property.countDocuments({})

  const showPagination = total > pageSize

  // const properties = await Property.find().lean() // lean help in optimizing performance
  const properties = await Property.find({}).skip(skip).limit(pageSize)

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
        {showPagination && <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={total} />}
        
      </div>
    </section>
  )
}
