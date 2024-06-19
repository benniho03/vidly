import { MachineLearningForm } from "./mlForm";


export default async function KiHelper() {
    return (
        <div>
            <div className="hero">
                <img src="/assets/hero-ki.jpg" />
            </div>
            <div className="container mx-auto px-20">
                <div className="background mb-20">
                    <div className="background-bg bg-indigo-950"></div>
                    <h1>Ki-Helper</h1>
                    <p>Here you can find all the information you need to know about video uploading.</p>
                    <button type="button" className="text-white bg-fuchsia-800 hover:bg-fuchsia-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-fuchsia-800 dark:hover:bg-fuchsia-500 dark:focus:ring-gray-700 dark:border-gray-700">more</button>
                    <div className="pictures flex space-x-4">

                        <div className="picture-one">
                            <img src="/assets/ki-image-1.jpg" />
                        </div>
                        <div className="picture-two">
                            <img src="/assets/ki-image-2.jpg" />
                        </div>
                        <MachineLearningForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
