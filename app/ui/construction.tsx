import Image from "next/image";

export default function PageEnConstruction() {
  return (
    <div className="relative w-full">
          <div className="fixed inset-0">
              <Image
                  src="/page_en_construction.jpg"
                  fill={true}
                  alt="Page en construction"
                  className="object-cover blur-md"
                  loading="eager"
              />
          </div>
          <div className="absolute flex items-center flex-col">
              <h1 className="font-bold mb-20 text-4xl">Page en construction</h1>
              <Image
                  src="/page_en_construction.jpg"
                  width={1200}
                  height={800}
                  alt="Page en construction"
                  className="object-cover w-full h-auto rounded"
                  loading="eager"
              />
 

          </div>
      </div>
  );
}