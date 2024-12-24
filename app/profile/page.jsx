"use client";

import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const { data: session } = useSession();
    const [prompts, setPrompts] = useState([]);

    const router = useRouter();

    const handleEdit = (prompt) => {
        router.push(`update-prompt?id=${prompt._id}`);
    };
    const handleDelete = async (prompt) => {
        const hasConfirmed = confirm("Delete?");
        if (hasConfirmed) {
            try {
                await fetch(`api/prompt/${prompt._id.toString()}`, {
                    method: `DELETE`,
                });

                const filteredPrompts = prompts.filter(
                    (p) => p._id !== prompt._id
                );
                setPrompts(filteredPrompts);
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
            }
        }
    };

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setPrompts(data);
        };

        if (session?.user.id) {
            fetchPrompts();
        }
    }, []);

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized Profile"
            data={prompts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default ProfilePage;
