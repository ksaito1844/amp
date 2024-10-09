"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Ideas for improvement"),
    });
  }

  return (
    <main>
      <h1>Globalie - English tuturing platform (under construction)</h1>
      <br />How it works:
      <br />1. Login
      <br />2. Matching between student and teacher
      <br />3. English learning via one-on-one audio call
      <br />4. Audio is converted to text for ease of learning
      <br />5. AI-driven guidance for teaching materials
      <br />6. Text is monitored for inappropreat contents for safe learning environment

      <button onClick={createTodo}>Please share your idea for improvement!</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted by AWS Amplify. 
        <br />
        <a href="mailto:info@globalie.us">
          Send message
        </a>
      </div>
    </main>
  );
}
