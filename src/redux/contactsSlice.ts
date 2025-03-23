import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";
import { IContact } from "../types/types";

interface IContactState {
  items: Array<IContact>;
  loading: boolean;
  error: unknown;
}

const isPendingAction = (action: PayloadAction) => {
  return action.type.endsWith("/pending");
};

const isRejectAction = (action: PayloadAction) => {
  return action.type.endsWith("/rejected");
};

const handlePending = (state: IContactState) => {
  state.loading = true;
};

const handleRejected = (state: IContactState, action: PayloadAction) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsInitialState: IContactState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsInitialState,
  reducers: {
    // fill in primary logic here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );

        state.items.splice(index, 1);
      })
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isRejectAction, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
