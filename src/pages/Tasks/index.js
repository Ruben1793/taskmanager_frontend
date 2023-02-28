import React, {useEffect} from 'react';
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import TaskListItem from "./TaskListItem-starter";
import useRequestResource from "../../hooks/useRequestResource";

const results = [
    {
        id: 1,
        title: "Task 1",
        category_name: "Cat 1",
        category_color: "697689",
        priority: 1
    },
    {
        id: 2,
        title: "Task 2",
        category_name: "Cat 2",
        category_color: "ff8a65"
    }
]
export default function Tasks() {
    const {resourceList, getResourceList} = useRequestResource({endpoint: "tasks"});

    useEffect(()=> {
        getResourceList();
    },[getResourceList]);

    return <div>
        <Box src={{display: "flex", justifyContent: "flex-end", mb:3, mt:3}}>
            <Button component={Link} variant="contained" color="primary" to="/tasks/create">
                Create Task
            </Button>
        </Box>
        {resourceList.results.map((task) => {
            return <div key={task.id}>
                    <TaskListItem task={task} />
                </div>
        })}
    </div>
}