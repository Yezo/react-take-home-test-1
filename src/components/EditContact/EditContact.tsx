import { apiUpdateContact, IContact } from "../../data/contacts"
import Form from "../Form/Form"

type Props = {
  setContactInfo: React.Dispatch<React.SetStateAction<IContact>>
  setToggleEditPanel: React.Dispatch<React.SetStateAction<boolean>>
  toggleEditPanel: boolean
  contactInfo: IContact
}

export default function EditContact({
  setContactInfo,
  setToggleEditPanel,
  toggleEditPanel,
  contactInfo,
}: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await apiUpdateContact({ ...contactInfo })
    setToggleEditPanel(!toggleEditPanel)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Dynamically update state based on the active form input field
    setContactInfo((contact: IContact) => ({
      ...contact,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <Form
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      contactInfo={contactInfo}
      action="Edit"
    ></Form>
  )
}
