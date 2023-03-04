import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grommet, Page, PageContent, Box, TextInput, Button, DataTable,Heading } from 'grommet'
import { Trash, StatusGood, StatusCritical } from 'grommet-icons'

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/todos', { title })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.log(err));
    setTitle('');
  };

  const handleComplete = (id, completed) => {
    axios.put(`http://localhost:3001/todos/${id}`, { completed: completed })
      .then(res => setTodos(todos.map(todo => todo.id === id ? res.data : todo)))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(err => console.log(err));
  };
  return (
    <Grommet full >
      <Heading margin="small" level={3}>PostgreSQL Demo App - ToDo</Heading>
      <Page>
        <PageContent>
          <Box align="center" justify="center" direction="row" pad="small" gap="medium">
            <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button label="Add Todo" onClick={handleSubmit} />
          </Box>
          <Box align="center" justify="center">
            <DataTable
              columns={[
                { header: "ToDo ID", property: "id", primary: true },
                { header: "Todo Title", property: "title" },
                { header: "Completed", property: "completed", render: (datum)=>(
                  <Box>
                    {datum['completed'] && <StatusGood color='status-ok'/>}
                    {!datum['completed'] && <StatusCritical color='status-critical' />}
                  </Box>
                ) },
                {
                  property: "completed", header: "Action", render: (datum) => (
                    <Box direction='row' gap="small">
                      
                      <Button tip="Delete" icon={<Trash />} primary onClick={()=>{
                        handleDelete(datum['id'])
                      }}/>
                      <Button tip="Complete" icon={<StatusGood />} primary onClick={()=>{
                        handleComplete(datum['id'], true)
                      }}/>
                      <Button tip="Move to TODO" icon={<StatusCritical />} primary onClick={()=>{
                        handleComplete(datum['id'], false)
                      }}/>
                    </Box>
                  )
                }]}
              data={todos} step={50} />
          </Box>
        </PageContent>
      </Page>
    </Grommet>
  )
  // return (
  //   <div className="App">
  //     <h1>Todo List</h1>
  //     <form onSubmit={handleSubmit}>
  //       <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
  //       <button type="submit">Add</button>
  //     </form>
  //     <ul>
  //       {todos.map(todo => (
  //         <li key={todo.id}>
  //           <input type="checkbox" checked={todo.completed} onChange={() => handleComplete(todo.id, todo.completed)} />
  //           <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
  //           <button onClick={() => handleDelete(todo.id)}>Delete</button>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}

export default App;
