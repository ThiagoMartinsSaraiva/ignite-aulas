import { createContext, useCallback, useContext, useState } from "react";
import { RepositoryList } from "../components/RepositoryList";

interface Repository {
  name: string
  description: string
  html_url: string
}

interface addRepositoriesInterface {
  repositories: Repository[]
}

interface RepositoryContextData {
  addRepositories(repositories: addRepositoriesInterface): void
  removeRepositories(): void
}

const RepositoryContext = createContext<RepositoryContextData>({} as RepositoryContextData)

function RepositoriesProvider({ children }: any) {
  const [repositories, setRepositories] = useState<Repository[]>([])

  const addRepositories = useCallback((repositories : any) => {
    setRepositories(repositories)
  }, [])
  
  const removeRepositories = useCallback(() => {
    setRepositories([])
  }, [])
  
  return (
    <RepositoryContext.Provider value={{ addRepositories, removeRepositories }}>
      { children }
      <RepositoryList repositories={repositories} />
    </RepositoryContext.Provider>
  )
}

function useRepositories() {
  const context = useContext(RepositoryContext)

  if (!context) {
    throw new Error ("useRepositories must be used within a RepositoriesProvider")
  }

  return context
}

export { RepositoriesProvider, useRepositories }