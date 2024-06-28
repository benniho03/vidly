import { MachineLearningForm } from "./mlForm";


export default async function Prediction() {
    return (
        <div>
            <div className="hero">
                <img src="/assets/hero-ki.jpg" />
            </div>
            <div className="container mx-auto px-20">
                <div className="background mb-20">
                    <div className="background-bg bg-indigo-950"></div>
                    <h1>Prediction</h1>
                    <p>You have created your video. Now you want to know how many likes, comments and views your video will generate? Then take a look at our Prediction Tool! Just enter your videos information and find out how successful your video will be</p>
                    <button type="button" className="text-white bg-fuchsia-800 hover:bg-fuchsia-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-fuchsia-800 dark:hover:bg-fuchsia-500 dark:focus:ring-gray-700 dark:border-gray-700">more</button>
                    <div className="pictures flex space-x-4">

                        <div className="picture-one">
                            <img src="/assets/ki-image-1.jpg" />
                        </div>
                        <div className="picture-two">
                            <img src="/assets/ki-image-2.jpg" />
                        </div>
                    </div>
                </div>
                <MachineLearningForm />
            </div>
        </div>
    );
}
