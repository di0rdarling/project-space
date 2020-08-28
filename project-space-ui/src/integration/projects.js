import axios from "axios";

export async function createProject(project) {
  let url = "http://localhost:3001/project";
  try {
    const resp = await axios.post(url, project);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updateProject(project) {
  // let url = `http://localhost:3001/project/${project._id}`;
  // try {
  //   const resp = await axios.put(url, project);
  //   return resp.data;
  // } catch (err) {
  //   console.log(err);
  // }
  console.log("project", project);
}

export async function getProject(id) {
  let url = `http://localhost:3001/project/${id}`;
  // try {
  //   const resp = await axios.get(url);
  //   console.log("res", resp);
  //   return resp.data;
  // } catch (err) {
  //   console.log(err);
  // }
  return projectsMockData[0];
}

export async function getAllProjects() {
  let url = "http://localhost:3001/projects";
  return projectsMockData;
  // try {
  //     const resp = await axios.get(url);
  //     console.log(resp.data)
  //     return resp.data
  // } catch (err) {
  //     console.log(err)
  // }
}

const projectsMockData = [
  {
    _id: 1,
    name: "Project 1",
    description: "Project 2",
    modifiedDateTime: "2009-09-28T19:03:12Z",
    createdDateTime: "2009-09-28T19:03:12Z",
    tasks: null,
    notes: null,
    resources: null,
  },
];
