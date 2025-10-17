import { create } from 'zustand'
import { User } from '@/types'

interface UsersState {
  users: User[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
  updateUser: (id: string, userData: Partial<User>) => void
  deleteUser: (id: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  setUsers: (users) => set({ users, error: null }),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
      error: null,
    })),

  updateUser: (id, userData) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...userData } : user
      ),
      error: null,
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
      error: null,
    })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}))


