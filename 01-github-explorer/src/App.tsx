import { RepositoryFilter } from './components/RepositoryFilter'
import { RepositoriesProvider } from './hooks/Repository'
import './styles/global.scss'

export function App() {
  return (
    <RepositoriesProvider>
      <RepositoryFilter />
    </RepositoriesProvider>
  )
}