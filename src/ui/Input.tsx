import clsx from "clsx";

export function TextInput(props) {
    let myRef;
    return (
        <input
            class={clsx(
                "bg-transparent border-b-4 border-transparent text-inherit",
                "focus:border-purple-500 focus:ring-0 ring-0 outline-none block w-fit",
                props.class,
            )}
            ref={el => {props.ref = el; myRef = el}}
            type="text"
            value={props.value}
            onChange={props.onChange}
            onFocusOut={props.onFocusOut}
            onKeyDown={e => e.key == "Enter" && myRef.blur()}
            onClick={() => myRef.setSelectionRange(0, props.value.length)}
        />
    );
}