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
import ErrorComponent from "./ErrorComponent/ErrorComponent.js";

function App() {
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
    }
  };

  const handleDeleteContact = (contactId: string) =>
    dispatch(deleteContact(contactId));

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
        {error && <ErrorComponent message={error} />}
        {isLoading && <Loader />}
        {contacts.length === 0 && !isLoading && !error ? (
          <Notification message="No contacts in phonebook" />
        ) : (
          <>
            {!isLoading && !error && (
              <>
                <SearchBox filter={filter} onHandleFilter={handleFilter} />
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
          </>
        )}
      </Section>
    </>
  );
}

export default App;
