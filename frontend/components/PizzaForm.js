import React, { useState } from "react"; // imports the React library and the useState hook
import { useAddOrderMutation } from "../state/apiSlice"; // imports the useAddOrderMutation hook from our API slice

// This defines the initial state for the form
const initialFormState = {
  fullName: "",
  size: "",
  toppings: [],
};

// This defines the PizzaForm component as a function component
export default function PizzaForm() {
  const [formData, setFormData] = useState(initialFormState); // This uses the useState hook to create local state for our form data.
  const [addOrder, { isLoading, isError, error }] = useAddOrderMutation(); // This uses the useAddOrderMutation hook from RTK Query: addOrder is the function we'll call to add a new order isLoading, isError, and error are status flags and error information

  // This function handles changes to form inputs: For checkboxes, it adds or removes toppings from the array For other inputs, it updates the corresponding field in the form data
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        toppings: checked
          ? [...prev.toppings, name]
          : prev.toppings.filter((topping) => topping !== name),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // This function handles form submission: It prevents the default form submission It calls the addOrder mutation with the form data If successful, it resets the form If there's an error, it logs it to the console
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOrder(formData).unwrap();
      setFormData(initialFormState);
    } catch (err) {
      console.error("Failed to add order: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {isError && (
        <div className="failure">Order failed: {error.data.message}</div>
      )}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        {["Pepperoni", "Green Peppers", "Pineapple", "Mushrooms", "Ham"].map(
          (topping, index) => (
            <label key={index}>
              <input
                data-testid={`check${topping.replace(" ", "")}`}
                name={(index + 1).toString()}
                type="checkbox"
                checked={formData.toppings.includes((index + 1).toString())}
                onChange={handleChange}
              />
              {topping}
              <br />
            </label>
          )
        )}
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
