import './Filter.css';

export default function Filter({ filter, setFilter }) {
  return (
        <label>
            Find contacts by name
            <input
              className='Filter__input'
              type="text"
              name="filter"
              value={filter}
              onChange={setFilter}
              //placeholder='Filter...'
            /> 
          </label>
  )
}