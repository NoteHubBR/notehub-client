'use client';

import { createContext, useCallback, useState } from "react";

interface UserHistoryProps {
  history: string[];
  setHistory: (displayNames: string[]) => void;
  clearHistory: () => void;
}

const UserHistoryContext = createContext<UserHistoryProps>({} as any);

export const UserHistoryProvider = (props: any) => {

  const initialState = {
    history: [] as string[]
  }

  const [state, setState] = useState(initialState);

  const clear = useCallback(() => { return setState(initialState) }, []);

  const setter = useCallback((displayNames: string[]) => {
    return setState({ history: displayNames })
  }, [state])

  return (
    <UserHistoryContext.Provider value={{
      history: state.history,
      setHistory: setter,
      clearHistory: clear
    }}>
      {props.children}
    </UserHistoryContext.Provider>
  )

}

export default UserHistoryContext;