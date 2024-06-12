import { redirect } from "next/navigation";

export default async function ResearchPage() {
    return <>
        <form action={redirectToKeywordPage}>
            <input type="text" name="keyword" className="text-neutral-900" />
            <button type="submit">Search</button>
        </form>
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