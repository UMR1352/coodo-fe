import { Accessor, Show, createContext, createSignal, useContext } from "solid-js";
import { z } from "zod";
import { get } from "../api";
import { Outlet } from "@solidjs/router";

export const SessionValidator = z.object({
    id: z.string().uuid(),
    handle: z.string(),
});

type Session = z.infer<typeof SessionValidator>;
export type User = Session;

type SessionContext = {
    session: Accessor<Session>,
}

export const SessionContext = createContext<SessionContext>();

export function useSessionContext(): SessionContext {
    const ctx = useContext(SessionContext);
    if (ctx == undefined) {
        throw new Error("`useSessionContext` can only be used inside a SessionContextProvider");
    }

    return ctx;
}

async function getSession(): Promise<Session | undefined> {
    try {
        const resBody = await get("/session").then(res => res.json());
        return SessionValidator.parse(resBody);
    } catch (e) {
        console.error("Failed to get session. Reason: " + e);
    }

}

export function SessionProvider(props: { children: any }) {
    const [session, setSession] = createSignal<Session | undefined>();
    getSession().then(session => setSession(session));

    return (
        <Show when={session()} fallback={<div></div>}>
            <SessionContext.Provider value={{ session: session as Accessor<Session> }}>
                {props.children}
            </SessionContext.Provider>
        </Show>
    );
}