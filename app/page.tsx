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
      <a>Globalie - English tutoring platform</a>
      <div>
      <br />How it works:
      <br />1. Login
      <br />2. Matching a student with a teacher, manualy or randomly
      <br />3. English learning via one-on-one audio call (via Amazon Chime)
      <br />4. Audio conversation is converted to text for ease of learning (via a speech-to-text program)
      <br />5. AI-driven guidance to lead teacheres (TBD)
      <br />6. Text is monitored for inappropreate contents for a safe learning environment (via a content-monitoring program)
      </div>
      <div>
      <br />Social impacts:
      <br />1. Low-cost English learning platform 🥳--- More frequent learning opportunities
      <br />2. English learning from situation-based "chats" 🥳--- Practical communication for specific situations (e.g., business, school, private)
      <br />3. AI-driven teaching guidance 🥳--- Anyone with English fluency can teach, rejoining labor force towards a better society!
      </div>
      <br />
      <button onClick={createTodo}>Start-up business milestones (all incomplete)</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        App hosted by AWS Amplify. 
        <br />
        <a href="mailto:info@globalie.us">
          Send message
        </a>
      </div>
    </main>
  );
}
