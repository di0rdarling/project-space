import React from 'react';
import Layout from '../common/layout';
import ProjectsContainer from './projectsContainer';
import { ProjectListProvider } from '../../context/projectsContext';

export default function MyProjectsPageContainer() {

    return (
        <ProjectListProvider>
            <Layout>
                <ProjectsContainer />
            </Layout>
        </ProjectListProvider>
    )
}