import { useEffect, useState } from "react"
import AddContact from "./components/AddContact/AddContact"
import ContactList from "./components/ContactList/ContactList"
import EditContact from "./components/EditContact/EditContact"
import { apiFetchAllContacts, IContact } from "./data/contacts"
import "./App.css"

export default function App() {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [error, setError] = useState<boolean>(false)
  const [toggleAddPanel, setToggleAddPanel] = useState<boolean>(false)
  const [toggleEditPanel, setToggleEditPanel] = useState<boolean>(false)
  const [contactInfo, setContactInfo] = useState<IContact>({
    name: "",
    email: "",
    phone: "",
    age: 0,
    id: "",
  })

  //Fetching data
  //BUG: attempting to add a loading state always ends up TRUE and cant be set back to FALSE
  useEffect(() => {
    const controller = new AbortController()

    const fetchAPI = async () => {
      try {
        const data = await apiFetchAllContacts()
        setContacts(data)
      } catch (error) {
        controller.signal.aborted && setError(true)
      }
    }
    fetchAPI()
    return () => {
      controller.abort()
    }
  }, [contacts])

  //Helper function
  const handleAddButtonPanelChange = () => {
    setToggleAddPanel(!toggleAddPanel)
    setToggleEditPanel(false)
  }

  return (
    <div className="App container">
      <h1 className="main-title">Brew Ninja Contact Manager</h1>

      <button onClick={handleAddButtonPanelChange} className="btn-primary">
        Add Contact
      </button>

      {error && <div>There was an error fetching the data!</div>}

      {toggleAddPanel && (
        <AddContact
          contacts={contacts}
          contactInfo={contactInfo}
          setContactInfo={setContactInfo}
          setToggleAddPanel={setToggleAddPanel}
          toggleAddPanel={toggleAddPanel}
        />
      )}

      {contacts.length > 0 ? (
        <ContactList
          contacts={contacts}
          setContactInfo={setContactInfo}
          setToggleEditPanel={setToggleEditPanel}
          toggleEditPanel={toggleEditPanel}
          setToggleAddPanel={setToggleAddPanel}
        />
      ) : (
        <div className="warning-message-container">
          <ContactWarningMessage />
          <div className="warning-message-text">
            <span>You currently have no contacts saved.</span>
            <span>Try adding a contact!</span>
          </div>
        </div>
      )}

      {toggleEditPanel && (
        <EditContact
          setContactInfo={setContactInfo}
          contactInfo={contactInfo}
          setToggleEditPanel={setToggleEditPanel}
          toggleEditPanel={toggleEditPanel}
        />
      )}
    </div>
  )
}

const ContactWarningMessage = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )
}
