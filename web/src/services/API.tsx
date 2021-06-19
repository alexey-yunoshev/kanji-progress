import {createContext, useContext} from "react";

export interface ApiProviderInterface {
}

export const Context = createContext<ApiProviderInterface | null>(null);

export function ApiProvider({children}: any) {
    return (
        <Context.Provider value={null}>
            {children}
        </Context.Provider>
    )
}

export function useApiProvider(): ApiProviderInterface {
    return useContext(Context) as ApiProviderInterface;
}
