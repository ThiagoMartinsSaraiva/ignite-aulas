import { useEffect, useState } from "react"
import { useRepositories } from "../hooks/Repository"

export function RepositoryFilter() {
  const [type, setType] = useState<string>('users')
  const [name, setName] = useState<string>('')
  const { addRepositories, removeRepositories } = useRepositories()

  const selectOptions = [
    { id: 'users', value: 'users', description: 'Usuário' },
    { id: 'orgs', value: 'orgs', description: 'Organização' },
  ]
  
  function handleErrors(response:any) {
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json()
  }

  function fetchRepos() {
    if (!type || !name) {
      return
    }

    fetch(`https://api.github.com/${type}/${name}/repos`)
      .then(handleErrors)
      .then(data => {
        addRepositories(data)
      })
      .catch(err => {
        removeRepositories()
        console.log(err)
      })
  }

  useEffect(() => {
    fetchRepos()
  }, [name])

  function debounce (callback: Function, wait: number) {
    let timeoutId: any = null;

    return (...args: any[]) => {
      clearTimeout(timeoutId);

      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  }

  const handleNameChange = debounce((event: any) => {
    setName(event.target.value)
  }, 500)

  function selectType(event: any) {
    setType(event.target.value)
  }

  return (
    <div className="form-container">
      <form>
        <div className="form-group">
          <label>
            Nome
          </label>
          <input onInput={handleNameChange} placeholder="Digite o nome" />
        </div>
        <div className="form-group">
          <label>
            Selecione o tipo de filtro
          </label>
          <select onChange={selectType}>
            {
              selectOptions.map(({ id, value, description }) => (
                <option key={id} value={value}>
                    {description}
                </option>
              ))
            }
          </select>
        </div>
      </form>
    </div>
  )
}