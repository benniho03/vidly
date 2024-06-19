"use client"

export function MachineLearningForm() {
    return <form action={sendForm}>
        <input type="text" placeholder="title" name="title" className="text-neutral-800" />
        <input type="text" placeholder="description" name="description" className="text-neutral-800" />
        <input type="text" placeholder="duration" name="duration" className="text-neutral-800" />
        <input type="text" placeholder="publishedAt" name="publishedAt" className="text-neutral-800" />
        <input type="text" placeholder="channelUrl" name="channelUrl" className="text-neutral-800" />
        <button type="submit">Submit</button>
    </form>
}

async function sendForm(formData: FormData) {
    const title = formData.get("title");
    const description = formData.get("description");
    const duration = formData.get("duration");
    const publishedAt = formData.get("publishedAt");
    const channelUrl = formData.get("channelUrl");

    const channel = {
        subscriberCount: 0,
        videoCount: 0,
        totalChannelViews: 0
    } // ersetzen dann noch ne

    const res = await fetch("")

}