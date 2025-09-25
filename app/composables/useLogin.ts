export const useLogin = () => {
  const login = useState<string>('login', () => '') 
  // useState persists across SSR/CSR and is global

  const goToUser = () => {
    if (login.value.trim()) {
      navigateTo(`/checking/${login.value}`)
    }
  }

  return { login, goToUser }
}