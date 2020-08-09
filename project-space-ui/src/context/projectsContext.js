import React, { useEffect } from 'react';
import { getAllProjects, getProject } from '../integration/projects';

const ProjectListStateContext = React.createContext(undefined);
const ProjectStateContext = React.createContext(undefined);
const ProjectDispatchContext = React.createContext(undefined);

function projectReducer(state, action) {

    switch (action.type) {
        case 'set project':
            return action.payload;
        case 'update project':
            return { ...state, [action.payload.key]: action.payload.value };
        default:
            throw new Error(`ERROR: Unable to perform project reducer action "${action.type}`)
    }
}

export function ProjectProvider(props) {

    const [state, dispatch] = React.useReducer(projectReducer, {});

    useEffect(() => {
        const fetch = async () => {
            let project = await getProject(props.id);
            console.log("Project", project)
            if (project) {
                dispatch({
                    type: 'set project',
                    payload: project
                })
            }
        }
        if (props.id) {
            fetch()
        }
    }, [props.id])

    return (
        <ProjectStateContext.Provider value={state}>
            <ProjectDispatchContext.Provider value={dispatch}>
                {props.children}
            </ProjectDispatchContext.Provider>
        </ProjectStateContext.Provider>
    )
}

export function NewProjectProvider(props) {

    const [state, dispatch] = React.useReducer(projectReducer, {});

    useEffect(() => {
        dispatch({
            type: 'set project',
            payload: {}
        })
    }, [])

    return (
        <ProjectStateContext.Provider value={state}>
            <ProjectDispatchContext.Provider value={dispatch}>
                {props.children}
            </ProjectDispatchContext.Provider>
        </ProjectStateContext.Provider>
    )
}

export function useProjectState() {
    const context = React.useContext(ProjectStateContext)
    if (context === undefined) {
        throw new Error('useProjectState must be used within a NewProjectProvider')
    }
    return context
}

export function useProjectDispatch() {
    const context = React.useContext(ProjectDispatchContext)
    if (context === undefined) {
        throw new Error('useProjectDispatch must be used within a NewProjectProvider')
    }
    return context
}

export function useProject() {
    return [useProjectState(), useProjectDispatch()]
}

/// < ---------- PROJECT LIST --------- >

function projectListReducer(action) {

    switch (action.type) {
        case 'set projects':
            return action.payload;
        default:
            throw new Error(`ERROR: Unable to perform reducer action "${action.type}`)
    }
}

export function ProjectListProvider(props) {

    const [state, dispatch] = React.useReducer(projectListReducer, []);
    useEffect(() => {

        async function fetch() {
            let projects = await getAllProjects();
            if (projects) {
                dispatch({
                    type: 'set projects',
                    payload: projects
                })
            }
        }
        fetch();
    }, [])

    return (
        <ProjectListStateContext.Provider value={state}>
            {props.children}
        </ProjectListStateContext.Provider>
    )
}

export function useProjectListState() {
    const context = React.useContext(ProjectListStateContext)
    if (context === undefined) {
        throw new Error('useProjectListState must be used within a ProjectListProvider')
    }
    return context
}

export function useProjectListDispatch() {
    const context = React.useContext(ProjectDispatchContext)
    if (context === undefined) {
        throw new Error('useProjectListDispatch must be used within a ProjectListProvider')
    }
    return context
}

