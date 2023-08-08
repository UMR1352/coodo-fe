import { Accessor, createContext, createSignal, useContext } from "solid-js";
import { z } from "zod";
import { get } from "../api";

export const SessionValidator = z.object({
    id: z.string().uuid(),
    handle: z.string(),
});

type Session = z.infer<typeof SessionValidator>;
export type User = Session;

type SessionContext = {
    session: Accessor<Session | undefined>,
}

export const SessionContext = createContext<SessionContext>();

export function useSessionContext() {
    return useContext(SessionContext);
}

async function getSession(): Promise<Session> {
    try {
        const resBody = await get("/session").then(res => res.json());
        return SessionValidator.parse(resBody);
    } catch (e) {
        console.error("Failed to get session. Reason: " + e);
    }

}

export function SessionProvider(props) {
    const [session, setSession] = createSignal<Session | undefined>();
    getSession().then(session => setSession(session));

    return (
        <SessionContext.Provider value={{ session }}>
            {props.children}
        </SessionContext.Provider>
    );
}