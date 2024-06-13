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
                    <h1>Ki-Helper</h1>
                    <p>Here you can find all the information you need to know about video uploading.</p>
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
                <form action={redirectToKeywordPage}>
                    <input type="text" name="keyword" className="text-neutral-900" />
                    <button type="submit">Search</button>
                </form>
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