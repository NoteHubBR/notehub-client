'use client';

import { createContext, useCallback, useMemo, useState } from "react";
import { Subscription } from "@/core";

export interface UserSubscriptionsProps {
    subscriptions: Subscription[];
    setSubscriptions: (subscriptions: Subscription[]) => void;
    clearSubscriptions: () => void;
}

const UserSubscriptionsContext = createContext<UserSubscriptionsProps>({} as any);

export const UserSubscriptionsProvider = (props: any) => {

    const initialState = useMemo(() => ({
        subscriptions: [] as Subscription[]
    }), [])

    const [state, setState] = useState(initialState);

    const setter = useCallback((subscriptions: Subscription[] | []): void => {
        return setState({ subscriptions: subscriptions });
    }, [])

    const clear = useCallback(() => { setState(initialState) }, [initialState]);

    return (
        <UserSubscriptionsContext.Provider value={{
            subscriptions: state.subscriptions,
            setSubscriptions: setter,
            clearSubscriptions: clear
        }}>
            {props.children}
        </UserSubscriptionsContext.Provider>
    )

}

export default UserSubscriptionsContext;