import React from "react"
import { apiDeleteContact, IContact } from "../../data/contacts"
import "./ContactList.css"

interface IProps {
  contacts: IContact[]
  setContactInfo: React.Dispatch<React.SetStateAction<IContact>>
  setToggleEditPanel: React.Dispatch<React.SetStateAction<boolean>>
  toggleEditPanel: boolean
  setToggleAddPanel: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ContactList({
  contacts,
  setContactInfo,
  setToggleEditPanel,
  toggleEditPanel,
  setToggleAddPanel,
}: IProps) {
  const handleEdit = (id: string) => {
    let contact = contacts.filter((item) => item.id === id)
    setContactInfo(contact[0])
    setToggleEditPanel(!toggleEditPanel)
    setToggleAddPanel(false)
  }

  const handleDelete = async (id: string) => {
    let contact = contacts.filter((item) => item.id === id)
    await apiDeleteContact(contact[0].id)
  }

  return (
    <table>
      <thead>
        <tr>
          <th className="table-header">Name</th>
          <th className="table-header">Email</th>
          <th className="table-header">Phone</th>
          <th className="table-header">Age</th>
          <th className="table-header">Edit</th>
          <th className="table-header">Delete</th>
        </tr>
      </thead>

      <tbody>
        {contacts &&
          contacts
            .sort((a, z) => (a.name < z.name ? -1 : 1))
            .map(({ id, name, email, age, phone }) => (
              <tr key={id}>
                <td className="table-cell">{name}</td>
                <td className="table-cell">{email}</td>
                <td className="table-cell">{phone}</td>
                <td className="table-cell">{age}</td>
                <td className="table-cell">
                  <button onClick={() => handleEdit(id)} className="btn-edit">
                    Edit
                  </button>
                </td>
                <td className="table-cell">
                  <button onClick={() => handleDelete(id)} className="btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  )
}
