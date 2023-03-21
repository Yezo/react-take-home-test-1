import { apiUpdateContact, IContact } from "../../data/contacts"
import Form from "../Form/Form"

type Props = {
  setToggleEditPanel: React.Dispatch<React.SetStateAction<boolean>>
  setContactInfo: React.Dispatch<React.SetStateAction<IContact>>
  toggleEditPanel: boolean
  contactInfo: IContact
}

export default function EditContact({
  setContactInfo,
  setToggleEditPanel,
  contactInfo,
  toggleEditPanel,
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
