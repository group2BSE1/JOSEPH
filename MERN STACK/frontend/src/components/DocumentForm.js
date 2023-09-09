import { useState } from "react";

const DocumentForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [size, setSize] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    const document = {title,description,author,size}

    const response = await fetch('/api/documents',{
      method: "POST",
      body: JSON.stringify(document),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setTitle('')
      setAuthor('')
      setDescription('')
      setSize('')
      setError(null)
      console.log('new document added', json)
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Document</h3>

      <label>Document Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Decsription: </label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label>Author: </label>
      <input
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
      />

      <label>Size (KB): </label>
      <input
        type="number"
        onChange={(e) => setSize(e.target.value)}
        value={size}
      />

      <button>Add Document</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default DocumentForm