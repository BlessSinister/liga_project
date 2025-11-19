import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from 'app/taskList/TaskList';
import AddTask from 'app/addTask/AddTask';
import EditTask from 'app/editTask/EditTask';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
