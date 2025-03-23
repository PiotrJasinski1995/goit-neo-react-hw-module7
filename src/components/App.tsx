import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks.js";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm/ContactForm.js";
import ContactList from "./ContactList/ContactList.js";
import SearchBox from "./SearchBox/SearchBox.js";
import Section from "./Section/Section.js";
import MainHeading from "./MainHeading/MainHeading.js";
import Notification from "./Notification/Notification.js";
import {
  selectContacts,
  selectError,
  selectFilter,
  selectFilteredContacts,
  selectIsLoading,
} from "../redux/selectors";
import { addContact, deleteContact, fetchContacts } from "../redux/operations";
import Loader from "./Loader/Loader.js";
import { changeFilter } from "../redux/filterSlice.js";

function App() {
  // const [contacts, setContacts] = useState((): Array<IContact> => {
  //   const localContacts = window.localStorage.getItem("contacts");

  //   if (localContacts !== null && localContacts.length > 0) {
  //     return JSON.parse(localContacts);
  //   }

  //   return [];
  // });

  // const [filter, setFilter] = useState("");

  // useEffect(() => {
  //   if (contacts?.length > 0) {
  //     localStorage.setItem("contacts", JSON.stringify(contacts));
  //   } else {
  //     const localContacts = localStorage.getItem("contacts");

  //     if (localContacts !== null) {
  //       localStorage.removeItem("contacts");
  //     }
  //   }
  // }, [contacts]);

  const contacts = useAppSelector(selectContacts);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const filter = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleFormSubmit = (name: string, phone: string) => {
    const nameContacts = contacts.map((contact) => contact.name.toLowerCase());

    if (nameContacts.indexOf(name.toLowerCase()) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(
        addContact({
          id: nanoid(),
          name,
          phone,
        })
      );
      // setContacts((previousContacts) => [
      //   ...previousContacts,
      //   {
      //     id: nanoid(),
      //     username,
      //     phone,
      //   },
      // ]);
    }
  };

  const handleDeleteContact = (contactId: string) =>
    // setContacts((previousContacts) =>
    //   previousContacts.filter((contact) => contact.id !== contactId)
    // );
    dispatch(deleteContact(contactId));

  // const visibleContacts = contacts.filter((contact) =>
  //   contact.username.toLowerCase().includes(filter.toLowerCase())
  // );

  const handleFilter = (filter: string) => {
    dispatch(changeFilter(filter));
  };

  const visibleContacts = useAppSelector(selectFilteredContacts);

  return (
    <>
      <MainHeading>Phonebook App</MainHeading>
      <Section>
        <ContactForm onHandleSubmit={handleFormSubmit} />
      </Section>
      <Section>
        {error && <b>{error.message}</b>}
        {contacts.length === 0 ? (
          <Notification message="No contacts in phonebook" />
        ) : (
          <>
            <SearchBox filter={filter} onHandleFilter={handleFilter} />
            {isLoading && <Loader />}
            {visibleContacts.length === 0 ? (
              <Notification message="No contacts matching given criteria"></Notification>
            ) : (
              <ContactList
                contacts={visibleContacts}
                onHandleDeleteContact={handleDeleteContact}
              />
            )}
          </>
        )}
      </Section>
    </>
  );
}

export default App;
