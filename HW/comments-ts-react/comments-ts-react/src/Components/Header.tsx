import { CommentT } from '../model/CommentT';
import LatestComment from './LatestComment'
type HeaderProps = {
  latest:CommentT
}

const Header = ({latest}:HeaderProps) => {
// const {latest} = useContext(CommentContext);

  return (
    <header>
        <LatestComment comment = {latest} />
    </header>
  )
}

export default Header