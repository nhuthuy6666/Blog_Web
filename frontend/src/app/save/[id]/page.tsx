import SaveClient from "@/app/save/[id]/SaveClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <SaveClient id={id} />;
}
