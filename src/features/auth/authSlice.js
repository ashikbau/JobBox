import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword,GoogleAuthProvider,signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import auth from "../../firebase/firebase.config"

const initialState={
    email: "",
    role: "",
    isLoading: true,
    isError: false,
    error: ""
}

export const createUser = createAsyncThunk('auth/createUser',async({email,password})=>{
    const data = await createUserWithEmailAndPassword(auth,email,password);
    return data.user.email;
});
export const logInUser = createAsyncThunk('auth/logInUser',async({email,password})=>{
    const data = await signInWithEmailAndPassword(auth,email,password);
    return data.user.email;
});
export const googleLogIn = createAsyncThunk('auth/googleLogIn',async()=>{
    const googleProvider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth,googleProvider);
    return data.user.email;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logOut: (state)=>{
            state.email = ""
        },
        setUser : (state,{payload})=>{
            state.email = payload;
            state.isLoading = false;
    },
    toggleLoading: (state)=>{
        state.isLoading = false;
    }

    },
    extraReducers:(builder)=>{
        builder.addCase(createUser.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.error = ''
        })
        .addCase(createUser.fulfilled,(state,{payload})=>{
            state.isLoading = false;
            state.email = payload;
            state.isError = false;
            state.error = ''
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.email = ' ';
            state.isError = true;
            state.error = action.error.message;
        })
       .addCase(logInUser.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.error = ''
        })
        .addCase(logInUser.fulfilled,(state,{payload})=>{
            state.isLoading = false;
            state.email = payload;
            state.isError = false;
            state.error = ''
        })
        .addCase(logInUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.email = ' ';
            state.isError = true;
            state.error = action.error.message;
        })
       .addCase(googleLogIn.pending,(state)=>{
            state.isLoading = true;
            state.isError = false;
            state.error = ''
        })
        .addCase(googleLogIn.fulfilled,(state,{payload})=>{
            state.isLoading = false;
            state.email = payload;
            state.isError = false;
            state.error = ''
        })
        .addCase(googleLogIn.rejected,(state,action)=>{
            state.isLoading = false;
            state.email = ' ';
            state.isError = true;
            state.error = action.error.message;
        })
    }
   
})
export const {logOut,setUser,toggleLoading}= authSlice.actions;
export default authSlice.reducer;