export default function GET() {
    return new Response("Hello, world!")
}
export async function getResearchData(formData: FormData) {
    const searchTerm = formData.get("searchTerm") as string
    if (!searchTerm || typeof searchTerm !== "string")
        throw new Error("Invalid search term")
    console.log(searchTerm)
}