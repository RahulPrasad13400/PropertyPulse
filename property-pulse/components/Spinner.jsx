'use client';
import ClipLoader from 'react-spinners/ClipLoader'

export default function Spinner() {

  const override = {
    display : 'block',
    margin : '100px auto',
  } 

  return (
    <div className='h-screen flex items-center justify-center'>
      <ClipLoader color='#3b82f6' cssOverride={override} size={150} aria-label='Loading Spinner' />
    </div>
  )
}
