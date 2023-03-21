import React from "react"
import { IContact } from "../../data/contacts"
import "./Form.css"

interface IProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  contactInfo: IContact
  action: string
}

export default function Form({ handleChange, handleSubmit, contactInfo, action }: IProps) {
  return (
    <div>
      <h2 className="form-title">{action} Contact</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={contactInfo.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={contactInfo.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            value={contactInfo.phone}
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            value={contactInfo.age}
            name="age"
            onChange={handleChange}
          />
        </div>

        <input type="submit" value={action} className="btn-submit" />
      </form>
    </div>
  )
}
