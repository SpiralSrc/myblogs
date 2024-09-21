"use client";

import { updateTag } from "@/actions/action";
import Form from "../../reusable_ui/Form";
import Input from "../../reusable_ui/Input";
import SubmitButton from "../../reusable_ui/SubmitButton";
import { useState } from "react";

const EditTagForm = ({ tag }: any) => {
  const [name, setName] = useState(tag.name);

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.set("name", name);

    try {
      await updateTag(tag.name, formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <h1>Edit Tag Name</h1>
      <div className="line mb-10"></div>
      <Form action={handleSubmit}>
        <Input
          type="text"
          name="name"
          required
          defaultValue={tag.name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tag name..."
        />

        <SubmitButton>Update</SubmitButton>
      </Form>
    </div>
  );
};
export default EditTagForm;
