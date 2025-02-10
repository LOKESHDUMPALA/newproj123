import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    addressList : []
}

export const addNewAddress = createAsyncThunk('/addressess/addNewAddress', async(FormData) => {
    
    const response = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/shop/address/add`, FormData
      );

      return response.data;
})


export const fetchAllAddresses = createAsyncThunk('/addressess/fetchAllAddresses', async(userId) => {
    
    const response = await axios.get(
       `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
      );

      return response.data;
})


export const editaAddress = createAsyncThunk('/addressess/editaAddress', async({userId, addressId,formData }) => {
    
    const response = await axios.put(
       `${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}`, formData
      );
     
      return response.data;
})


export const deleteAddress = createAsyncThunk('/addressess/deleteAddress', async({userId, addressId}) => {
    
    const response = await axios.delete(
       `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`
      );

      return response.data;
})

const adressSlice = createSlice({
    name : 'address',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
         builder.addCase(addNewAddress.pending, (state) => {
            state.isLoading = true
         }).addCase(addNewAddress.fulfilled, (state,action) => {
            state.isLoading = false
         }).addCase(addNewAddress.rejected, (state) => {
            state.isLoading = false
         }).addCase(fetchAllAddresses.pending, (state) => {
            state.isLoading = true
         }).addCase(fetchAllAddresses.fulfilled, (state,action) => {
            state.isLoading = true
            state.addressList = action.payload.data
         }).addCase(fetchAllAddresses.rejected, (state) => {
            state.isLoading = false
            state.addressList = []
         });
    },
});
export default adressSlice.reducer;
