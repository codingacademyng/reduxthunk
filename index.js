//require the toolkit
const {createAction, nanoid, createReducer} = require("@reduxjs/toolkit")

//initial state
const initialState = {
    Counter:0,
}

const increment = createAction("INCREMENT")
const decrement =  createAction("DECREMENT")
const resetCounter = createAction("RESET")
const increaseBy  = createAction("increase_by",(amount,user)=>{
    return{
        payload:{
            amount:amount,
            user:user,
            id:nanoid()

        },
    }
})
//console.log(increaseBy(20,"Oracle"));

//creating reducer in redux // recommended 
const counterslice = createReducer(initialState,(builder)=>{
  builder.addCase(increment,(state)=>{
    state.Counter=+1;
  });

  builder.addCase(decrement,(state)=>{
    state.Counter=-1;
  });

  builder.addCase(resetCounter,(state)=>{
    state.Counter=0;
  });



  builder.addCase(increaseBy,(state,action)=>{
    state.Counter+= action.payload.amount;
  })
});

//Reducer with map notation

const counterslice2 = createAction(initialState,{
    [increment]:(state)=>{state.Counter+=1;},
    [decrement]:(state)=>{state.Counter-=1},
    [resetCounter]:(state)=>{state.Counter=0},
    [increaseBy]:(state)=>{state.Counter+=action.payload.amount}
})

