import FollowClient from "@/app/follow/[id]/FollowClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <FollowClient id={id} />;
}
