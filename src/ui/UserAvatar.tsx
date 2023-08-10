import clsx from "clsx";
import { createMemo } from "solid-js";

type UserAvatarProps = {
    userHandle: string,
    class?: string
    isMe: boolean,
    onClick?: Function,
}

export function UserAvatar(props: UserAvatarProps) {
    const initials = createMemo(() => props.userHandle.split("-").map(word => word[0]));
    const color = getUserColor(props.userHandle);

    return (
        <div
            class={clsx(
                "w-10 h-10 rounded-full shadow-md flex flex-col text-center font-bold",
                "justify-center uppercase leading-none items-center pt-0.5 border-2",
                props.isMe ? "border-purple-500" : color,
                props.class,
            )}
            onClick={(e) => props.onClick ? props.onClick(e) : (() => {})}
        >
            {`${initials()[0]}${initials()[1]}`}<br/>
            {initials()[2]}
        </div>
    );
}

const getUserColor = (id: string): string => {
    const colors = [
        "border-red-500",
        "border-orange-500",
        "border-amber-500",
        "border-yellow-500",
        "border-lime-500",
        "border-green-500",
        "border-emerald-500",
        "border-teal-500",
        "border-cyan-500",
        "border-sky-500",
        "border-blue-500",
        "border-indigo-500",
        "border-violet-500",
        "border-fuchsia-500",
        "border-pink-500",
        "border-rose-500",
    ];
    const index = hash(id) % colors.length;
    return colors[index];
}

function hash(str: string) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
}