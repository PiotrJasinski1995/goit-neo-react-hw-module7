import { createSelector } from "@reduxjs/toolkit";
import { IState } from "../types/types.js";

export const selectContacts = (state: IState) => state.contacts.items;

export const selectFilter = (state: IState) => state.filter;

export const selectIsLoading = (state: IState) => state.contacts.loading;

export const selectError = (state: IState) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) return contacts;

    return contacts.filter((contact) => {
      const { name } = contact;
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }
);
