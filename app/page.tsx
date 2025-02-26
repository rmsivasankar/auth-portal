import Image from "next/image";


export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Left Image Section */}
      <div className="w-1/3 bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/dark-black-background-design-with-stripes_1017-38064.jpg?semt=ais_hybrid')" }}>
        {/* Optional: Add overlay or content here */}
      </div>

      {/* Center Content Section */}
      <div className="flex items-center justify-center p-6 w-1/2">
        <div className="max-w-2xl text-center bg-gray-800 shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Welcome to the Umbrella Corporation</h1>
          <p className=" flex text-gray-300 mb-6">
            Your gateway to advanced bioweaponry and secure operations. 
            Login or Sign up to continue and access classified information.
          </p>
          <Image 
            src="/wallpaper/Umbrella.webp" 
            alt="Umbrella Corporation" 
            className="w-full h-64 object-cover rounded-lg mb-6"
            width={400}
            height={300}
          />
        </div>
      </div>

      {/* Right Image Section */}
      <div className="w-1/3 bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/dark-black-background-design-with-stripes_1017-38064.jpg?semt=ais_hybrid')" }}>
        {/* Optional: Add overlay or content here */}
      </div>
    </div>
  );
}