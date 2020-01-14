
//https://jestjs.io/docs/en/manual-mocks#mocking-node-modules

export default {
  //  Auth : {
  //      signIn : jest.fn().mockResolvedValue({
  //       attributes: {
  //         email : "test@test.com"
  //       }
  //  })},

   Auth:  {
    signIn :  jest.fn(),
    signUp : jest.fn()
   }
 
//  })

   
 }
