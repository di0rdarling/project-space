import React from 'react';
import Layout from '../common/layout';
import { ProjectProvider } from '../../context/projectsContext';
import ProjectContainer from './projectContainer'

export default function ProjectPageContainer(props) {

    const { match: { params } } = props;

    return (
        <Layout>
            <ProjectProvider id={params.id}>
                <ProjectContainer />
            </ProjectProvider>
        </Layout >
    )
}