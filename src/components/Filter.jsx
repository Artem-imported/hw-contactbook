import { selectFilter } from "../redux/selectors";

<input value={useSelector(selectFilter)} onChange={e => useDispatch(setFilter(e.target.value))}/>