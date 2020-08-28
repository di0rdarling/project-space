import React from "react";
import Layout from "../components/common/layout";
import ProjectsContainer from "../components/projects/projectsContainer";
import { ProjectListProvider } from "../context/projectsContext";

export default function MyProjectsPage() {
  return (
    <ProjectListProvider>
      <Layout>
        <ProjectsContainer />
      </Layout>
    </ProjectListProvider>
  );
}
