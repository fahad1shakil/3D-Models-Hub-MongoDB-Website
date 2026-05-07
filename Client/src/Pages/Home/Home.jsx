
import { useLoaderData } from "react-router";
import Banner from "../../components/Banner";
import { ModelCard } from "../../components/ModelCard";
const Home = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <Banner/>

             <div className="text-center text-3xl font-bold mt-12 mb-8">Latest Models</div>

             {data && data.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                 {data.map(model => <ModelCard key={model._id} model={model}/>)}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-base-200/50 rounded-2xl mx-auto max-w-4xl">
                 <div className="text-5xl mb-4">📭</div>
                 <h3 className="text-xl font-bold text-gray-700">No Models Found</h3>
                 <p className="text-gray-500 mt-2">There are currently no 3D models available. Please check back later!</p>
               </div>
             )}
            
        </div>
    );
};

export default Home;