//require the toolkit
const {createAsyncThunk, createSlice, configureStore} = require("@reduxjs/toolkit")
const { default: axios } = require("axios")
const API = "https://jsonplaceholder.typicode.com/posts";

//initial state
const initialState = {
    post:[],
    loading:false,
    error:null,
};

const fetchposts = createAsyncThunk("posts/fetchposts", async ()=>{
    const result = await axios.get(API);
    return result.data;

});

const resultslice= createSlice(
    {
        name:"posts",
        initialState:initialState,
        extraReducers:(builder)=>{
            //pending
            builder.addCase(fetchposts.pending,(state,action)=>{
                state.loading = true;
            });
       
        //fulfill 
        builder.addCase(fetchposts.fulfilled,(state,action)=>{
            state.post = action.payload;
            state.loading = false;

        });

          //fulfill 
          builder.addCase(fetchposts.rejected,(state,action)=>{
            state.post = []
            state.loading = false;
            state.error = action.payload
        });

    }
});

// generate reducer action
const resultreducer = resultslice;

//store
const store = configureStore({
    reducer:resultreducer
});

//dispatch action
store.subscribe(()=>{
    console.log(store.getState());
    store.dispatch(fetchposts());
})


