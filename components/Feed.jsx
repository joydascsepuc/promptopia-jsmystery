"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [prompts, setPrompts] = useState([]);

    const handleSearchChange = async (e) => {
        setSearchText(e.value);
    };

    const PromotCardList = ({ data, handleTagClick }) => {
        return (
            <div className="mt-16 prompt_layout">
                {data.map((prompt) => {
                    return (
                        <PromptCard
                            key={prompt._id}
                            prompt={prompt}
                            handleTagClick={handleTagClick}
                        />
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`api/prompt`);
            const data = await response.json();

            setPrompts(data);
        };

        fetchPrompts();
    }, []);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a username or tag"
                    value={searchText}
                    className="search_input peer"
                    onChange={handleSearchChange}
                    required
                />
            </form>
            <PromotCardList data={prompts} handleTagClick={() => {}} />
        </section>
    );
};

export default Feed;
