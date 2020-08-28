import React from "react";
import Layout from "../components/common/layout";
import { ProjectProvider } from "../context/projectsContext";
import ProjectContainer from "../components/projects/projectContainer";

export default function ProjectPageContainer(props) {
  const {
    match: { params },
  } = props;

  return (
    <Layout>
      <ProjectProvider id={params.id}>
        <ProjectContainer />
      </ProjectProvider>
    </Layout>
  );
}
