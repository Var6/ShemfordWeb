"use client";
import { useState } from "react";

export default function FacilitiesAdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("academic");
  const [image, setImage] = useState("");
  const [icon, setIcon] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");

  function addFeature() {
    if (featureInput) {
      setFeatures([...features, featureInput]);
      setFeatureInput("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/facilities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category, image, icon, features }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2" />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2">
        <option value="academic">Academic</option>
        <option value="arts">Arts</option>
        <option value="sports">Sports</option>
        <option value="wellness">Wellness</option>
      </select>
      <input type="text" placeholder="Image or Gradient" value={image} onChange={(e) => setImage(e.target.value)} className="border p-2" />
      <input type="text" placeholder="Icon name" value={icon} onChange={(e) => setIcon(e.target.value)} className="border p-2" />
      <div>
        <input type="text" placeholder="Add feature" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className="border p-2" />
        <button type="button" onClick={addFeature} className="bg-gray-300 p-2 ml-2">Add</button>
      </div>
      <ul>{features.map((f, i) => <li key={i}>{f}</li>)}</ul>
      <button type="submit" className="bg-blue-500 text-white p-2">Add Facility</button>
    </form>
  );
}
