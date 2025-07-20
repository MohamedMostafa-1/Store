import ProductDetails from "@/Components/ProductDetails";

const page = ({ params }) => {
  return (
    <div>
      <ProductDetails params={params} />
    </div>
  );
};

export default page;
























// import ProductDetails from '@/Components/ProductDetails';

// const page = ({ params }) => {
//   console.log("params inside [id]/page.jsx ===>", params);

//   return (
//     <div>
//       <h1>Product ID: {params.id}</h1>
//       <ProductDetails params={params} />
//     </div>
//   );
// };

// export default page;




// import Image from 'next/image';
// import data from '../../API/data.json';
// import { notFound } from 'next/navigation';

// export default function Page({ params }) {
//   const id = params.id;
//   const product = data.products.find((p) => p.id === Number(id));

//   if (!product) {
//     notFound();
//   }

//   return (
//     <div className="container py-12">
//       <div className="flex flex-col md:flex-row gap-12">
//         {/* Image */}
//         <div className="relative w-full md:w-1/2 h-[500px]">
//           <Image
//             src={product.image1}
//             alt={product.name}
//             fill
//             sizes="100vw"
//             className="object-cover rounded-md"
//           />
//         </div>

//         {/* Details */}
//         <div className="flex flex-col gap-4 md:w-1/2">
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="text-xl text-[#F35C7A] font-semibold">${product.price}</p>
//           <p className="text-gray-600">{product.description}</p>

//           <button className="mt-4 rounded-2xl ring-1 ring-[#F35C7A] text-[#f35c7a] px-6 py-3 text-sm w-max hover:bg-[#F35C7A] hover:text-white">
//             Add To Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
