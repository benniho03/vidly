import { redirect } from "next/navigation";

export default async function ResearchPage() {
    return <>
        <div>
            <div className="hero">
                <img src="/assets/research-hero.jpg" />
            </div>
            <div className="container mx-auto px-20">
                <div className="background mb-20">
                    <div className="background-bg bg-neutral-700"></div>
                    <h1>RESEARCH</h1>
                    <p>Welcome to our research page. With our search functions you have the possibility to search for a topic of your choice. Existing YouTube videos will then be displayed. But also when is the perfect time to upload a video with your search term so that it reaches as many users on YouTube as possible.</p>
                    <button type="button" className="text-white bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700">more</button>
                    <div className="pictures flex space-x-4">
                    
                        <div className="picture-one">
                        <img src="/assets/research-image-1.jpg" />
                        </div>
                        <div className="picture-two">
                        <img src="/assets/research-image-2.jpg" />
                        </div>
                    
                    </div>
                </div>
                <div className="searchform">
                    <h2>Search for your favorite topic</h2>
                    <p className="mb-8">Enter a search term of your choice and view the results.</p>
                <form action={redirectToKeywordPage}>
                    <input type="text" name="keyword" className="w-full text-neutral-900 font-medium text-sm px-5 py-2.5  mb-2 " />
                    <button className="w-1/6 text-white bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700" type="submit">Search</button>
                </form>
                </div>
            </div>
        </div>

    </>
}

async function redirectToKeywordPage(formData: FormData) {
    "use server"
    const keyword = formData.get("keyword");
    if (!keyword) {
        return;
    }

    redirect(`/research/${keyword}`);
}