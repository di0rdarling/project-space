import React, { useEffect } from 'react';
import { resources } from '../data/resources';

const ResourcesListStateContext = React.createContext(undefined);
const ResourcesListDispatchContext = React.createContext(undefined);

function resourcesListReducer(state, action) {

    switch (action.type) {
        case 'set resources':
            return action.payload;
        case 'create resource':
            return action.payload;
        case 'delete resource':
            let newResources = state.filter((resource) => resource.id !== action.id)
            return newResources;
        case 'add linked resource':
            return action.payload;
        case 'remove additional note':
            return action.payload;
    }
}

export function ResourceListProvider(props) {

    const [state, dispatch] = React.useReducer(resourcesListReducer, []);



    useEffect(() => {
        resources.sort((a, b) => {
            return a.id - b.id;
        })
        dispatch({
            type: 'set resources',
            payload: resources
        })
    }, [])

    return (
        <ResourcesListStateContext.Provider value={state}>
            <ResourcesListDispatchContext.Provider value={dispatch}>
                {props.children}
            </ResourcesListDispatchContext.Provider>
        </ResourcesListStateContext.Provider>
    )

}

export function useResourcesListState() {
    const context = React.useContext(ResourcesListStateContext)
    if (context === undefined) {
        throw new Error('useResourcesListState must be used within a ResourcesListProvider')
    }
    return context
}

export function useResourcesListDispatch() {
    const context = React.useContext(ResourcesListDispatchContext)
    if (context === undefined) {
        throw new Error('useResourcesListDispatch must be used within a ResourceListProvider')
    }
    return context
}
