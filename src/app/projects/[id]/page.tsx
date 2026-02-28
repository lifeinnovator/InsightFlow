import { redirect } from "next/navigation";

export default function ProjectPage({ params }: { params: { id: string } }) {
    // Redirect to the responses dashboard by default when accessing /projects/[id]
    redirect(`/projects/${params.id}/responses`);
}
