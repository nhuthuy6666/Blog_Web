import ChangePassword from "@/app/changepassword/[id]/changepassword";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ChangePassword id={id} />;
}
