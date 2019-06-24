import React, {useEffect} from 'react';
import Form from './Form';

export default function SimpleSelect() {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [categories, setCategories] = React.useState([
      {
        value: "",
        label: "All categories"
      }
  ]);

  useEffect(()=> {
      setTimeout(()=> {
        setCategories([
            {
              value: "",
              label: "All categories"
            },
            {
                value: "toys",
                label: "Toys"
              },
              {
                value: "books",
                label: "Books"
              }
        ])
      }, 1000)
  })

  function handleChange(e) {
    setSelectedCategory(e.target.value);
  }

  function onQueryChange(e) {
    setQuery(e.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <Form selectedCategory={selectedCategory} categories={categories} onSubmit={onSubmit} onChange={handleChange} onQueryChange={onQueryChange}/>    
  );
}