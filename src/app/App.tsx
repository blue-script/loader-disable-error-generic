import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { LinearLoader } from '../common/components/Loader/LinearLoader.tsx'
import { useAppSelector } from './store.ts'

export const App = () => {
  const status = useAppSelector(state => state.app.status)

  return (
    <div>
      {status === 'loading' && <LinearLoader />}
      <Decks />
      <GlobalError />
      <footer>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis eius eligendi fuga in iste neque
        perspiciatis quasi voluptates? Assumenda blanditiis consectetur culpa dolorum esse et eveniet expedita impedit
        ipsam nihil optio provident quam quasi, tempora totam? Ipsa natus perspiciatis velit.
      </footer>
    </div>
  )
}
