import clsx from "clsx";

export function UserAvatar(props) {
    const [a, b, c] = props.userHandle?.split("-").map(word => word[0]) ?? ['x', 'x', 'x'];
    const color = randomColor();

    return (
        <div
            class={clsx(
                "w-10 h-10 rounded-full shadow-md flex flex-col text-center font-bold",
                "justify-center uppercase pt-1 leading-none items-center border-2",
                props.isMe ? "border-purple-500" : color,
            )}
        >
            {`${a}${b}`}<br/>
            {c}
        </div>
    );
}

const randomColor = (): string => {
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
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}