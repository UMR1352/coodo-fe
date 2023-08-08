import { createResource, type Component, Switch, Match } from 'solid-js';
import { Router, Routes, Route, Outlet, Navigate } from '@solidjs/router';

import { SessionProvider } from './contexts/session';
import Home from './pages/home';
import NotFound from './errors/404';
import { Layout } from './ui/Layout';
import { ThemeContextProvider } from './contexts/theme';
import { TodoPage } from './pages/todo';
import { TodoContextProvider } from './contexts/todoList';
import { post } from './api';

const App: Component = () => {
  return (
    <SessionProvider>
      <ThemeContextProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" component={Home} />
              <Route path="/todos/:id" element={<TodoContextProvider><TodoPage /></TodoContextProvider>} />
              <Route path="/todos/" component={CreateTodo} />
              <Route path="not-found" component={NotFound} />
            </Routes>
          </Layout>
        </Router>
      </ThemeContextProvider>
    </SessionProvider>
  );
};

export default App;

function CreateTodo() {
  const [id] = createResource<string>(async () => post("/todos").then(res => res.json()));

  return (
    <Switch>
      <Match when={id.loading || id.error}>
        <Outlet />
      </Match>
      <Match when={!id.loading && !id.error}>
        <Navigate href={`/todos/${id()}`} />
      </Match>
    </Switch>
  );
}

