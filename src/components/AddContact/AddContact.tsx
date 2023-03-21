import { useState } from "react"
import { apiAddContact, IContact } from "../../data/contacts"
import { generateUUID } from "../../util/guid"
import Form from "../Form/Form"
import "./AddContact.css"

interface IProps {
  setContactInfo: React.Dispatch<React.SetStateAction<IContact>>
  setToggleAddPanel: React.Dispatch<React.SetStateAction<boolean>>
  contacts: IContact[]
  contactInfo: IContact
  toggleAddPanel: boolean
}

export default function AddContact({
  contacts,
  contactInfo,
  setContactInfo,
  setToggleAddPanel,
  toggleAddPanel,
}: IProps) {
  //States
  const [error, setError] = useState<boolean>(false)

  //Helper functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = generateUUID()

    //Check if the contact's name the user is trying to add matches any contacts stored in localStorage
    const existingByName = contacts.find(
      (x) => x.name.toLowerCase() === contactInfo.name.toLowerCase()
    )

    //Display an error if the name already exists in database
    if (existingByName) {
      setError(true)
    } else {
      //Otherwise add the contact to the database
      await apiAddContact({ ...contactInfo, id: id })

      //Reset the input fields when finished
      setContactInfo({
        name: "",
        email: "",
        phone: "",
        age: 0,
        id: "",
      })

      //TODO can get rid of this after implementing panel toggling
      setError(false)
      setToggleAddPanel(!toggleAddPanel)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Dynamically update state based on the active form input field
    setContactInfo((contact) => ({
      ...contact,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        contactInfo={contactInfo}
        action="Add"
      ></Form>
      {error && (
        <div className="error-msg">
          <ErrorSVG />A contact with that name already exists.
        </div>
      )}
    </>
  )
}

const ErrorSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  )
}
