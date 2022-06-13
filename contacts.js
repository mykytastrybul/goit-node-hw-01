const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.normalize("./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  return (
    contacts.find((contact) => contact.id === contactId) ||
    console.log("No contact with id: ", contactId)
  );
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === JSON.stringify(contactId)
  );
  if (index === -1) return console.log("No contact with id: ", contactId);
  const removedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
