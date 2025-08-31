import DetailBlogClient from "./DetailBlogClient";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    return <DetailBlogClient id={id} />;
}
