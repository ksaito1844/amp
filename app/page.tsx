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
      <div>
      <br /><b>Globalie - Language tutoring platform</b>
      <br />How it works:
      <br />1. Log in as a student or a teacher
      <br />2. Get paired with a teacher instantly
      <br />3. Learn English via one-on-one audio call (via Agora)
      <br />4. Audio conversation is converted to text for ease of learning (via Azure AI Speed)
      <br />5. AI-driven guidance for teachers toward optimized learning (TBD)
      <br />6. The text is monitored for inappropreate contents for a safe learning environment (via Azure AI Search)
      </div>
      <div>
      <br />Social impacts:
      <br />1. Low cost language learning platform 🥳--- More frequent learning opportunities
      <br />2. Language learning from situation-based "chats" 🥳--- Practical communication for specific situations (e.g., business, school, private)
      <br />3. AI-driven teaching guidance 🥳--- Anyone fluent in the language can teach, rejoining the labor force to make the society a better place!
      </div>
      <div>
      <br />
        App hosted by AWS Amplify. 
        <br />
        <a href="mailto:info@globalie.us">
          Send message
        </a>
      </div>
    </main>
  );
}
