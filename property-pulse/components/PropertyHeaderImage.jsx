import Image from "next/image";

export default function PropertyHeaderImage({image}) {
  return (
    <section>
      <div class="container-xl m-auto">
        <div class="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            class="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  )
}
