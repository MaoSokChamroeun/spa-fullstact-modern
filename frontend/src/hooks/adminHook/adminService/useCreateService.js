

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCreateService = () => {
  const navigate = useNavigate();
  // State for the form
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    duration: "" // Will hold the duration
  });

  // NEW: State for the dropdown list
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // NEW: Fetch categories when the page loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/category");
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("duration", formData.duration);
    data.append("image", image); 

    try {
      const res = await axios.post("http://localhost:5000/api/services", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data) {
        setLoading(false);
        navigate("/admin/dashboard/services");
      }
    } catch (error) {
      setLoading(false);
      console.error("Save Error:", error.response?.data || error.message);
      alert("Failed to save service.");
    }
  };

  return {
    formData,      // Return formData to keep select value in sync
    categories,    // Return categories for the .map() in your UI
    handleChange,
    handleCreateSubmit,
    handleImageChange,
    preview,
    loading,
    navigate
  };
};

export default useCreateService;