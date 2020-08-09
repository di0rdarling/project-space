import axios from 'axios';

export async function createProject(project) {
    let url = 'http://localhost:3001/project'
    try {
        const resp = await axios.post(url, project);
        return resp.data
    } catch (err) {
        console.log(err)
    }
}

export async function getProject(id) {
    let url = `http://localhost:3001/project/${id}`
    try {
        const resp = await axios.get(url);
        console.log("res", resp)
        return resp.data
    } catch (err) {
        console.log(err)
    }
}

export async function getAllProjects() {
    let url = 'http://localhost:3001/projects'
    try {
        const resp = await axios.get(url);
        return resp.data
    } catch (err) {
        console.log(err)
    }
}