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
          <img 
            src="https://steamuserimages-a.akamaihd.net/ugc/2046357221769666387/C6C48D1EEC0412637F6D4970B5D639B7B0F14F6A/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true" 
            alt="Umbrella Corporation" 
            className="w-full h-64 object-cover rounded-lg mb-6" 
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