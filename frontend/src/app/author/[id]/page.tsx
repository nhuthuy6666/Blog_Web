import AuthorClient from "@/app/author/[id]/AuthorClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <AuthorClient id={id} />;
}
