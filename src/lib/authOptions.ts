// Empty auth options to remove authentication
export const authOptions = {
  providers: [],
  callbacks: {
    session: async ({ session }: { session: any }) => {
      // Return a mock session with a user ID
      return {
        ...session,
        user: {
          ...session.user,
          id: "mock-user-id",
        },
      };
    },
  },
};