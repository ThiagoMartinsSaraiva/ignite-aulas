import { RepositoryItem } from "./RepositoryItem"
import '../styles/repositories.scss'

interface Repository {
  name: string
  description: string
  html_url: string
}

interface RepositoryListProps {
  repositories: Repository[]
}

export function RepositoryList(props: RepositoryListProps) {
  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
      <ul>
        {
          props.repositories.length ? (
            props.repositories.map(repository => (
              <RepositoryItem key={repository.name} repository={repository} />
            ))
          ) : "Nenhum repositório encontrado"
        }
      </ul>
    </section>
  )
}